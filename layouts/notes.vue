<template>
   <section>
      <div class="row">
         <div class="column-left">
            <left-menu />
         </div>
         <div class="column-mid">
            <slot></slot>
         </div>
         <div class="column-right">
            <right-menu />
         </div>
      </div>
   </section>
</template>

<style lang="scss" scoped>

@use 'assets/styles/utils';

section {
   display: flex;
   justify-content: center;
}

.row {
   display: flex;
   align-items: flex-start;
   position: relative;
   width: 100%;
   max-width: 150ch;
}

.column-left,
.column-right {
   width: 20%;
   position: sticky;
   top: 0em;
   padding: 2em;
   min-width: 30ch;
}

.column-mid {
   flex-grow: 1;
   padding: 2em 7%;
   background-color: rgba(226, 226, 226, 0.169);
   min-height: 90vh;
   @include utils.border($b: 0, $t: 0);
}
</style>