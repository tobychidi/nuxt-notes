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
   <div class="wrpr">
      <editor-menu :editor="editor" />
      <client-only>
         <editor-content :editor="editor" />
      </client-only>
   </div>
</template>
<style lang="scss" scoped>
@use 'assets/styles/utils';

.wrpr{
   display: flex;
   flex-direction: column;
   gap: .2em;
}


</style>