<script lang="ts" setup>
import { DocumentAdd as AddIcon } from '@vicons/carbon';

const route = useRoute()
const { folder_id } = route.params

</script>
<template>
   <nuxt-link class="note-card" :to="`/notes/${folder_id}/new`">
      <t-icon size="large">
         <add-icon />
      </t-icon>
   </nuxt-link>
</template>

<style lang="scss" scoped>
</style>