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
          <output-template-display :output="slotProps.value" />
        </template>
      </generic-output-overview-card>

      <generic-output-overview-card
        :default-value="genericMessageDefaultValue"
        :class-type="genericMessageClass"
      >
        <template v-slot:default="slotProps">
          <message-display :message="slotProps.value" />
        </template>
      </generic-output-overview-card>

      <generic-output-overview-card
        :default-value="genericQuickReplyDefaultValue"
        :class-type="genericQuickReplyClass"
      >
        <template v-slot:default="slotProps">
          <quick-reply-display :quick-reply="slotProps.value" />
        </template>
      </generic-output-overview-card>

      <generic-output-overview-card
        :default-value="genericCardDefaultValue"
        :class-type="genericCardClass"
      >
        <template v-slot:default="slotProps">
          <div class="flex items-center justify-center h-full">
            <card-display :card="slotProps.value" />
          </div>
        </template>
      </generic-output-overview-card>

      <generic-output-overview-card
        :default-value="genericCarouselDefaultValue"
        :class-type="genericCarouselClass"
      >
        <template v-slot:default="slotProps">
          <div class="flex items-center justify-center h-full">
            <carousel-display :carousel="slotProps.value" />
          </div>
        </template>
      </generic-output-overview-card>
    </div>
  </div>
</template>

<script lang="ts">
import CardDisplay from '@/components/output/CardDisplay.vue';
import CarouselDisplay from '@/components/output/CarouselDisplay.vue';
import MessageDisplay from '@/components/output/MessageDisplay.vue';
import OutputTemplateDisplay from '@/components/output/OutputTemplateDisplay.vue';
import QuickReplyDisplay from '@/components/output/QuickReplyDisplay.vue';
import GenericOutputOverviewCard from '@/components/ui/GenericOutputOverviewCard.vue';
import {Card, Carousel, Message, OutputTemplate, QuickReply} from '@jovotech/output';
import {Component, Vue} from 'vue-property-decorator';

@Component({
  components: {
    OutputTemplateDisplay,
    QuickReplyDisplay,
    MessageDisplay,
    CarouselDisplay,
    CardDisplay,
    GenericOutputOverviewCard,
  },
})
export default class App extends Vue {
  get genericOutputDefaultValue(): OutputTemplate {
    return {
      message: 'How are you?',
      quickReplies: ['Good', 'Okay', 'Not so good'],
    };
  }

  get genericOutputClass() {
    return OutputTemplate;
  }

  get genericMessageDefaultValue(): Message {
    return { text: 'hello' };
  }

  get genericMessageClass() {
    return Message;
  }

  get genericQuickReplyDefaultValue(): QuickReply {
    return {
      text: 'hello',
    };
  }

  get genericQuickReplyClass() {
    return QuickReply;
  }

  get genericCardDefaultValue(): Card {
    return {
      title: 'hello',
      subtitle: '',
      imageUrl: '',
      key: '',
    };
  }

  get genericCardClass() {
    return Card;
  }

  get genericCarouselDefaultValue(): Carousel {
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
    return Carousel;
  }
}
</script>
