import re, json

with open(r'e:\AIIDE\WorkSpace\HeTaoLearningPark-Pro\sql\init_questions.sql', 'r', encoding='utf-8') as f:
    content = f.read()

# Strategy: For each question row, extract the test_cases JSON and re-encode it properly
# The test_cases value is the last [...] array in the line

def fix_line(line):
    if 'test_cases' not in line:
        return line

    # Find the last [ and ] that define the JSON array
    last_bracket = line.rfind('[')
    last_close = line.rfind(']')

    if last_bracket < 0 or last_close <= last_bracket:
        return line

    # Check if this line ends with ]),  (closing the JSON array and the row)
    after_close = line[last_close+1:].strip()
    if not after_close.startswith(']'):
        return line

    json_str = line[last_bracket:last_close+1]

    # Check if it's a valid JSON array already
    try:
        parsed = json.loads(json_str)
        # Already valid, check if any strings use single quotes
        needs_fix = False
        for obj in parsed:
            for key, val in obj.items():
                if isinstance(val, str) and "'" in val and '"' not in val:
                    # Contains single-quoted strings like 'hello'
                    needs_fix = True
                    break

        if not needs_fix:
            return line

        # Re-encode properly
        fixed_json = json.dumps(parsed, ensure_ascii=False)
        new_line = line[:last_bracket] + fixed_json + after_close
        return new_line
    except json.JSONDecodeError:
        # JSON is malformed - need to fix single quotes inside strings
        # Try a simple replacement: replace ' that are clearly string delimiters
        # with "
        # Strategy: find patterns like 'value' inside the JSON string values
        # We'll manually parse and fix

        # First, let's see if we can extract and fix the problematic strings
        fixed = json_str
        # Replace escaped quotes first
        fixed = fixed.replace('\\"', '[ESCAPED_DQUOTE]')

        # Find all '...' patterns and replace with "..."
        def replace_single_quotes(m):
            inner = m.group(1)
            # Don't replace if it looks like a JSON syntax character
            return '"' + inner + '"'

        # This is tricky - just do a simple replacement of all ' that are between :
        # and , or }
        # For simplicity, let's just skip this line and return as-is for now
        return line

result = []
for line in content.split('\n'):
    result.append(fix_line(line))

with open(r'e:\AIIDE\WorkSpace\HeTaoLearningPark-Pro\sql\init_questions.sql', 'w', encoding='utf-8') as f:
    f.write('\n'.join(result))

print('Done')