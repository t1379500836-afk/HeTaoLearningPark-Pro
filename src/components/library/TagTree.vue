<template>
  <ul class="tag-tree">
    <li v-for="node in nodes" :key="node.id" class="tag-tree-item">
      <div class="tag-tree-row" :style="{ paddingLeft: depth * 20 + 'px' }">
        <button
          v-if="node.children && node.children.length > 0"
          class="expand-btn"
          @click.stop="toggleExpand(node.id)"
        >
          <span :class="{ expanded: isExpanded(node.id) }">▸</span>
        </button>
        <span v-else class="expand-placeholder"></span>

        <label
          class="tag-checkbox"
          :class="{ checked: isSelected(node.id) }"
          @click="$emit('toggle', node.id)"
        >
          <span class="checkbox-box">
            <span v-if="isSelected(node.id)" class="checkmark">✓</span>
          </span>
          <span
            class="tag-name"
            :style="{ color: isSelected(node.id) ? (node.color || '#333') : '#333' }"
          >
            {{ node.name }}
          </span>
          <span
            v-if="node.children && node.children.length > 0"
            class="child-count"
          >
            ({{ node.children.length }})
          </span>
        </label>
      </div>

      <Transition name="tree-slide">
        <div
          v-if="node.children && node.children.length > 0 && isExpanded(node.id)"
        >
          <TagTree
            :nodes="node.children"
            :selected-ids="selectedIds"
            :depth="depth + 1"
            @toggle="$emit('toggle', $event)"
          />
        </div>
      </Transition>
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  nodes: { type: Array, required: true },
  selectedIds: { type: Array, default: () => [] },
  depth: { type: Number, default: 0 }
})

defineEmits(['toggle'])

const expandedIds = ref({})

// 默认展开所有有子节点的标签
props.nodes.forEach(node => {
  if (node.children && node.children.length > 0) {
    expandedIds.value[node.id] = true
  }
})

function toggleExpand(id) {
  expandedIds.value[id] = !expandedIds.value[id]
}

function isExpanded(id) {
  return !!expandedIds.value[id]
}

function isSelected(id) {
  return props.selectedIds.includes(id)
}
</script>

<style scoped>
.tag-tree {
  list-style: none;
  margin: 0;
  padding: 0;
}

.tag-tree-item {
  margin: 2px 0;
}

.tag-tree-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 0;
  border-radius: 6px;
  transition: background 0.15s;
}

.tag-tree-row:hover {
  background: #fafafa;
}

.expand-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 0.8rem;
  transition: transform 0.2s;
}

.expand-btn span {
  display: inline-block;
  transition: transform 0.2s;
}

.expand-btn span.expanded {
  transform: rotate(90deg);
}

.expand-placeholder {
  width: 20px;
  flex-shrink: 0;
}

.tag-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  flex: 1;
  min-height: 32px;
}

.checkbox-box {
  width: 18px;
  height: 18px;
  border: 2px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
}

.tag-checkbox.checked .checkbox-box {
  background: var(--primary-color);
  border-color: var(--primary-color);
}

.checkmark {
  color: #fff;
  font-size: 0.7rem;
  font-weight: bold;
}

.tag-name {
  font-size: 0.9rem;
  transition: color 0.2s;
}

.child-count {
  font-size: 0.75rem;
  color: #bbb;
  margin-left: 2px;
}

/* 树展开动画 */
.tree-slide-enter-active,
.tree-slide-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}

.tree-slide-enter-from,
.tree-slide-leave-to {
  opacity: 0;
  max-height: 0;
}

.tree-slide-enter-to,
.tree-slide-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
