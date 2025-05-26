import type { Ref } from 'vue'
import { useEditor, type EditorOptions } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Mention from '@tiptap/extension-mention'
import domHelper from '@/helpers/domHelper.ts'
type EditorState = Parameters<NonNullable<EditorOptions['editorProps']['transformPastedHTML']>>[1]['state']

export const useTiptapEditor = (placeholderRef?: Ref<string>) => {

  const normalizeHtmlElement = (element: HTMLElement) => {
    if (element.style) {
      element.style.fontSize = ''
    }
    if (element.childNodes.length) {
      element.childNodes.forEach(child => normalizeHtmlElement(<HTMLElement>child))
    }
    return element
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        dropcursor: false,
      }),
      Placeholder.configure({
        placeholder: () => placeholderRef?.value || '',
      }),
      Underline,
      Color,
      TextStyle,
      Image.configure({
        HTMLAttributes: {
          contenteditable: 'true',
          style: 'max-width: 100%',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'editor_link',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Mention.configure({
        HTMLAttributes: {
          class: 'class_mention',
        },
      }),
    ],
    editorProps: {
      transformPastedHTML: (html: string, view) => {
        const state = view.state as EditorState & { mention$: { active: boolean } }
        const document: Document = domHelper.parseFromString(html)
        document.body.childNodes.forEach(element => normalizeHtmlElement(<HTMLElement>element))
        if (state.mention$.active) {
          // if it is mentioning, only raw text should be pasted
          return document.body.innerText
        }
        return document.head.innerHTML + document.body.innerHTML
      }
    }
  })

  const getSelectedText = (): string => {
    if (!editor.value) return ''
    const { from, to, empty } = editor.value.state.selection
    if (empty) {
      return ''
    }
    return editor.value.state.doc.textBetween(from, to, '\n')
  }

  return {
    editor,
    getSelectedText
  }
}
