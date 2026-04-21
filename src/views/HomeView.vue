<template>
  <div class="home-view">
    <HeroSection />

    <!-- 最新教师寄语横幅 -->
    <section v-if="latestMessage" class="message-banner" @click="goMessages">
      <div class="banner-content">
        <span class="banner-icon">💌</span>
        <div class="banner-text">
          <p class="banner-label">教师寄语</p>
          <p class="banner-message">{{ latestMessage.title || '无标题' }}</p>
          <p class="banner-hint">点击查看详情 ›</p>
        </div>
      </div>
    </section>

    <!-- 快速入口卡片 -->
    <section class="quick-access">
      <h2>开始学习</h2>
      <div class="cards">
        <router-link :to="prefixedPath('/levels')" class="card">
          <div class="card-icon">📚</div>
          <h3>课程体系</h3>
          <p>选择你的学习阶段</p>
        </router-link>
        <router-link :to="prefixedPath('/typing')" class="card">
          <div class="card-icon">⌨️</div>
          <h3>打字练习</h3>
          <p>提高打字速度和准确率</p>
        </router-link>
        <router-link :to="prefixedPath('/python')" class="card">
          <div class="card-icon">🐍</div>
          <h3>Python IDE</h3>
          <p>在线 Python 代码编辑器</p>
        </router-link>
        <router-link :to="prefixedPath('/ycl')" class="card">
          <div class="card-icon">🏆</div>
          <h3>YCL 专区</h3>
          <p>考级冲刺练习</p>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HeroSection from '@/components/shared/HeroSection.vue'
import { getCurrentPrefix, prefixedPath as buildPrefixedPath } from '@/composables/useRoutePrefix.js'
import { getLatestTeacherMessage } from '@/config/messages.config.js'
import { useAuth } from '@/composables/useAuth.js'

const route = useRoute()
const router = useRouter()
const prefix = computed(() => getCurrentPrefix(route))
const { teacherId } = useAuth()

const latestMessage = computed(() => getLatestTeacherMessage(teacherId.value))

function prefixedPath(path) {
  return buildPrefixedPath(prefix.value, path)
}

function goMessages() {
  router.push(prefixedPath('/messages'))
}
</script>

<style scoped>
.home-view {
  min-height: 100vh;
}

/* 最新寄语横幅 */
.message-banner {
  max-width: 800px;
  margin: -20px auto 0;
  padding: 0 20px;
  cursor: pointer;
}

.banner-content {
  display: flex;
  align-items: center;
  gap: 14px;
  background: linear-gradient(135deg, #fff8ed 0%, #fff 100%);
  border-left: 4px solid var(--primary-color);
  border-radius: var(--radius-md);
  padding: 16px 20px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s, box-shadow 0.2s;
}

.message-banner:hover .banner-content {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.banner-icon {
  font-size: 1.8rem;
  flex-shrink: 0;
}

.banner-text {
  flex: 1;
  min-width: 0;
}

.banner-label {
  font-size: 0.8rem;
  color: var(--primary-color);
  font-weight: 600;
  margin: 0 0 2px;
}

.banner-message {
  font-size: 1rem;
  color: #333;
  margin: 0;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.banner-hint {
  font-size: 0.8rem;
  color: #bbb;
  margin: 4px 0 0;
}

.quick-access {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
}

.quick-access h2 {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 40px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.card {
  background: #fff;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  text-decoration: none;
  color: inherit;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.card h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 10px;
}

.card p {
  color: #666;
  font-size: 0.95rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .message-banner {
    margin-top: -10px;
  }

  .cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }

  .card {
    padding: 25px;
  }
}

@media (max-width: 768px) {
  .message-banner {
    margin-top: -5px;
    padding: 0 15px;
  }

  .banner-content {
    padding: 12px 16px;
    gap: 10px;
  }

  .banner-icon {
    font-size: 1.4rem;
  }

  .quick-access {
    padding: 40px 20px;
  }

  .quick-access h2 {
    font-size: 1.5rem;
  }

  .cards {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .quick-access {
    padding: 30px 15px;
  }

  .quick-access h2 {
    font-size: 1.3rem;
    margin-bottom: 30px;
  }

  .card {
    padding: 20px;
  }

  .card-icon {
    font-size: 2.5rem;
  }

  .card h3 {
    font-size: 1.1rem;
  }

  .card p {
    font-size: 0.9rem;
  }
}
</style>
