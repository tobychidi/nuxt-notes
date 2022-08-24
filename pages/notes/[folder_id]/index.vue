<script lang="ts" setup>

const route = useRoute()
const { folder_id } = route.params

const { apiFetch } = useAuthStore()

const { data: folder, refresh, pending } = await useAsyncData(`folder-${folder_id}`, () => apiFetch(`folders/${folder_id}`))

refresh()

async function handleUpdateFolder(data) {
   try {
      const res = await apiFetch(`folders/${folder_id}`, {
         method: 'PUT',
         body: { ...data }
      });
      refresh()
      refreshNuxtData(`folders`)
   } catch (error) {
      console.log(error)
   }
}
</script>

<template>
   <nuxt-layout name="notes">
      <section v-if="folder" class="wrpr">
         <t-stealth-input :placeholder="folder.name" :initial="folder" form-key="name" @input="handleUpdateFolder" />
         <section class="notes-wrpr">
            <folder-add-note v-motion-pop />
            <folder-note v-for="note in folder.notes" :key="note.title" :note="note" v-motion-pop />
         </section>
      </section>
   </nuxt-layout>
</template>

<style lang="scss" scoped>
.notes-wrpr {
   padding: 3em 1em;
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   gap: 2em;
   max-width: 100%;
}
</style>