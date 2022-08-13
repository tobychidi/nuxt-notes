import { defineStore } from "pinia";

export const useNavStore = defineStore('NavStore', {
   state: (): {
      currentNote: string | null,
   } => ({
      currentNote: null,
   })
})