import CarouselDisplay from '@/components/CarouselDisplay.vue';
import { ComponentStory } from '@/stories/utilities';
import { Meta } from '@storybook/vue';

const meta: Meta = {
  component: CarouselDisplay,
  title: 'Component/CarouselDisplay',
  argTypes: {
    carousel: {
      defaultValue: {
        title: 'Example Carousel',
        items: [
          {
            title: 'One',
            content: 'Example content number one.',
          },
          {
            title: 'Two',
            content: 'Example content number two. The second card with a longer text.',
          },
          {
            title: 'Three',
            content: 'Short',
          },
          {
            title: 'Four',
            content: 'Very long. This will for sure cause the carousel to be overflown!',
          },
        ],
      },
    },
  },
  args: {},
};
export default meta;

const Template: ComponentStory = (args, { argTypes }) => ({
  components: { CarouselDisplay },
  props: Object.keys(argTypes),
  template: `
    <carousel-display v-bind="$props"/>`,
});

export const Default = Template.bind({});
