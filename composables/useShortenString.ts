export function useShortenString(str: string, length: number): string {
   if (str.length > length) {
      const shortened = str.slice(0, length - 3) + "...";
      return shortened
   }
   return str
}