'use client'

import type { MouseEventHandler, ReactNode } from 'react'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { cn } from '../util/cn'

function MenuButton({ children, disabled, isActive, onClick }:
{ children: ReactNode, disabled?: boolean, isActive?: boolean, onClick: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <button
      type="button"
      className={cn('select-none rounded px-3 py-1', disabled
        ? 'bg-gray-100 text-gray-400'
        : isActive
          ? 'bg-purple-600 text-white'
          : 'bg-white text-gray-700 hover:bg-gray-100')}
      disabled={!!disabled}
      onClick={onClick}
      translate="no"
    >
      {children}
    </button>
  )
}

function MenuBar() {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2 border-b bg-gray-50 p-2">
      <div className="flex flex-wrap gap-2">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
        >
          Bold
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
        >
          Italic
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
        >
          Strike
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          Clear marks
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          Clear nodes
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
        >
          H1
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
        >
          H2
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
        >
          Bullet list
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
        >
          Ordered list
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
        >
          Blockquote
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          Undo
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          Redo
        </MenuButton>
      </div>
    </div>
  )
}

export default function Tiptap() {
  return (
    <EditorProvider
      content="<p>Hello World! 🌎️</p>"
      extensions={[StarterKit.configure({
        codeBlock: false,
        hardBreak: false,
        heading: {
          levels: [1, 2],
        },
        horizontalRule: false,
        code: false,
        dropcursor: false,
        gapcursor: false,
      }), Placeholder.configure({
        placeholder: 'Write something …',
      })]}
      // TODO: デバッグ完了後に削除
      onUpdate={({ editor }) => {
        // eslint-disable-next-line no-console
        console.log(editor.getHTML())
      }}
      slotBefore={<MenuBar />}
    />
  )
}
