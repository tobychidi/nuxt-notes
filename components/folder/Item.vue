<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { Folder } from '@prisma/client';
import {
   Folder as FolderIcon,
   OverflowMenuVertical as MenuIcon,
   Edit as EditIcon, Delete as DeleteIcon,
   Document as DocumentIcon
} from '@vicons/carbon';

const props = defineProps<{
   folder: Folder;
}>()

const route = useRoute()
const { folder_id } = route.params

const { apiFetch } = useAuthStore()
const { currentNote } = storeToRefs(useNavStore())

const isActive = computed(() => folder_id == useToString(props.folder.id).value)

function handleEdit() {
   navigateTo({
      path: `/notes/${props.folder.id}`,
   })
}

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
   <div>
      <div class="wrpr">
         <nuxt-link :to="`/notes/${folder.id}`" :class="{ active: isActive }">
            <div class="flex-center">
               <t-icon>
                  <folder-icon />
               </t-icon>
               {{ folder.name }}
            </div>
         </nuxt-link>
         <v-dropdown placement="right-start">
            <t-button text>
               <t-icon>
                  <menu-icon />
               </t-icon>
            </t-button>
            <template #popper>
               <div class="dropdown-menu">
                  <t-button type="secondary" class="flex-center" @click="handleEdit">
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
      <div v-if="isActive && currentNote" class="flex-center note" v-motion-pop>
         <t-icon>
            <document-icon />
         </t-icon>
         {{ currentNote }}
      </div>
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

.note {
   padding: .5em 1.5em;
}
</style>