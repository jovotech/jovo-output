<template>
  <button class="quick-reply-display">
    <p>
      {{ text }}
    </p>
  </button>
</template>

<script lang="ts">
import { QuickReplyValue } from '@jovotech/output';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'quick-reply-display',
  components: {},
})
export default class QuickReplyDisplay extends Vue {
  @Prop({ required: true, type: [Object, String] })
  readonly quickReply!: QuickReplyValue;

  get text(): string {
    return typeof this.quickReply === 'string' ? this.quickReply : this.quickReply.text;
  }
}
</script>

<style>
.quick-reply-display {
  @apply inline-flex border border-black bg-white px-4 py-1 rounded-full cursor-pointer focus:outline-none hover:bg-gray-50;
}
</style>
