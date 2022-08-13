<script lang="ts" setup>
import { Note } from '@prisma/client';
import { Document } from '@vicons/carbon';

const props = defineProps<{
   note: Note;
}>()
const route = useRoute()
const { folder_id } = route.params

</script>
<template>
   <div class="wrpr">
      <nuxt-link class="note-card" :to="`/notes/${folder_id}/${note.id}`">
         <t-icon size="large">
            <document />
         </t-icon>
      </nuxt-link>
      <p>{{ note.title }}</p>
   </div>
</template>

<style lang="scss" scoped>
.wrpr{
   display: flex;
   flex-direction: column;
   align-items: center;
}
p{
   margin: .5em;
}
</style>