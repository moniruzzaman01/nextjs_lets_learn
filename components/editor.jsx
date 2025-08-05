"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorMenu from "./editor-menu";

export default function Editor({ description, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        //-------
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          " border bg-white h-52 px-3 py-2 focus:outline-none focus:border-black rounded-lg",
      },
    },
    onUpdate: ({ editor }) => {
      //-------
      const html = editor.getHTML();
      onChange(html);
    },
    immediatelyRender: false,
  });
  if (!editor) return null;

  return (
    <>
      <EditorMenu editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}
