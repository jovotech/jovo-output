<template>
  <div class="inline-flex px-4 py-2 rounded-xl text-sm bg-white">
    <p class="leading-6">
      {{ text }}
    </p>
  </div>
</template>

<script lang="ts">
import { MessageValue } from '@jovotech/output';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'message-display',
  components: {},
})
export default class MessageDisplay extends Vue {
  @Prop({ required: true, type: [Object, String] })
  message!: MessageValue;

  get text(): string {
    return typeof this.message === 'string'
      ? this.message
      : this.message.displayText || this.message.text;
  }
}
</script>
