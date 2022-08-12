<script lang="ts" setup>
// const props = defineProps<{
//    // text?: string,
// }>()

</script>

<template>
   <button>
      <slot>
      </slot>
   </button>
</template>

<style lang="scss" scoped>
@use 'assets/styles/colors';

   button {
      padding: 0;
      height: 2.5em;
      width: 2.5em;
      border-radius: 50%;
      background-color: colors.$primary-lighter;
      // color: colors.$dark;
   }
</style>