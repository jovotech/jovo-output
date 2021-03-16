<template>
  <div class="flex flex-col w-full">
    <h1 class="text-4xl text-center py-4 bg-gray-100 shadow">Output-Overview</h1>

    <div class="p-4 space-y-4 overflow-y-auto">
      <generic-output-overview-card
        :is-initially-collapsed="false"
        :default-value="genericOutputDefaultValue"
        :class-type="genericOutputClass"
      >
        <template v-slot:default="slotProps">
          <generic-output-display :output="slotProps.value" />
        </template>
      </generic-output-overview-card>

      <generic-output-overview-card
        :default-value="genericMessageDefaultValue"
        :class-type="genericMessageClass"
      >
        <template v-slot:default="slotProps">
          <generic-message-display :message="slotProps.value" />
        </template>
      </generic-output-overview-card>

      <generic-output-overview-card
        :default-value="genericQuickReplyDefaultValue"
        :class-type="genericQuickReplyClass"
      >
        <template v-slot:default="slotProps">
          <generic-quick-reply-display :quick-reply="slotProps.value" />
        </template>
      </generic-output-overview-card>

      <generic-output-overview-card
        :default-value="genericCardDefaultValue"
        :class-type="genericCardClass"
      >
        <template v-slot:default="slotProps">
          <div class="flex items-center justify-center h-full">
            <generic-card-display :card="slotProps.value" />
          </div>
        </template>
      </generic-output-overview-card>

      <generic-output-overview-card
        :default-value="genericCarouselDefaultValue"
        :class-type="genericCarouselClass"
      >
        <template v-slot:default="slotProps">
          <div class="flex items-center justify-center h-full">
            <generic-carousel-display :carousel="slotProps.value" />
          </div>
        </template>
      </generic-output-overview-card>
    </div>
  </div>
</template>

<script lang="ts">
import GenericCardDisplay from '@/components/output/GenericCardDisplay.vue';
import GenericCarouselDisplay from '@/components/output/GenericCarouselDisplay.vue';
import GenericMessageDisplay from '@/components/output/GenericMessageDisplay.vue';
import GenericOutputDisplay from '@/components/output/GenericOutputDisplay.vue';
import GenericOutputOverviewCard from '@/components/ui/GenericOutputOverviewCard.vue';
import GenericQuickReplyDisplay from '@/components/output/GenericQuickReplyDisplay.vue';
import {
  GenericCard,
  GenericCarousel,
  GenericMessage,
  GenericOutput,
  GenericQuickReply,
} from '@jovotech/output';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    GenericOutputDisplay,
    GenericQuickReplyDisplay,
    GenericMessageDisplay,
    GenericCarouselDisplay,
    GenericCardDisplay,
    GenericOutputOverviewCard,
  },
})
export default class App extends Vue {
  get genericOutputDefaultValue(): GenericOutput {
    return {
      message: 'How are you?',
      quickReplies: ['Good', 'Okay', 'Not so good'],
    };
  }

  get genericOutputClass() {
    return GenericOutput;
  }

  get genericMessageDefaultValue(): GenericMessage {
    return { text: 'hello' };
  }

  get genericMessageClass() {
    return GenericMessage;
  }

  get genericQuickReplyDefaultValue(): GenericQuickReply {
    return {
      text: 'hello',
    };
  }

  get genericQuickReplyClass() {
    return GenericQuickReply;
  }

  get genericCardDefaultValue(): GenericCard {
    return {
      title: 'hello',
      subtitle: '',
      imageUrl: '',
      key: '',
    };
  }

  get genericCardClass() {
    return GenericCard;
  }

  get genericCarouselDefaultValue(): GenericCarousel {
    return {
      title: '',
      items: [
        {
          title: 'hello',
          subtitle: '',
          imageUrl: '',
          key: '',
        },
        {
          title: 'hello',
          subtitle: '',
          imageUrl: '',
          key: '',
        },
      ],
    };
  }

  get genericCarouselClass() {
    return GenericCarousel;
  }
}
</script>
