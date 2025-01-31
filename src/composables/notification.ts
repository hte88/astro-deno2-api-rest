// useNotification.ts
import { ref } from 'vue'

type NotificationType = 'success' | 'error' | 'info'

interface Notification {
  title: string
  message: string
  type: NotificationType
  duration?: number
}

const notification = ref<Notification>({
  title: '',
  message: '',
  type: 'info',
  duration: undefined
})

const display = ref<boolean>(false)

export default function useNotification() {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  function showNotification(params: Notification) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    notification.value = { ...params }
    display.value = true

    if (params.duration && params.duration > 0) {
      timeoutId = setTimeout(() => {
        closeNotification()
      }, params.duration)
    }
  }

  function closeNotification() {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    display.value = false
  }

  function showSuccess(title: string, message: string, duration = 5000) {
    showNotification({ title, message, type: 'success', duration })
  }

  function showError(title: string, message: string, duration = 5000) {
    showNotification({ title, message, type: 'error', duration })
  }

  function showInfo(title: string, message: string, duration = 3000) {
    showNotification({ title, message, type: 'info', duration })
  }

  return {
    // State
    notification,
    display,
    // Methods
    showNotification,
    closeNotification,
    showSuccess,
    showError,
    showInfo
  }
}
