import CardDisplay from '@/components/CardDisplay.vue';
import { ComponentStory, getCompleteExampleCard } from '@/stories/utilities';
import { Meta } from '@storybook/vue';

const meta: Meta = {
  component: CardDisplay,
  title: 'Component/CardDisplay',
  argTypes: {
    card: {
      defaultValue: {
        title: 'Card',
      },
    },
    onImageLoaded: {
      action: 'image-loaded'
    }
  },
  args: {},
};
export default meta;

const Template: ComponentStory = (args, { argTypes }) => ({
  components: { CardDisplay },
  props: Object.keys(argTypes),
  template: `
    <CardDisplay v-bind="$props" @image-loaded="onImageLoaded"/>`,
});

export const Minimal = Template.bind({});

export const Complete = Template.bind({});
Complete.args = {
  card: getCompleteExampleCard(),
};
