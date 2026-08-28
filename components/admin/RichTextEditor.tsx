"use client";

import { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

const ResizableImage = TiptapImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.width || null,
        renderHTML: (attributes: { width?: string | null }) => {
          if (!attributes.width) return {};
          return { style: `width: ${attributes.width}` };
        },
      },
    };
  },
});

const WIDTH_PRESETS = [
  { label: "Small", value: "320px" },
  { label: "Medium", value: "600px" },
  { label: "Large", value: "900px" },
  { label: "Full", value: "100%" },
];

async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/admin/blogs/upload", { method: "POST", body: form });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Upload failed.");
  return data.url as string;
}

export default function RichTextEditor({
  content,
  onChange,
  variant = "full",
  placeholder,
}: {
  content: string;
  onChange: (html: string) => void;
  variant?: "full" | "compact";
  placeholder?: string;
}) {
  const compact = variant === "compact";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: compact
      ? [
          StarterKit.configure({
            heading: false,
            blockquote: false,
            bulletList: false,
            orderedList: false,
            listItem: false,
            listKeymap: false,
            codeBlock: false,
            horizontalRule: false,
            link: false,
          }),
          Placeholder.configure({ placeholder: placeholder ?? "Write a short excerpt…" }),
        ]
      : [
          StarterKit.configure({ link: { openOnClick: false } }),
          ResizableImage.configure({ inline: false, allowBase64: false }),
          Placeholder.configure({ placeholder: placeholder ?? "Write the article…" }),
        ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: compact
      ? { attributes: { class: "rte-prosemirror" } }
      : {
          attributes: { class: "rte-prosemirror blog-article-content" },
          handleDrop(view, event, _slice, moved) {
            if (moved) return false;
            const files = Array.from(event.dataTransfer?.files ?? []).filter((f) =>
              f.type.startsWith("image/")
            );
            if (files.length === 0) return false;
            event.preventDefault();
            files.forEach((file) => {
              uploadImage(file)
                .then((url) => {
                  const { schema } = view.state;
                  const node = schema.nodes.image.create({ src: url, alt: file.name });
                  const coords = view.posAtCoords({ left: event.clientX, top: event.clientY });
                  const pos = coords ? coords.pos : view.state.selection.from;
                  view.dispatch(view.state.tr.insert(pos, node));
                })
                .catch((e) => setUploadError(e instanceof Error ? e.message : "Upload failed."));
            });
            return true;
          },
          handlePaste(_view, event) {
            const items = Array.from(event.clipboardData?.items ?? []);
            const imageItem = items.find((i) => i.type.startsWith("image/"));
            if (!imageItem) return false;
            const file = imageItem.getAsFile();
            if (!file) return false;
            event.preventDefault();
            uploadImage(file)
              .then((url) => {
                editor?.chain().focus().setImage({ src: url, alt: file.name }).run();
              })
              .catch((e) => setUploadError(e instanceof Error ? e.message : "Upload failed."));
            return true;
          },
        },
  });

  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previousUrl || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const handleFilePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    try {
      const url = await uploadImage(file);
      editor.chain().focus().setImage({ src: url, alt: file.name }).run();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const imageSelected = !compact && editor.isActive("image");

  return (
    <div className={`rte ${compact ? "rte--compact" : ""}`}>
      <div className="rte-toolbar">
        {!compact && (
          <>
            <button
              type="button"
              className={`rte-btn ${editor.isActive("heading", { level: 1 }) ? "is-active" : ""}`}
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
              H1
            </button>
            <button
              type="button"
              className={`rte-btn ${editor.isActive("heading", { level: 2 }) ? "is-active" : ""}`}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
              H2
            </button>
            <button
              type="button"
              className={`rte-btn ${editor.isActive("heading", { level: 3 }) ? "is-active" : ""}`}
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            >
              H3
            </button>
            <span className="rte-sep" />
          </>
        )}
        <button
          type="button"
          className={`rte-btn ${editor.isActive("bold") ? "is-active" : ""}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </button>
        <button
          type="button"
          className={`rte-btn rte-btn--italic ${editor.isActive("italic") ? "is-active" : ""}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </button>
        <button
          type="button"
          className={`rte-btn rte-btn--underline ${editor.isActive("underline") ? "is-active" : ""}`}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          U
        </button>
        <button
          type="button"
          className={`rte-btn rte-btn--strike ${editor.isActive("strike") ? "is-active" : ""}`}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          S
        </button>
        {!compact && (
          <>
            <button
              type="button"
              className={`rte-btn rte-btn--code ${editor.isActive("code") ? "is-active" : ""}`}
              onClick={() => editor.chain().focus().toggleCode().run()}
            >
              &lt;/&gt;
            </button>
            <span className="rte-sep" />
            <button
              type="button"
              className={`rte-btn ${editor.isActive("bulletList") ? "is-active" : ""}`}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              &bull; List
            </button>
            <button
              type="button"
              className={`rte-btn ${editor.isActive("orderedList") ? "is-active" : ""}`}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              1. List
            </button>
            <button
              type="button"
              className={`rte-btn ${editor.isActive("blockquote") ? "is-active" : ""}`}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              &ldquo;&rdquo;
            </button>
            <button
              type="button"
              className={`rte-btn ${editor.isActive("codeBlock") ? "is-active" : ""}`}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
              Code Block
            </button>
            <button
              type="button"
              className="rte-btn"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
              &mdash; Divider
            </button>
            <span className="rte-sep" />
            <button
              type="button"
              className={`rte-btn ${editor.isActive("link") ? "is-active" : ""}`}
              onClick={setLink}
            >
              Link
            </button>
            <button
              type="button"
              className="rte-btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? "Uploading…" : "+ Image"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
              hidden
              onChange={handleFilePick}
            />
          </>
        )}
        <span className="rte-sep" />
        <button type="button" className="rte-btn" onClick={() => editor.chain().focus().undo().run()}>
          Undo
        </button>
        <button type="button" className="rte-btn" onClick={() => editor.chain().focus().redo().run()}>
          Redo
        </button>
      </div>

      {imageSelected && (
        <div className="rte-image-toolbar">
          <span>Image size:</span>
          {WIDTH_PRESETS.map((p) => (
            <button
              key={p.value}
              type="button"
              className="rte-btn"
              onClick={() => editor.chain().focus().updateAttributes("image", { width: p.value }).run()}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {!compact && uploadError && <p className="admin-error">{uploadError}</p>}

      <EditorContent editor={editor} className="rte-content" />
      {!compact && (
        <p className="admin-field-help">
          Drag and drop an image anywhere in the editor, paste one from your clipboard, or use the
          &ldquo;+ Image&rdquo; button to upload from your computer. Click an image to change its size.
        </p>
      )}
    </div>
  );
}
