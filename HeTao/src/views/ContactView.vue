<template>
  <div class="contact-view">
    <div class="contact-card">
      <div class="contact-icon">✉️</div>
      <h1>联系作者</h1>
      <p class="subtitle">欢迎通过邮件与我联系</p>

      <div class="email-box">
        <span class="email">taodezhi@hetao101.com</span>
        <button class="copy-btn" @click="copyEmail" :class="{ copied: isCopied }">
          {{ isCopied ? '已复制' : '复制' }}
        </button>
      </div>

      <div class="feedback-section">
        <h2>📝 欢迎反馈</h2>
        <ul class="feedback-list">
          <li>
            <span class="icon">🐛</span>
            <span>Bug 反馈</span>
            <p>发现网站功能异常或错误？请告诉我</p>
          </li>
          <li>
            <span class="icon">📚</span>
            <span>课程资源错误</span>
            <p>发现课程内容有误或资源缺失？欢迎指正</p>
          </li>
          <li>
            <span class="icon">💡</span>
            <span>更新建议</span>
            <p>有好的想法或改进建议？期待你的分享</p>
          </li>
        </ul>
      </div>

      <div class="tips">
        <p>💡 发送邮件时，建议在标题中注明「核桃Python学习站」以便识别</p>
      </div>

      <router-link :to="prefixedPath('/')" class="back-btn">返回首页</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getCurrentPrefix, prefixedPath as buildPrefixedPath } from '@/composables/useRoutePrefix.js'

const route = useRoute()
const prefix = computed(() => getCurrentPrefix(route))

function prefixedPath(path) {
  return buildPrefixedPath(prefix.value, path)
}

const isCopied = ref(false)

async function copyEmail() {
  try {
    await navigator.clipboard.writeText('taodezhi@hetao101.com')
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    const input = document.createElement('input')
    input.value = 'taodezhi@hetao101.com'
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  }
}
</script>

<style scoped>
.contact-view {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  box-sizing: border-box;
  width: 100%;
}

.contact-card {
  background: #fff;
  border-radius: 20px;
  padding: 50px 40px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.contact-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.contact-card h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  color: #666;
  font-size: 1rem;
  margin-bottom: 30px;
}

.email-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  background: #f5f7fa;
  padding: 15px 25px;
  border-radius: 12px;
  margin-bottom: 40px;
}

.email {
  font-size: 1.2rem;
  font-weight: 600;
  color: #667eea;
  letter-spacing: 0.5px;
}

.copy-btn {
  background: #667eea;
  color: #fff;
  border: none;
  padding: 8px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.copy-btn:hover {
  background: #5a6fd6;
}

.copy-btn.copied {
  background: #52c41a;
}

.feedback-section {
  text-align: left;
  margin-bottom: 30px;
}

.feedback-section h2 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.feedback-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feedback-list li {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 12px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 10px;
  margin-bottom: 12px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.feedback-list li:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.feedback-list .icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.feedback-list span:not(.icon) {
  font-weight: 600;
  color: #333;
  font-size: 1rem;
}

.feedback-list p {
  width: 100%;
  color: #666;
  font-size: 0.9rem;
  margin: 5px 0 0 0;
  padding-left: 35px;
}

.tips {
  background: #fffbe6;
  border: 1px solid #ffe58f;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 30px;
}

.tips p {
  color: #8c6e00;
  font-size: 0.9rem;
  margin: 0;
}

.back-btn {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  text-decoration: none;
  padding: 12px 40px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  transition: transform 0.3s, box-shadow 0.3s;
}

.back-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

/* 响应式 */
@media (max-width: 480px) {
  .contact-card {
    padding: 30px 20px;
  }

  .contact-card h1 {
    font-size: 1.6rem;
  }

  .email {
    font-size: 1rem;
  }

  .feedback-list p {
    padding-left: 0;
  }
}
</style>
