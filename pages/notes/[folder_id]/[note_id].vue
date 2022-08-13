<script lang="ts" setup>
import { createInput } from '@formkit/vue'
//@ts-ignore
import { EditorInput } from '#components'
import { useAuthStore } from '~~/stores/authStore';

const route = useRoute()
const { folder_id, note_id } = route.params

const { apiFetch } = useAuthStore()

const initialValue = ref({
   title: "Untitled Note",
   content: ""
})

const editMode = ref<boolean>(false)

const { data: note, refresh } = await useAsyncData(`note-${note_id}`, () => apiFetch(`notes/${note_id}`),{
   initialCache: false,
})
watchEffect(() => {
   if (note.value) {
      editMode.value = true
      initialValue.value = {
         title: note.value.title,
         content: note.value.content
      }
   }
})

const richText = createInput(EditorInput)

async function newNote(data) {
   try {
      const res = await apiFetch('notes', {
         method: 'POST',
         body: { ...data, folder_id: parseInt(folder_id as string) }
      })
      navigateTo('/notes/' + folder_id)
   } catch (error) {
      console.log(error)
   }
}
async function editNote(data) {
   try {
      const res = await apiFetch(`notes/${note_id}`, {
         method: 'PUT',
         body: { ...data, folder_id: parseInt(folder_id as string) }
      })
      navigateTo('/notes/' + folder_id)
   } catch (error) {
      console.log(error)
   }
}
function handleSubmit(data) {
   console.log(editMode.value)
   if (editMode.value) {
      return editNote(data)
   }
   return newNote(data)
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