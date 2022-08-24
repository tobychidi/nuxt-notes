<script lang="ts" setup>

const props = defineProps<{
   placeholder?: string;
   initial?: {
      [key: string]: string
   },
   formKey: string;
}>()
const emits = defineEmits(['input'])

const inputState = ref(true)

const inputValue = ref(props.initial)

function handleInput() {
   const data = inputValue.value
   if (data[props.formKey].length == 0) {
      data[props.formKey] = props.initial[props.formKey]
   }
   emits('input', data)
}
</script>

<template>
   <div class="wrpr">
      <form-kit type="form" :actions="false" v-model="inputValue" @submit.stop>
         <form-kit id="inputRef" input-class="input-stealth" :name="formKey" type="text" :placeholder="placeholder"
            @blur="handleInput" />
      </form-kit>
   </div>
</template>

<style lang="scss" scoped>
.wrpr {
   font-size: 1.8rem;
}
</style>