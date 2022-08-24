// import TextAlign from "@tiptap/extension-text-align";
// import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
// import { Color } from "@tiptap/extension-color";
// import FontSize from "tiptap-extension-font-size";
// import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
// import Table from "@tiptap/extension-table";
// import TableRow from "@tiptap/extension-table-row";
// import TableCell from "@tiptap/extension-table-cell";
// import TableHeader from "@tiptap/extension-table-header";
// import TextStyle from "@tiptap/extension-text-style";
import FormulaExtension from "~/components/editor/formula/Extension";
// import ImageExtension from "./image/Extension";
import { useEditor, Content, Editor } from "@tiptap/vue-3";

// load all highlight.js languages
// import { lowlight } from "lowlight";
import { shallowRef, ShallowRef } from "vue";

export function useTEditor({ content, onFocus, onUpdate }: {
   content?: Content,
   onUpdate?: (editor: Editor) => void,
   onFocus?: () => void,
}) {
   const editor = shallowRef(null);

   onMounted(()=>{
      editor.value = new Editor({
         extensions: [
            FormulaExtension,
            // ImageExtension,
            // Color,
            // FontSize,
            Placeholder,
            StarterKit.configure({
               codeBlock: false,
               blockquote: false,
            }),
            // TableRow,
            // TableHeader,
            // TableCell,
            // TextStyle,
            // CodeBlockLowlight.configure({
            //    lowlight,
            // }),
            // Highlight.configure({ multicolor: true }),
            // Table.configure({
            //    resizable: true,
            // }),
            // TextAlign.configure({
            //    types: ["heading", "paragraph"],
            // }),
         ],
         editorProps: {
            attributes: {
               class: "editor",
            },
         },
         content,
         onUpdate: ({ editor }) => {
            if (onUpdate) onUpdate(editor as Editor)
         },
         onFocus,
      })
   })

   onBeforeUnmount(()=>{
      editor.value.destroy()
   })

   function getVoiceText() {
      editor.value.storage.formula.voiceText = true;
      return editor.value.getText();
   }
   function getContentText() {
      editor.value.storage.formula.voiceText = false;
      return editor.value.getText();
   }

   return { editor, getVoiceText, getContentText };
}