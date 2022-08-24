<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3';
import {TextBold as BoldIcon, TextItalic, FunctionMath} from '@vicons/carbon';

   const props = defineProps<{
      editor?: Editor,
   }>()
</script>
<template>
   <div>
      <editor-m-button :active="editor?.isActive('bold')" @click="editor?.chain().focus().toggleBold().run()">
         <bold-icon />
      </editor-m-button>
      <editor-m-button :active="editor?.isActive('italic')" @click="editor?.chain().focus().toggleItalic().run()">
         <text-italic />
      </editor-m-button>
      <editor-m-button :active="editor?.isActive('italic')" @click="editor?.chain().focus().insertFormula().run()">
         <function-math />
      </editor-m-button>
   </div>
</template>

<style lang="scss" scoped>
div{
   display: flex;
   gap: .2em;
}
</style>