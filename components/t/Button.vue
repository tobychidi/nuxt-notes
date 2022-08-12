<script lang="ts" setup>
import { ButtonType, ButtonSize } from '~~/index.js';

const props = defineProps<{
   text?: boolean,
   type?: ButtonType,
   size?: ButtonSize,
}>()
</script>

<template>
   <button :class="{
      'button-text': text,
      'button-primary': type == 'primary',
      'button-secondary': type == 'secondary',
      'button-small': size == 'small',
   }" @click.stop>
      <slot></slot>
   </button>
</template>

<style lang="scss" scoped>


@use 'assets/styles/colors';
@use 'assets/styles/utils';

.button-primary {
   background-color: colors.$primary-lighter;

   &:hover {
      background-color: colors.$primary;
   }
}
.button-secondary {
   background-color: colors.$lighter;
   &:not(&:hover){
      background-color: transparent;
      border-color: transparent;
   }
}
.button-text {
   background-color: transparent;
   border: none;
   padding: .16em;

   &:hover {
      background-color: colors.$light;
      // color: colors.$primary;
   }

   &.button-primary {
      color: colors.$primary;

      &:hover{
         color: colors.$primary-darker;
      }
   }
}

.button-small{
   padding: .3em .6em;
}


</style>