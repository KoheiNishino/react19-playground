'use client'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import Placeholder from '@tiptap/extension-placeholder'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function Tiptap() {
  const editor = useEditor({
    content: '<p>Hello World! 🌎️</p>',
    extensions: [StarterKit.configure({
      codeBlock: false,
      hardBreak: false,
      heading: {
        levels: [1, 2],
      },
      horizontalRule: false,
      code: false,
      dropcursor: false,
      gapcursor: false,
      history: false,
    }), Placeholder.configure({
      placeholder: 'Write something …',
    })],
    // TODO: debug用のため後で削除
    onUpdate({ editor }) {
      // eslint-disable-next-line no-console
      console.log(editor.getHTML())
    },

  })

  return <EditorContent editor={editor} />
}
