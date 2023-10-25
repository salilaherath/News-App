/*import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "remixicon/fonts/remixicon.css";
import MenuBar from "./MenuBar";

export default function Tiptap({ onDescriptionChange }) {
  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
    }),
    toHtml(),
  ];
  const editorProps = {
    attributes: {
      class: "rounded-sm min-h-[200px] min-w-[400px] bg-white",
    },
  };

  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      editorProps={editorProps}
      onUpdate={(context) => {
        const newDescription = context.editor.getJSON();
        onDescriptionChange(newDescription);
      }}
    ></EditorProvider>
  );
}
*/

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import "./EditorStyles.css";
import "remixicon/fonts/remixicon.css";
import Underline from "@tiptap/extension-underline";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="grid grid-cols-10 bg-white rounded-sm my-2 gap">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <i className="ri-bold"></i>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <i className="ri-italic"></i>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
      >
        <i className="ri-underline"></i>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <i className="ri-strikethrough"></i>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        <i className="ri-h-1"></i>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        <i className="ri-h-2"></i>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <i className="ri-list-unordered"></i>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <i className="ri-list-ordered-2"></i>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        <i className="ri-double-quotes-l"></i>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <i className="ri-separator"></i>
      </button>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Underline,
];

const content = ``;

const editorProps = {
  attributes: {
    class: "rounded-sm min-h-[200px] min-w-[400px] bg-white p-4",
  },
};

const Tiptap = ({ setDescription }) => {
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={content}
      editorProps={editorProps}
      onUpdate={({ editor }) => {
        const html = editor.getHTML();
        setDescription(html);
      }}
    ></EditorProvider>
  );
};

export default Tiptap;
