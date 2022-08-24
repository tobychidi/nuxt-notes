import { Node, mergeAttributes, Attributes } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import Formula from "./Formula.vue";

declare module "@tiptap/core" {
   interface Commands<ReturnType> {
      formula: {
         insertFormula: () => ReturnType;
      };
   }
}

export default Node.create({
   name: "formula",
   group: "inline",
   content: 'inline*',
   // content: 'text*', // important!
   inline: true, // important!
   // selectable: true,
   isolating: true,
   code: true,
   isLeaf: true,
   atom: true,

   parseHTML() {
      return [
         {
            tag: "formula", // important!
         },
      ];
   },

   renderHTML({ HTMLAttributes, node }) {
      return ["formula", mergeAttributes({ class: "math-node" }, HTMLAttributes)];
   },

   renderText({ node }) {
      if (this.storage.voiceText) {
         return `${node.attrs.spoken}`;
      }
      return `${node.attrs.content}`;
   },
   addStorage() {
      return {
         voiceText: true,
      };
   },
   addCommands() {
      return {
         insertFormula:
            () =>
            ({ editor, commands }) => {
               commands.insertContent(`<formula></formula>`);
               // commands.setNode(this.name)
               return true;
            },
      };
   },
   addAttributes() {
      return {
         content: {
            default: null,
            parseHTML: (element) => element.getAttribute("data-content"),
            renderHTML: (attributes) => {
               if (!attributes.content) {
                  return {};
               }

               return {
                  "data-content": attributes.content,
               };
            },
         },
         spoken: {
            default: null,
            parseHTML: (element) => element.getAttribute("data-spoken"),
            renderHTML: (attributes) => {
               if (!attributes.spoken) {
                  return {};
               }

               return {
                  "data-spoken": attributes.spoken,
               };
            },
         },
      };
   },
   addNodeView() {
      return VueNodeViewRenderer(Formula);
   },
});
