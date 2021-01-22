<template>
  <button class="inline-flex border border-black bg-white px-4 py-1 rounded-full cursor-pointer focus:outline-none hover:bg-gray-50">
    <auto-resize-input
      v-if="isEditable"
      v-model="editText"
      @input="handleInput"
      placeholder="Quick-reply"
    />
    <div class="block" v-else>
      {{ text }}
    </div>
  </button>
</template>

<script lang="ts">
import AutoResizeInput from '@/components/ui/AutoResizeInput.vue';
import { QuickReply } from 'jovo-output';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  name: 'generic-quick-reply-display',
  components: { AutoResizeInput },
})
export default class GenericQuickReplyDisplay extends Vue {
  @Prop({ required: true, type: [Object, String] })
  quickReply!: QuickReply;

  @Prop({ required: false, type: Boolean, default: false })
  isEditable!: boolean;

  editText = '';

  get text(): string {
    return typeof this.quickReply === 'string' ? this.quickReply : this.quickReply.text;
  }

  handleInput() {
    const newQuickReply: QuickReply =
      typeof this.quickReply === 'string'
        ? this.editText
        : {
            text: this.editText,
            value: this.quickReply.value,
          };
    this.$emit('input', newQuickReply);
  }

  @Watch('quickReply', { deep: true, immediate: true })
  onQuickReplyChange() {
    this.editText = this.text;
  }
}
</script>
