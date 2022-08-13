<script lang="ts" setup>
import { Folder } from '@prisma/client';
import { useAuthStore } from '~~/stores/authStore';

const route = useRoute()
const { folder_id } = route.params


const { apiFetch } = useAuthStore()
// const folder = ref<Folder>()

// onBeforeMount(async () => {
//    folder.value = await 
// })
const { data: folder, refresh, pending } = await useAsyncData(`folder-${folder_id}`, () => apiFetch(`folders/${folder_id}`))

refresh()
</script>

<template>
   <nuxt-layout name="notes">
      <section class="wrpr">
         <h2>{{ folder?.name }}</h2>
         <section class="notes-wrpr">
            <folder-add-note />
            <folder-note v-if="folder" v-for="note in folder.notes" :note="note" />
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
   gap: 1em;
   max-width: 100%;
}
</style>