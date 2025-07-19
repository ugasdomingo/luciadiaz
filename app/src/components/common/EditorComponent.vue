<script setup>
  import Editor from '@tinymce/tinymce-vue'

  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['update:modelValue'])

  const handle_change = (content) => {
    emit('update:modelValue', content)
  }
</script>

<template>
  <main id="sample">
    <Editor
      :model-value="props.modelValue"
      @update:modelValue="handle_change"
      api-key="hgq60faxr9cutw0vi6tjcs6h4w4bwlbyhp5hp71rteepokoy"
      :init="{
        toolbar_mode: 'sliding',
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        setup: (editor) => {
          editor.on('input change keyup', () => {
            const content = editor.getContent()
            handle_change(content)
          })
        }
      }"
      :initial-value="props.modelValue"
    />
  </main>
</template>

<style scoped lang="scss">

</style>
