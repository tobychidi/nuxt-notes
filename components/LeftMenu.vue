<template>
   <section>
      <div class="sub-section">
         <folder-list />
      </div>
   </section>
</template>

<style lang="scss" scoped>
@use 'assets/styles/colors';

section {
   display: flex;
   flex-direction: column;

   &>div {
      width: 100%;
   }
}


</style>