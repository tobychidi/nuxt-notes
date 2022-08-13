<script lang="ts" setup>
const props = defineProps<{
   active?: boolean,
}>()
</script>
<template>
   <t-button class="m-button" :class="{ active: active }" @click.prevent>
      <t-icon>
         <slot></slot>
      </t-icon>
   </t-button>
</template>

<style lang="scss" scoped>
@use 'assets/styles/colors';

.m-button {
   padding: .3em;

   &.active {
      background-color: colors.$dark;
      color: colors.$lightest;
   }
}
</style>