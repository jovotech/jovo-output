<template>
  <div class="inline-flex border border-black bg-white px-4 py-1 rounded-full cursor-pointer">
    {{ text }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { QuickReply } from 'jovo-output';

@Component({
  name: 'generic-quick-reply-display',
})
export default class GenericQuickReplyDisplay extends Vue {
  @Prop({ required: true, type: [Object, String] })
  quickReply!: QuickReply;

  get text(): string {
    return typeof this.quickReply === 'string' ? this.quickReply : this.quickReply.text;
  }
}
</script>
