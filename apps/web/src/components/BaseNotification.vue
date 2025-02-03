<script setup lang="ts">
import { computed } from 'vue'
import useNotification from '../composables/notification'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/vue/24/solid'

const { notification, closeNotification, display } = useNotification()

const NOTIFICATION_CONFIG = {
  success: {
    icon: CheckCircleIcon,
    iconColor: 'text-green-500',
    borderColor: 'border-green-500'
  },
  error: {
    icon: ExclamationCircleIcon,
    iconColor: 'text-red-500',
    borderColor: 'border-red-500'
  },
  info: {
    icon: InformationCircleIcon,
    iconColor: 'text-blue-500',
    borderColor: 'border-blue-500'
  }
} as const

const notificationConfig = computed(() => {
  const config = NOTIFICATION_CONFIG[notification.value.type] || NOTIFICATION_CONFIG.info
  return {
    title: notification.value.title,
    message: notification.value.message,
    ...config
  }
})

</script>

<template>
      <transition enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="display" class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 border" :class="notificationConfig.borderColor">
          <div class="p-4">
            <div class="flex items-start">
              <div class="shrink-0">
                <component :is="notificationConfig.icon" class="h-6 w-6" :class="notificationConfig.iconColor" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">{{notificationConfig.title}}</p>
                <p class="mt-1 text-sm text-gray-500">{{ notificationConfig.message }}</p>
              </div>
              <div class="ml-4 flex shrink-0">
                <button type="button" @click="closeNotification()" class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
</template>
