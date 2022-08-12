<script lang="ts" setup>
import { ButtonSize } from '~~/index';

const props = defineProps<{
   size?: ButtonSize,
}>()
</script>
<template>
   <span :class="{ large: size == 'large' }">
      <slot></slot>
   </span>
</template>

<style lang="scss" scoped>
span {
   display: flex;
   height: 1.3em;
   width: 1.3em;
   
   &.large{
      font-size: 1.5rem;
   }
}
</style>