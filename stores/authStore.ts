import { defineStore } from "pinia"
import { $fetch } from "ohmyfetch"
import { AuthPayload } from ".."
export const useAuthStore = defineStore('AuthStore', {
   state: () => ({
      accessToken: "",
      currentUser: null
   }),
   getters:{
      apiFetch : (state) =>{
         return $fetch.create({
            baseURL: '/api',
            headers: {
               Authorization: 'Bearer ' + state.accessToken,
            }
         })
      }
   },
   actions:{
      saveAuth ({
         accessToken,
         currentUser
      }:{
         accessToken:string,
         currentUser: AuthPayload
      }){
         this.accessToken = accessToken
         this.currentUser = currentUser

      }
   }
})