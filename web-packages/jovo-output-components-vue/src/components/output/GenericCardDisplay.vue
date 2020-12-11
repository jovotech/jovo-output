<template>
  <div class="border p-2 flex flex-col">
    <div v-if="card.imageUrl" class="flex mb-2">
      <img class="object-contain w-full h-40" :src="card.imageUrl" :alt="card.title" />
    </div>
    <h3 class="text-lg font-semibold">{{ card.title }}</h3>
    <p class="text-normal text-gray-700">
      {{ card.subtitle }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { GenericCard } from 'jovo-output';

@Component({
  name: 'generic-card-display',
})
export default class GenericCardDisplay extends Vue {
  @Prop({ required: true, type: Object })
  card!: GenericCard;
}
</script>
