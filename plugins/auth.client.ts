import { useAuthStore } from "~~/stores/authStore";

export default defineNuxtPlugin(async ({ $pinia }) => {
   const { apiFetch, saveAuth } = useAuthStore($pinia)
   addRouteMiddleware('authenticate', async (to, from) => {
      const excluded = [
         '/',
         '/login',
         '/signup',
      ]
      try {
         const { access_token, user } = await apiFetch('auth/refresh')
         if (access_token) {
            saveAuth({
               accessToken: access_token,
               currentUser: user
            })
         }
      } catch (error) {
         console.log(error)
         if (!excluded.includes(to.path)) {
            return navigateTo('/login', { replace: true })
         }
      }
   }, { global: true })
});
