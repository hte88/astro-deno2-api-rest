<script setup lang="ts">
import { computed } from 'vue'
import useNotification from '@/composables/notification'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/vue/24/solid'

const { notification, closeNotification, display } = useNotification()
const { title, message, type } = notification.value

const notificationIcon = computed(() => {
  switch (type) {
    case 'success':
      return CheckCircleIcon
    case 'error':
      return ExclamationCircleIcon
    case 'info':
      return InformationCircleIcon
    default:
      return InformationCircleIcon
  }
})

const iconClasses = computed(() => {
  switch (type) {
    case 'success':
      return 'text-green-500'
    case 'error':
      return 'text-red-500'
    case 'info':
      return 'text-blue-500'
    default:
      return 'text-blue-500'
  }
})

const borderClasses = computed(() => {
  switch (type) {
    case 'success':
      return 'border-green-500'
    case 'error':
      return 'border-red-500'
    case 'info':
      return 'border-blue-500'
    default:
      return 'border-blue-500'
  }
})

</script>


<template>
      <transition enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="display" class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 border" :class="borderClasses">
          <div class="p-4">
            <div class="flex items-start">
              <div class="shrink-0">
                <component :is="notificationIcon" class="h-6 w-6" :class="iconClasses" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">{{title}}</p>
                <p class="mt-1 text-sm text-gray-500">{{ message }}</p>
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
