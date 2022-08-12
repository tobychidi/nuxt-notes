import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
   modules: [
      '@formkit/nuxt',
      '@vueuse/nuxt',
      '@pinia/nuxt',
      'nuxt-icons',
      '@nuxt/image-edge',
      '@vueuse/motion/nuxt',
   ],
   css: [
      'assets/styles/style.scss',
   ],
   runtimeConfig: {
      secretKeyP: '',
      secretKeyR: '',
   },
})
