<script lang="ts" setup>
import { Note } from '@prisma/client';
import {
   Document,
   OverflowMenuVertical as MenuIcon,
   Information as InfoIcon,
   Delete as DeleteIcon
} from '@vicons/carbon';

const props = defineProps<{
   note: Note;
}>()

const noteTitile = useShortenString(props.note.title, 12)

const route = useRoute()
const { folder_id } = route.params

const { apiFetch } = useAuthStore()

async function handleDelete() {
   try {
      const res = await apiFetch(`notes/${props.note.id}`, {
         method: 'DELETE',
      })
      refreshNuxtData(`folder-${folder_id}`)
   } catch (error) {
      console.log(error)
   }
}
</script>
<template>
   <div class="wrpr">
      <nuxt-link class="note-card" :to="`/notes/${folder_id}/${note.id}`">
         <t-icon size="large">
            <document />
         </t-icon>
      </nuxt-link>
      <div class="note-title flex-center">
         <p v-tooltip="note.title">{{ noteTitile }}</p>
         <v-dropdown placement="right-end">
            <t-button text>
               <t-icon>
                  <menu-icon />
               </t-icon>
            </t-button>
            <template #popper>
               <div class="dropdown-menu">
                  <t-button type="secondary" class="flex-center">
                     <t-icon>
                        <info-icon />
                     </t-icon>
                     <span>Info</span>
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
   </div>
</template>

<style lang="scss" scoped>
.wrpr {
   display: flex;
   flex-direction: column;
   align-items: center;
}

.note-title {
   justify-content: space-between;
   width: 100%;
   padding: 0 .2em;
   p {
      margin: .3em;
      font-size: .9rem;
   }
}
</style>