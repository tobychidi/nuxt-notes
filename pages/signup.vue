<script lang="ts" setup>

async function submitHandler(data) {
   try {
      const res = await useAuthStore().apiFetch('auth/signup', {
         method: 'POST',
         body: data,
      })
      navigateTo('/login')
   } catch (error) {
      console.log(error)
   }
}

const signupForm = [
   {
      $formkit: 'text',
      name: 'username',
      label: 'Username',
      help: 'This will be used for your account.',
      validation: 'required'
   },
   {
      $formkit: 'text',
      name: 'email',
      label: 'Email',
      help: 'This will be used for your account.',
      validation: 'required|email'
   },
   {
      $formkit: 'password',
      name: 'password',
      label: 'Password',
      help: 'Enter your new password.',
      validation: 'required|length:5,16'
   },
   {
      $formkit: 'password',
      name: 'password_confirm',
      label: 'Confirm password',
      help: 'Enter your new password again to confirm it.',
      validation: 'required|confirm',
      validationLabel: 'password confirmation',
   },
]
</script>

<template>
   <section>
      <form-kit type="form" @submit="submitHandler" :actions="false">
         <div>
            <form-kit-schema :schema="signupForm" />
            <p class="small">
               Already have an account?
               <nuxt-link to="/login">
                  Login
               </nuxt-link>
            </p>
         </div>
         <t-button>
            Create Account
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
