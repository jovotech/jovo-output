<template>
  <div id="app" class="flex w-screen h-screen bg-gray-100">
    <div class="w-96"></div>
    <div class="flex-1"></div>
  </div>
</template>

<script lang="ts">
import { GenericOutputDisplay } from 'jovo-output-component-vue';
import { Component, Vue } from 'vue-property-decorator';
import { GenericOutput } from 'jovo-output-component-vue';


const makeDefaultData: () => GenericOutput = () => ({
  message: 'Here is our most liked product on the menu. Do you want to see more?',
  reprompt: 'Do you want to see more?',
  quickReplies: ['Yes', 'No'],
  card: {
    key: '',
    title: 'Fries',
    subtitle: 'Fries made from potatos of local farmers',
    imageUrl:
      'https://media.istockphoto.com/photos/bunch-of-fried-french-fries-on-a-white-background-closeup-picture-id1130991737?k=6&m=1130991737&s=612x612&w=0&h=NudURAvNLw5KAE7LOxfA15RzzA2yAiT2dYQTAReA8Ow=',
  },
  platforms: {},
});

@Component({
  components: {
    GenericOutputDisplay,
  },
})
export default class App extends Vue {
  output: GenericOutput = makeDefaultData();

  get rawOutput(): string {
    return JSON.stringify(this.output, undefined, 2);
  }
}
</script>
