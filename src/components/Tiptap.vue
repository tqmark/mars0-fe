<script setup lang="ts">
import { useTiptapEditor } from '@/composables/editor/useTiptapEditor.ts'
import { onBeforeUnmount, onMounted, ref, toRef, toRefs, watch } from 'vue'
import { EditorContent } from '@tiptap/vue-3'

const props = withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
}>(), {
  modelValue: '',
  placeholder: '',
})

const emit = defineEmits<{
  (event: 'update:modelValue', payload: typeof props.modelValue): void
  (event: 'addAttachments', payload: Array<File>): void
  (event: 'drop', dragEvent: DragEvent): void
}>()

const { modelValue } = toRefs(props)
const { editor } = useTiptapEditor(toRef(props, 'placeholder'))

const contentRef = ref<any>(null)

const onDropFile = async (dragEvent: DragEvent) => emit('drop', dragEvent)

watch(modelValue, () => {
  if (editor.value?.getHTML() !== modelValue.value) {
    editor.value?.commands.setContent(modelValue.value || '')
  }
})

onMounted(() => {
  editor.value?.commands.setContent(modelValue.value || '')
  editor.value?.on('update', (updateProps) => {
    if (updateProps.editor.isEmpty) {
      emit('update:modelValue', '')
    } else {
      emit('update:modelValue', updateProps.editor.getHTML())
    }
  })
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

defineExpose({
  editor,
  contentRef,
})
</script>

<template>
  <div class="editor_wrap border rounded-lg p-3 max-h-36 overflow-scroll">
    <EditorContent
      v-if="editor"
      ref="contentRef"
      :editor="editor"
      class="editor_text_area"
      @drop.prevent="onDropFile"
      @dragenter.prevent
      @dragover.prevent
    />
  </div>
</template>

<style scoped lang="scss">
.editor_wrap {
  :deep(.tiptap) {
    p.is-editor-empty:first-child::before {
      color: #adb5bd;
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
    }
  }

  :deep(.class_mention) {
    margin-right: 3px;
    color: var(--color-primary, #0260EA);
    font-weight: 700;
  }

  .lp_button_group.addon .lp_button:is(:disabled,.disabled) {
    color: #dfdfdf;
    background-color: #fff;
    border-color: #dfdfdf;
  }

  :deep(.editor_text_area) {
    @property --editor-min-h {
      syntax: "<min-height>";
      inherits: true;
      initial-value: 200px;
    }

    & {
      height: auto;
      font-family: system-ui, -apple-system, "SF Pro Display", blinkmacsystemfont, roboto, "Noto Color Emoji", sans-serif;
    }

    .ProseMirror {
      min-height: var(--editor-min-h, 200px);

      &:focus {
        outline: none;
      }
    }

    img.ProseMirror-selectednode {
      filter: opacity(0.7);
    }
  }
}
</style>
