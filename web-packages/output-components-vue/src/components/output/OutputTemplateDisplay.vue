<template>
  <div class="space-y-2">
    <div v-if="output.card || output.carousel">
      <span v-if="output.card && output.carousel" class="text-red-600">
        Can not display card and carousel in a single output.
      </span>
      <template v-else>
        <card-display v-if="output.card" :card="output.card" />
        <carousel-display v-if="output.carousel" :carousel="output.carousel" />
      </template>
    </div>
    <div v-if="output.message">
      <message-display :message="output.message" />
    </div>
    <div v-if="output.quickReplies" class="space-x-2">
      <quick-reply-display
        v-for="(quickReply, index) in output.quickReplies"
        :key="index"
        :quick-reply="quickReply"
      />
    </div>
  </div>
</template>

<script lang="ts">
import CardDisplay from '@/components/output/CardDisplay.vue';
import CarouselDisplay from '@/components/output/CarouselDisplay.vue';
import MessageDisplay from '@/components/output/MessageDisplay.vue';
import QuickReplyDisplay from '@/components/output/QuickReplyDisplay.vue';
import { OutputTemplate } from '@jovotech/output';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'output-template-display',
  components: {
    CarouselDisplay,
    CardDisplay,
    QuickReplyDisplay,
    MessageDisplay,
  },
})
export default class OutputTemplateDisplay extends Vue {
  @Prop({ required: true, type: Object })
  output!: OutputTemplate;
}
</script>
