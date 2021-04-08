<template>
  <div class="inline-flex px-4 py-2 rounded-full bg-white">
    <auto-resize-input
      v-if="isEditable"
      v-model="editText"
      @input="handleInput"
      placeholder="Message"
    />
    <div class="block" v-else>
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts">
import AutoResizeInput from '@/components/ui/AutoResizeInput.vue';
import { Message, MessageValue } from '@jovotech/output';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  name: 'message-display',
  components: { AutoResizeInput },
})
export default class MessageDisplay extends Vue {
  @Prop({ required: true, type: [Object, String] })
  message!: MessageValue;

  @Prop({ required: false, type: Boolean, default: false })
  isEditable!: boolean;

  editText = '';

  get text(): string {
    return typeof this.message === 'string'
      ? this.message
      : this.message.displayText || this.message.text;
  }

  handleInput() {
    const newMessage: MessageValue =
      typeof this.message === 'string'
        ? this.editText
        : {
            displayText: this.message.displayText ? this.editText : undefined,
            text: this.message.displayText ? '' : this.editText,
          };
    this.$emit('input', newMessage);
  }

  @Watch('message', { deep: true, immediate: true })
  onMessageChange() {
    this.editText = this.text;
  }
}
</script>
