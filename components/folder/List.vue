<script lang="ts" setup>
import { Folder } from '@prisma/client';
import { Add as FolderAddIcon, Folders } from '@vicons/carbon'
import { useAuthStore } from '~~/stores/authStore';

const showNewFolder = ref(false)
const { apiFetch } = useAuthStore()

const route = useRoute()
const { folder_id } = route.params

const { data: folders, refresh } = await useLazyAsyncData('folders', () => apiFetch('folders'))
refresh()
</script>

<template>
   <div class="folders">
      <div class="add">
         <h3>Folders</h3>
         <t-button text @click="showNewFolder = true">
            <t-icon>
               <folder-add-icon />
            </t-icon>
         </t-button>
      </div>
      <div class="sub-section">
         <folder-new v-model:show="showNewFolder" />
         <folder-item v-for="folder in folders" :folder="folder" />
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