<script lang="ts" setup>
import { reset, submitForm } from '@formkit/core'
import { useAuthStore } from '~~/stores/authStore';

const props = defineProps<{
   show?: boolean,
}>()

const emits = defineEmits(['update:show'])

const show = useVModel(props, 'show', emits)

const formId = "folderForm"

// const { apiFetch } = useAuthStore()

function open() {
   show.value = true
}
function close() {
   show.value = false
   console.log("canceled")
}

async function handleSubmit(data) {
   try {
      const res = await useAuthStore().apiFetch('folders', {
         method: 'POST',
         body: data
      })
      refreshNuxtData('folders')
      close()
   } catch (error) {
      console.log(error)
   }
}


</script>

<template>
   <div>
      <form-kit type="form" :id="formId" :actions="false" @submit="handleSubmit" #default="{ value }">
         <t-card v-if="show" no-pad v-motion-pop :action="['Add']" @cancel="close" @confirm="submitForm(formId)">
            <form-kit type="text" name="name" />
         </t-card>
      </form-kit>
   </div>
</template>