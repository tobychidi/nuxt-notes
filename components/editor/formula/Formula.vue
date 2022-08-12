<template>
   <node-view-wrapper style="display: inline-block">
      <math-field class="mathField" :class="{ noBorder: !isEditable }" keypress-sound="null" plonk-sound="null"
         virtual-keyboard-mode="hidden" ref="mathField" @input="handleInput" :read-only="isEditable ? null : true" />
   </node-view-wrapper>
</template>

<script lang="ts" setup>
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from "@tiptap/vue-3";
import { nextTick, onMounted, ref, toRef, watch, watchEffect } from "vue";
import { MathfieldElement } from "mathlive";
import "mathlive/dist/mathlive-fonts.css";
// import "mathlive/dist/mathlive";

const props = defineProps(nodeViewProps);

const mathField = ref<MathfieldElement | null>(null);

const isEditable = props.editor.isEditable;

watch([mathField], () => {
   if (mathField.value) {
      mathField.value.value = props.node.attrs.content ?? "";
   }
});

// onMounted(async () => {
//    await nextTick();
//    if (mathField.value) mathField.value.focus()
// });

function handleInput() {
   props.updateAttributes({
      content: mathField.value?.getValue(),
      spoken: mathField.value?.getValue("spoken-text"),
   });
   // props.node.attrs.content = mathField.value?.getValue()
   // props.node.attrs.spoken = mathField.value?.getValue('spoken-text')
}
</script>

<style lang="scss" scoped>
@use 'assets/styles/utils';
@use 'assets/styles/colors';

.mathField {
   display: flex;
   min-width: 1rem;
   font-size: 1.2em;
   outline: none;
   border: 1px dashed;
   padding: 0px 3px;
   border-color: colors.$dark;
   border-radius: utils.$border-radius;
   line-height: 0;
   overflow-y: hidden;
}

// p{
//    all: unset;
// }

.noBorder {
   border: none;
}
</style>
