<template>
  <pre class="line-numbers max-w-[calc(100vw-40rem)]">
    <code class="language-java" ref="codeBlock">{{ code }}</code>
  </pre>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/plugins/line-numbers/prism-line-numbers'; // Import the line numbers plugin
import 'prismjs/themes/prism.css'; // Import the Prism theme CSS
import 'prismjs/themes/prism.css'; // Ensure this is included
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

const props = defineProps<{
  code: string;
}>();

const codeBlock = ref<HTMLElement | null>(null);

watchEffect(() => {
  if (codeBlock.value) {
    Prism.highlightElement(codeBlock.value);
  }
});
</script>

<style>
pre[class*="language-"] > code {
  position: relative;
  display: block;
  overflow-x: auto; /* Ensure code is scrollable if it overflows */
}
</style>
