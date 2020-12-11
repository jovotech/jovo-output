<template>
  <div
    v-once
    v-text="value"
    v-bind="$attrs"
    contenteditable="true"
    class="max-w-full w-full min-h-em whitespace-pre-wrap break-words text-inherit font-sans text-base cursor-text focus:outline-none"
    role="textbox"
    spellcheck="true"
    :placeholder="placeholder"
    @input="$emit('input', $event.target.innerText)"
    @focus="handleFocus"
  ></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  name: 'auto-resize-input',
})
export default class AutoResizeInput extends Vue {
  @Prop({ required: true, type: String })
  value!: string;

  @Prop({ required: false, type: String })
  placeholder?: string;

  focus(options?: FocusOptions) {
    (this.$el as HTMLDivElement).focus(options);
  }

  handleFocus() {
    if (!this.value) {
      this.$emit('click');
    }
  }

  @Watch('value')
  onValueChange(val: string) {
    if (document.activeElement?.isSameNode(this.$el)) return;
    (this.$el as HTMLDivElement).innerText = val;
  }
}
</script>
