<script lang="ts" setup>
import { Folder } from '@prisma/client';
import { Add as FolderAddIcon, Folders } from '@vicons/carbon'

const showNewFolder = ref(false)
const { apiFetch } = useAuthStore()

const route = useRoute()
const { folder_id } = route.params

const { data: folders, refresh } = await useLazyAsyncData('folders', () => apiFetch('folders'))
refresh()


async function handleAdd() {
   const newFolder = await apiFetch('folders', {
      method: 'POST',
      body: {
         name: ""
      }
   })

   refresh()
}
</script>

<template>
   <div class="folders">
      <div class="add">
         <h3>Folders</h3>
         <t-button text @click="handleAdd">
            <t-icon>
               <folder-add-icon />
            </t-icon>
         </t-button>

      </div>
      <div class="sub-section">
         <folder-item v-for="folder in folders" :folder="folder" v-motion-pop />
      </div>
   </div>
</template>

<style lang="scss" scoped>
.folders {
   // background-color: colors.$dark;
   display: flex;
   flex-direction: column;

   .add {
      display: flex;
      justify-content: space-between;
      align-items: center;
   }
}

.sub-section {
   display: flex;
   flex-direction: column;
   gap: .5em;
}
</style>