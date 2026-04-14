#!/usr/bin/env python3
"""
PY3课程文件整理脚本
- 重命名文件为标准格式
- 优先选择"新logo版"
- 删除不需要的辅助文件
"""

import os
import shutil
import re
from pathlib import Path

# PY3课程根目录
PY3_ROOT = Path(__file__).parent.parent / "src" / "data" / "courses" / "PY3"

def find_best_file(files, patterns, prefer_new_logo=True):
    """
    从文件列表中找到最匹配的文件
    patterns: 匹配模式列表
    prefer_new_logo: 是否优先选择"新logo版"
    """
    matching_files = []

    for f in files:
        for pattern in patterns:
            if re.search(pattern, f, re.IGNORECASE):
                matching_files.append(f)
                break

    if not matching_files:
        return None

    # 优先选择"新logo版"
    if prefer_new_logo:
        new_logo_files = [f for f in matching_files if "新logo版" in f]
        if new_logo_files:
            matching_files = new_logo_files

    # 如果有多个，选择最长的文件名（通常更具体）
    return max(matching_files, key=len)

def get_extension(filename):
    """获取文件扩展名"""
    return Path(filename).suffix.lower()

def organize_lesson(lesson_path):
    """整理单个课次文件夹"""
    lesson_name = lesson_path.name
    print(f"  整理 {lesson_name}...")

    # 获取所有文件和文件夹
    items = list(lesson_path.iterdir())

    # 删除子文件夹（如"演奏效果"等）
    for item in items:
        if item.is_dir():
            print(f"    删除文件夹: {item.name}")
            shutil.rmtree(item)

    # 重新获取文件列表
    files = [f.name for f in lesson_path.iterdir() if f.is_file()]

    # 定义文件类型和对应的匹配模式
    file_mappings = {
        "flashcard": [
            r"单词卡",
        ],
        "knowledge": [
            r"知识点?图",
            r"知识总结",
            r"知识讲解图",
        ],
        "lecture": [
            r"讲义",
        ],
        "exercise": [
            r"课后习题(?!解析)",  # 不含"解析"
            r"课后练习(?!解析)",
            r"习题(?!解析)(?!答案)",  # 不含"解析"和"答案"
        ],
        "solution": [
            r"课后习题解析",
            r"课后练习解析",
            r"习题解析",
            r"习题答案",
        ],
    }

    # 需要保留的文件
    renamed_files = {}

    for std_name, patterns in file_mappings.items():
        best_file = find_best_file(files, patterns)
        if best_file:
            ext = get_extension(best_file)
            renamed_files[best_file] = f"{std_name}{ext}"

    # 执行重命名
    for old_name, new_name in renamed_files.items():
        old_path = lesson_path / old_name
        new_path = lesson_path / new_name

        # 如果目标文件已存在，先删除
        if new_path.exists():
            new_path.unlink()

        old_path.rename(new_path)
        print(f"    {old_name} -> {new_name}")

    # 删除其他文件
    for f in lesson_path.iterdir():
        if f.is_file():
            # 检查是否是标准文件
            std_names = ["flashcard.png", "flashcard.jpg", "flashcard.pdf",
                        "knowledge.png",
                        "lecture.pdf",
                        "exercise.pdf",
                        "solution.pdf"]

            # 允许的扩展名变体
            allowed_files = []
            for std in ["flashcard", "knowledge", "lecture", "exercise", "solution"]:
                allowed_files.extend([f"{std}.png", f"{std}.jpg", f"{std}.pdf", f"{std}.jpeg"])

            if f.name not in allowed_files:
                print(f"    删除: {f.name}")
                f.unlink()

def main():
    print("=" * 50)
    print("PY3课程文件整理脚本")
    print("=" * 50)

    if not PY3_ROOT.exists():
        print(f"错误: PY3目录不存在: {PY3_ROOT}")
        return

    # 遍历所有单元 (L13-L18)
    for unit in sorted(PY3_ROOT.iterdir()):
        if not unit.is_dir() or not unit.name.startswith("L"):
            continue

        print(f"\n处理单元: {unit.name}")

        # 遍历所有课次
        for lesson in sorted(unit.iterdir()):
            if not lesson.is_dir():
                continue
            organize_lesson(lesson)

    print("\n" + "=" * 50)
    print("整理完成!")
    print("=" * 50)

if __name__ == "__main__":
    main()
