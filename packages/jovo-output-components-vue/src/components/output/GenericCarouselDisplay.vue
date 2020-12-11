<template>
  <div class="border p-2 overflow-x-auto">
    <h2 v-if="carousel.title" class="text-lg font-semibold mb-2">{{ carousel.title }}</h2>
    <div
      ref="cardContainer"
      class="flex overflow-x-auto pb-2 space-x-3"
      @wheel.prevent="$refs.cardContainer.scrollBy({ left: $event.deltaY })"
    >
      <generic-card-display
        v-for="(item, index) in carousel.items"
        :key="index"
        class="flex-shrink-0 bg-white"
        :card="item"
      />
    </div>
  </div>
</template>

<script lang="ts">
import GenericCardDisplay from '@/components/output/GenericCardDisplay.vue';
import { GenericCarousel } from 'jovo-output';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'generic-carousel-display',
  components: { GenericCardDisplay },
})
export default class GenericCarouselDisplay extends Vue {
  @Prop({ required: true, type: Object })
  carousel!: GenericCarousel;
}
</script>
