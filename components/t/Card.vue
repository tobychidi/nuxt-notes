<script lang="ts" setup>
const props = defineProps<{
   noPad?: boolean,
   action?: [confirm?: string, cancel?: string],
}>()

const emits = defineEmits(['confirm', 'cancel'])
</script>
<template>
   <div class="card" :class="{ 'no-pad': noPad }">
      <slot></slot>
      <div class="footer">
         <slot name="action">
            <div class="footer-action">
               <t-button @click="emits('confirm')" type="primary" size="small">
                  {{ action && action[0] ? action[0] : "Save" }}
               </t-button>
               <t-button @click="emits('cancel')" type="secondary" size="small">
                  {{ action && action[1] ? action[1] : "Cancel" }}
               </t-button>
            </div>
         </slot>
      </div>
   </div>
</template>

<style lang="scss" scoped>
.card {
   &.no-pad {
      padding: 0;
      border: none;
      background-color: transparent;
      box-shadow: none;
   }
}

.footer {
   display: flex;
   width: 100%;
}

.footer-action {
   width: 100%;
   display: flex;
   justify-content: flex-end;
   gap: .3em;
}
</style>