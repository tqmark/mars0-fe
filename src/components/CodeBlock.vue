<template>
  <pre class="line-numbers">
    <code class="language-java" ref="codeBlock">{{ code }}</code>
  </pre>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/themes/prism.css';

const props = defineProps<{
  code: string;
}>();

onMounted(() => {
  Prism.highlightElement(props.code);
});


</script>
