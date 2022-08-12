<script lang="ts" setup>
import { Folder } from '@prisma/client';
import { useAuthStore } from '~~/stores/authStore';

const route = useRoute()
const { folder_id } = route.params


const { apiFetch } = useAuthStore()
const folder = ref<Folder>()

onBeforeMount(async () => {
   folder.value = await apiFetch(`folders/${folder_id}`)
})
</script>

<template>
   <nuxt-layout name="notes">
      <section>
         <h2>{{ folder?.name }}</h2>
         <section class="notes-wrpr">
            <folder-add-note />
         </section>
      </section>
   </nuxt-layout>
</template>

<style lang="scss" scoped>
.notes-wrpr {
   padding: 3em 1em;
   display: flex;
   flex-wrap: wrap;
   gap: 1em;
   max-width: 100%;
}
</style>