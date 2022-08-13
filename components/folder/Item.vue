<script lang="ts" setup>
import { Folder } from '@prisma/client';
import { Folder as FolderIcon } from '@vicons/carbon';
import { OverflowMenuVertical as MenuIcon } from '@vicons/carbon';
const props = defineProps<{
   folder: Folder;
}>()
const route = useRoute()
const { folder_id } = route.params
</script>
<template>
   <nuxt-link :to="`/notes/${folder.id}`" :class="{ active: folder_id == useToString(folder.id).value }">
      <div class="wrpr">
         <div class="flex-center">
            <t-icon>
               <folder-icon />
            </t-icon>
            {{ folder.name }}
         </div>
         <t-button text>
            <t-icon>
               <menu-icon />
            </t-icon>
         </t-button>
      </div>
   </nuxt-link>
</template>

<style lang="scss" scoped>
@use 'assets/styles/colors';

.wrpr {
   padding: .5em;
   display: flex;
   justify-content: space-between;
}

a {
   color: inherit;
   // border: solid 1px red;

   &:hover,
   &.active {
      background-color: colors.$lighter;
   }
}
</style>