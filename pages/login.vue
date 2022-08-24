<script lang="ts" setup>

const { apiFetch, saveAuth } = useAuthStore();

async function submitHandler(data) {
   try {
      const { access_token, user } = await apiFetch('auth/login', {
         method: 'POST',
         body: data
      })
      saveAuth({
         accessToken: access_token,
         currentUser: user
      })
      navigateTo('/notes')
   } catch (error) {
      console.log(error)
   }
}
</script>

<template>
   <section>
      <form-kit type="form" @submit="submitHandler" :actions="false">
         <div>
            <form-kit name="username" label="Username" help="Your email or username" validation="required" />
            <form-kit type="password" name="password" label="Password" validation="required" />
            <p class="small">
               Don't have an account?
               <nuxt-link to="/signup">
                  Create Account
               </nuxt-link>
            </p>
         </div>
         <t-button type="primary">
            Login
         </t-button>
      </form-kit>
   </section>
</template>

<style lang="scss" scoped>
section {
   min-height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
}
</style>
