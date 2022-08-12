<script lang="ts" setup>
import { OverflowMenuVertical as MenuIcon } from '@vicons/carbon'
import { useAuthStore } from '~~/stores/authStore';

const { currentUser: user } = useAuthStore();
</script>

<template>
   <div class="flex-center" v-show="user">
      <nuxt-link to="/notes">
         <t-avatar>
            TC
         </t-avatar>
      </nuxt-link>
      <t-button text>
         <t-icon>
            <menu-icon />
         </t-icon>
      </t-button>
   </div>
   <nuxt-link to="/login" v-show="!user">
      <t-button type="primary">
         Login
      </t-button>
   </nuxt-link>
</template>