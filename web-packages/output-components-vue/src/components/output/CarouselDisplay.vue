<template>
  <div class="border p-2 overflow-x-auto">
    <h2 v-if="carousel.title || isEditable" class="text-lg font-semibold mb-2">
      <auto-resize-input
        v-if="isEditable"
        v-model="carousel.title"
        placeholder="Title"
        @input="handleTitleInput"
      />
      <span v-else>{{ carousel.title }}</span>
    </h2>
    <div
      ref="cardContainer"
      class="flex overflow-x-auto pb-2 space-x-3"
      @wheel.prevent="$refs.cardContainer.scrollBy({ left: $event.deltaY })"
    >
      <card-display
        v-for="(item, index) in carousel.items"
        :key="index"
        :is-editable="isEditable"
        class="flex-shrink-0 bg-white"
        :card="item"
        @input="handleCardInput($event, index)"
      />
      <div v-if="isEditable" class="flex items-center justify-center">
        <plus-icon class="text-black hover:text-gray-700 cursor-pointer" @click="addCard" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import PlusIcon from 'vue-feather-icons/icons/PlusIcon';
import CardDisplay from '@/components/output/CardDisplay.vue';
import AutoResizeInput from '@/components/ui/AutoResizeInput.vue';
import { Card, Carousel } from '@jovotech/output';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  name: 'carousel-display',
  components: { PlusIcon, AutoResizeInput, CardDisplay },
})
export default class CarouselDisplay extends Vue {
  @Prop({ required: true, type: Object })
  carousel!: Carousel;

  @Prop({ required: false, type: Boolean, default: false })
  isEditable!: boolean;

  editObject: Carousel = { title: '', items: [] };

  addCard() {
    const items = this.carousel.items.slice();
    items.push({
      title: '',
      subtitle: '',
      key: '',
      imageUrl: '',
    });
    this.handleInput({
      ...this.carousel,
      items,
    });
  }

  handleTitleInput(title: string) {
    this.handleInput({ ...this.carousel, title });
  }

  handleCardInput(card: Card, index: number) {
    const items = this.carousel.items.slice();
    items[index] = card;
    this.handleInput({
      ...this.carousel,
      items,
    });
  }

  handleInput(newCarousel: Carousel) {
    this.$emit('input', newCarousel);
  }

  @Watch('carousel', { deep: true, immediate: true })
  onCarouselChange() {
    this.editObject = { ...this.carousel };
  }
}
</script>
