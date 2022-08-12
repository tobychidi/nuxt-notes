<script lang="ts" setup>
const props = defineProps<{
   active?: boolean,
}>()
</script>
<template>
   <t-button :class="{ active: active }" @click.prevent>
      <t-icon>
         <slot name="icon"></slot>
      </t-icon>
   </t-button>
</template>

<style lang="scss" scoped>
@use 'assets/styles/colors';
.active {
   background-color: colors.$primary;
}
</style>