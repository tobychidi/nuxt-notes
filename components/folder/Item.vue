<script lang="ts" setup>
import { Folder } from '@prisma/client';
import { Folder as FolderIcon, OverflowMenuVertical as MenuIcon, Edit as EditIcon, Delete as DeleteIcon } from '@vicons/carbon';
import { useAuthStore } from '~~/stores/authStore';
const props = defineProps<{
   folder: Folder;
}>()
const route = useRoute()
const { folder_id } = route.params

const { apiFetch } = useAuthStore()

async function handleDelete() {
   try {
      const res = await apiFetch(`folders/${props.folder.id}`, {
         method: 'DELETE',
      })
      refreshNuxtData('folders')
   } catch (error) {
      console.log(error)
   }
}
</script>
<template>
   <div class="wrpr">
      <nuxt-link :to="`/notes/${folder.id}`" :class="{ active: folder_id == useToString(folder.id).value }">
         <div class="flex-center">
            <t-icon>
               <folder-icon />
            </t-icon>
            {{ folder.name }}
         </div>
      </nuxt-link>
      <v-dropdown placement="right">
         <t-button text>
            <t-icon>
               <menu-icon />
            </t-icon>
         </t-button>
         <template #popper>
            <div class="menu-wrpr">
               <t-button type="secondary" class="flex-center">
                  <t-icon>
                     <edit-icon />
                  </t-icon>
                  <span>Edit</span>
               </t-button>
               <t-button type="secondary" class="flex-center" @click="handleDelete">
                  <t-icon>
                     <delete-icon />
                  </t-icon>
                  <span>Delete</span>
               </t-button>
            </div>
         </template>
      </v-dropdown>
   </div>
</template>

<style lang="scss" scoped>
@use 'assets/styles/colors';

.wrpr {
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: .2em;
}

a {
   color: inherit;
   width: 100%;
   padding: .8em;
   // border: solid 1px red;

   &:hover,
   &.active {
      background-color: colors.$lighter;
   }
}

.menu-wrpr {
   display: flex;
   flex-direction: column;
   gap: .2em;
   padding: .5em;

   button {
      border: none;
      padding: .5em;
   }
}
</style>