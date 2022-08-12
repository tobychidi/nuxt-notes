<template>
   <div class="layout">
      <header>
         <nuxt-link to="/">
            <h1>Notes</h1>
         </nuxt-link>

         <user />
      </header>
      <main>
         <slot></slot>
      </main>
   </div>
</template>

<style lang="scss" scoped>
.layout{
   display: flex;
   flex-direction: column;
}
header {
   display: flex;
   justify-content: space-between;
   align-items: center;
   position: sticky;
   top: 0;
   width: 100%;
}

h1 {
   font-size: 1.8rem;
}


</style>