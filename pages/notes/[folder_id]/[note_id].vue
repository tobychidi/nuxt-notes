<script lang="ts" setup>
import { createInput } from '@formkit/vue'
//@ts-ignore
import { EditorInput } from '#components'
import { useAuthStore } from '~~/stores/authStore';

const route = useRoute()
const { folder_id, note_id } = route.params

const initialValue = ref({
   title: "Untitled",
   content: ""
})

const richText = createInput(EditorInput)

async function handleSubmit(data) {
   try {
      const res = await useAuthStore().apiFetch('notes', {
         method: 'POST',
         body: { ...data, folder_id: parseInt(folder_id as string) }
      })
      navigateTo('/notes/' + folder_id)
   } catch (error) {
      console.log(error)
   }
}
</script>

<template>
   <nuxt-layout name="notes">
      <section>
         <form-kit type="form" :value="initialValue" :actions="false" @submit="handleSubmit">
            <form-kit type="text" name="title" />
            <form-kit :type="richText" name="content" />
            <t-button type="primary">
               Save
            </t-button>
         </form-kit>
      </section>
   </nuxt-layout>
</template>