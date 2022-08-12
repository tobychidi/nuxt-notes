<script lang="ts" setup>
import { EditorContent } from "@tiptap/vue-3";

const props = defineProps({
   context: Object,
})

const { editor, getVoiceText } = useTEditor({
   content: props.context._value,
   onUpdate: (editor) => {
      props.context.node.input(editor.getHTML())
   },
})
</script>

<template>
   <div>
      <editor-menu />
      <client-only>
         <div class="editor-wrpr">
            <editor-content :editor="editor" />
         </div>
      </client-only>
   </div>
</template>
<style lang="scss" scoped>
@use 'assets/styles/utils';
.editor-wrpr{
   @include utils.border;
   border-radius: utils.$border-radius;
   padding: 1em;
}
</style>