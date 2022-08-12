<script lang="ts" setup>
import { createInput } from '@formkit/vue'
import { EditorInput } from '#components'

const route = useRoute()
const { folder_id, note_id } = route.params

const initialValue = ref({
   title: "Untitled",
   content: ""
})

const richText = createInput(EditorInput)
</script>

<template>
   <nuxt-layout name="notes">
      <section>
         <form-kit type="form" :value="initialValue" :actions="false">
            <form-kit type="text" name="title" />
            <form-kit :type="richText" name="content" />
            <t-button type="primary">
               Save
            </t-button>
         </form-kit>
      </section>
   </nuxt-layout>
</template>