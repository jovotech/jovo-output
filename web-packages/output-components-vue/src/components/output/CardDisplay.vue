<template>
  <div class="border p-2 flex flex-col">
    <div v-if="isEditable">
      <auto-resize-input
        v-model="editObject.imageUrl"
        placeholder="Image URL"
        @input="handleImageUrlInput"
      />
      <img
        v-if="editObject.imageUrl"
        class="object-contain w-full h-40"
        :src="editObject.imageUrl"
        :alt="editObject.title"
      />
    </div>
    <div v-else-if="card.imageUrl" class="flex mb-2">
      <img class="object-contain w-full h-40" :src="card.imageUrl" :alt="card.title" />
    </div>
    <h3 class="text-lg font-semibold">
      <auto-resize-input
        v-if="isEditable"
        v-model="editObject.title"
        placeholder="Title"
        @input="handleTitleInput"
      />
      <span v-else>{{ card.title }}</span>
    </h3>
    <p class="text-normal text-gray-700">
      <auto-resize-input
        v-if="isEditable"
        v-model="editObject.subtitle"
        placeholder="Subtitle"
        @input="handleSubtitleInput"
      />
      <span v-else>
        {{ card.subtitle }}
      </span>
    </p>
  </div>
</template>

<script lang="ts">
import AutoResizeInput from '@/components/ui/AutoResizeInput.vue';
import { Card } from '@jovotech/output';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  name: 'card-display',
  components: { AutoResizeInput },
})
export default class CardDisplay extends Vue {
  @Prop({ required: true, type: Object })
  card!: Card;

  @Prop({ required: false, type: Boolean, default: false })
  isEditable!: boolean;

  editObject: Card = { title: '', subtitle: '', key: '', imageUrl: '' };

  handleImageUrlInput(imageUrl: string) {
    this.handleInput({ ...this.card, imageUrl });
  }

  handleTitleInput(title: string) {
    this.handleInput({ ...this.card, title });
  }

  handleSubtitleInput(subtitle: string) {
    this.handleInput({ ...this.card, subtitle });
  }

  handleInput(newCard: Card) {
    this.$emit('input', newCard);
  }

  @Watch('card', { deep: true, immediate: true })
  onCardChange() {
    this.editObject = { ...this.card };
  }
}
</script>
