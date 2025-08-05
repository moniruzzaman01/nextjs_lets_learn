"use client";

import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Underline,
} from "lucide-react";
import { Toggle } from "./ui/toggle";

export default function EditorMenu({ editor }) {
  if (!editor) return "loading";

  const MenuItems = [
    {
      icon: <Bold />,
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      icon: <Italic />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: <Underline />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      icon: <Heading1 />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      icon: <Heading2 />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      icon: <Heading3 />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
  ];

  return (
    <div className=" flex gap-1 justify-start items-center bg-white rounded-lg p-1">
      {MenuItems.map((item, idx) => (
        <Toggle size="sm" key={idx} onPressedChange={item.onClick}>
          {item.icon}
        </Toggle>
      ))}
    </div>
  );
}
