<template>
  <div class="inline-flex px-4 py-2 rounded-full bg-white">
    {{ text }}
  </div>
</template>

<script lang="ts">
import { Message } from 'jovo-output';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'generic-message-display',
})
export default class GenericMessageDisplay extends Vue {
  @Prop({ required: true, type: [Object, String] })
  message!: Message;

  get text(): string {
    return typeof this.message === 'string'
      ? this.message
      : this.message.displayText || this.message.text;
  }
}
</script>
