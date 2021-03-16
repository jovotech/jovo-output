<template>
  <div class="space-y-2">
    <div v-if="output.card || output.carousel">
      <span v-if="output.card && output.carousel" class="text-red-600">
        Can not display card and carousel in a single output.
      </span>
      <template v-else>
        <generic-card-display v-if="output.card" :card="output.card" />
        <generic-carousel-display v-if="output.carousel" :carousel="output.carousel" />
      </template>
    </div>
    <div v-if="output.message">
      <generic-message-display :message="output.message" />
    </div>
    <div v-if="output.quickReplies" class="space-x-2">
      <generic-quick-reply-display
        v-for="(quickReply, index) in output.quickReplies"
        :key="index"
        :quick-reply="quickReply"
      />
    </div>
  </div>
</template>

<script lang="ts">
import GenericCardDisplay from '@/components/output/GenericCardDisplay.vue';
import GenericCarouselDisplay from '@/components/output/GenericCarouselDisplay.vue';
import GenericMessageDisplay from '@/components/output/GenericMessageDisplay.vue';
import GenericQuickReplyDisplay from '@/components/output/GenericQuickReplyDisplay.vue';
import { OutputTemplate } from '@jovotech/output';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'generic-output-display',
  components: {
    GenericCarouselDisplay,
    GenericCardDisplay,
    GenericQuickReplyDisplay,
    GenericMessageDisplay,
  },
})
export default class GenericOutputDisplay extends Vue {
  @Prop({ required: true, type: Object })
  output!: OutputTemplate;
}
</script>
