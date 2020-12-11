<template>
  <div class="border p-3 rounded-lg flex flex-col">
    <div
      class="flex items-center justify-between cursor-pointer"
      @click="isCollapsed = !isCollapsed"
    >
      <h2 class="leading-none text-2xl">{{ classType.name }}</h2>
      <div>
        <chevron-down-icon
          stroke-width="1"
          class="transition-transform duration-300 transform cursor-pointer"
          :class="[isCollapsed ? 'rotate-180' : 'rotate-0']"
        />
      </div>
    </div>

    <transition name="story-editor-collapse">
      <div v-show="!isCollapsed" class="flex-grow h-auto max-h-screen overflow-y-auto">
        <div class="flex mt-3 space-x-3">
          <div class="w-1/2">
            <h3 class="block text-lg text-gray-600 mb-1">JSON</h3>
            <auto-resize-input
              v-model="json"
              class="w-full font-mono bg-gray-100 p-2 max-h-96 overflow-auto"
              @input="onJsonInput"
            />
          </div>
          <div class="flex flex-col w-1/2">
            <h3 class="block text-lg text-gray-600 mb-1">Result</h3>
            <div class="bg-gray-100 p-2 flex-grow">
              <slot :value="value" />
            </div>
          </div>
        </div>

        <div class="mt-3">
          <h3 class="block text-lg text-gray-600 mb-1">Properties</h3>
          <div v-for="(value, key) in propertiesMap" :key="key" class="flex mb-2">
            <div class="w-32 flex-shrink-0">
              {{ key }}
            </div>
            <div class="">
              <p v-for="(constraint, index) in value" :key="index">
                {{ constraint }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import AutoResizeInput from '@/components/ui/AutoResizeInput.vue';
import { getMetadataStorage } from 'jovo-output';
import ChevronDownIcon from 'vue-feather-icons/icons/ChevronDownIcon';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'generic-output-overview-card',
  components: { AutoResizeInput, ChevronDownIcon },
})
export default class GenericOutputOverviewCard<T = any> extends Vue {
  @Prop({ required: true, type: Function })
  classType!: new () => T;

  @Prop({ required: true, type: [Object, String] })
  defaultValue!: T | string;

  @Prop({ required: false, type: Boolean, default: true })
  isInitiallyCollapsed!: boolean;

  json =
    typeof this.defaultValue === 'string'
      ? this.defaultValue
      : JSON.stringify(this.defaultValue, undefined, 2);
  value: T =
    typeof this.defaultValue === 'string' ? JSON.parse(this.defaultValue) : this.defaultValue;

  private isCollapsed = this.isInitiallyCollapsed;

  get propertiesMap(): Record<keyof T, string[]> {
    const map: Record<keyof T, string[]> = {} as Record<keyof T, string[]>;

    const relatedMetadata: any[] = getMetadataStorage()
      .getTargetValidationMetadatas(this.classType, '')
      .sort((a, b) => {
        const aIsConditionalValidation = a.type === 'conditionalValidation';
        const bIsConditionalValidation = b.type === 'conditionalValidation';
        if (aIsConditionalValidation && !bIsConditionalValidation) {
          return -1;
        }
        if (!aIsConditionalValidation && !bIsConditionalValidation) {
          return 1;
        }
        return 0;
      });
    for (const metadata of relatedMetadata) {
      if (!map[metadata.propertyName as keyof T]) {
        map[metadata.propertyName as keyof T] = [];
      }
      const constraints = getMetadataStorage().getTargetValidatorConstraints(
        metadata.constraintCls,
      );
      if (metadata.type === 'conditionalValidation') {
        map[metadata.propertyName as keyof T].push('optional');
      }
      for (const constraint of constraints) {
        map[metadata.propertyName as keyof T].push(
          `${metadata.each ? 'each item in array: ' : ''}${constraint.name
            .replace(/([A-Z])/g, (v) => ` ${v.toLowerCase()}`)
            .replace(/is/g, '')}${
            metadata.constraints?.[0]
              ? ` ${metadata.constraints[0]?.name || metadata.constraints[0]}`
              : ''
          }`,
        );
      }
    }
    return map;
  }

  onJsonInput(json: string) {
    try {
      this.value = JSON.parse(json);
    } catch (e) {
      console.log(e);
    }
  }
}
</script>
