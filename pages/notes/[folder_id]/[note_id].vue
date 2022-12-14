<script lang="ts" setup>
import { createInput, reset } from '@formkit/vue'
import { EditorInput } from '#components'
import { storeToRefs } from 'pinia';

const route = useRoute()
const { folder_id, note_id } = route.params

const { apiFetch } = useAuthStore()
const { currentNote } = storeToRefs(useNavStore())

const initial = ref({
   title: "",
   content: ""
})

const editMode = ref<boolean>(false)

const { data: note, pending, refresh } = await useAsyncData(`note-${note_id}`, () => apiFetch(`notes/${note_id}`), {
   initialCache: false,
})

refresh()

watchEffect(() => {
   if (note.value) {
      editMode.value = true
      initial.value = {
         title: note.value.title,
         content: note.value.content
      }
   }
   currentNote.value = initial.value.title
})

onBeforeUnmount(() => {
   currentNote.value = null
})

const richText = createInput(EditorInput)

async function newNote(data) {
   try {
      const newNote = await apiFetch('notes', {
         method: 'POST',
         body: { ...data, folder_id: parseInt(folder_id as string) }
      })
      navigateTo(`/notes/${folder_id}/${newNote.id}`, { replace: true })
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
      refresh()
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
         <template v-if="!pending">
            <form-kit type="form" :value="initial" :actions="false" @submit="handleSubmit">
               <form-kit type="text" name="title" placeholder="Untitled Note" />
               <form-kit :type="richText" name="content" />
               <t-button type="primary">
                  Save
               </t-button>
            </form-kit>
         </template>
      </section>
   </nuxt-layout>
</template>