<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3';
import {TextBold as BoldIcon} from '@vicons/carbon';

   const props = defineProps<{
      editor?: Editor,
   }>()
</script>
<template>
   <div>
      <editor-m-button>
         <bold-icon />
      </editor-m-button>
   </div>
</template>