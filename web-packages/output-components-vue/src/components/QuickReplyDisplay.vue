<template>
  <button
    class="inline-flex border border-black bg-white px-4 py-1 rounded-full cursor-pointer focus:outline-none hover:bg-gray-50"
  >
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
import { QuickReplyValue } from '@jovotech/output';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'quick-reply-display',
  components: {},
})
export default class QuickReplyDisplay extends Vue {
  @Prop({ required: true, type: [Object, String] })
  quickReply!: QuickReplyValue;

  get text(): string {
    return typeof this.quickReply === 'string' ? this.quickReply : this.quickReply.text;
  }
}
</script>
