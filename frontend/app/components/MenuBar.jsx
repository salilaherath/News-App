import { useCurrentEditor } from "@tiptap/react";

export default function MenuBar() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="grid grid-cols-12 bg-white rounded-sm my-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`${editor.isActive("bold") ? "font-bold text-primary" : ""}`}
      >
        <i className="ri-bold"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`${
          editor.isActive("italic") ? "font-bold text-primary" : ""
        }`}
      >
        <i className="ri-italic"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${
          editor.isActive("underline") ? "font-bold text-primary" : ""
        }`}
      >
        <i className="ri-underline"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`${
          editor.isActive("strike") ? "font-bold text-primary" : ""
        }`}
      >
        <i className="ri-strikethrough"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`${
          editor.isActive("heading", { level: 1 })
            ? "font-bold text-primary"
            : ""
        }`}
      >
        <i className="ri-h-1"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${
          editor.isActive("heading", { level: 2 })
            ? "font-bold text-primary"
            : ""
        }`}
      >
        <i className="ri-h-2"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${
          editor.isActive("heading", { level: 3 })
            ? "font-bold text-primary"
            : ""
        }`}
      >
        <i className="ri-h-3"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${
          editor.isActive("bulletList") ? "font-bold text-primary" : ""
        }`}
      >
        <i className="ri-list-unordered"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${
          editor.isActive("orderedList") ? "font-bold text-primary" : ""
        }`}
      >
        <i className="ri-list-ordered-2"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${
          editor.isActive("blockquote") ? "font-bold text-primary" : ""
        }`}
      >
        <i className="ri-double-quotes-l"></i>
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <i className="ri-separator"></i>
      </button>
    </div>
  );
}
