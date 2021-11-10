<template>
  <div class="message-display">
    <p class="leading-6">
      {{ text }}
    </p>
  </div>
</template>

<script lang="ts">
import { MessageValue, removeSSML } from '@jovotech/output';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'message-display',
  components: {},
})
export default class MessageDisplay extends Vue {
  @Prop({ required: true, type: [Object, String] })
  readonly message!: MessageValue;

  get text(): string {
    return typeof this.message === 'string'
      ? this.message
      : // TODO determine if showing of ssml should be toggleable
        this.message.text || removeSSML(this.message.speech || '');
  }
}
</script>

<style>
.message-display {
  @apply inline-flex px-4 py-2 rounded-xl text-sm bg-white shadow-sm;
}
</style>
