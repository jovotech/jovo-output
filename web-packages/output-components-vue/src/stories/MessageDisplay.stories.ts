import MessageDisplay from '@/components/MessageDisplay.vue';
import { ComponentStory } from '@/stories/utilities';
import { Meta } from '@storybook/vue';

const meta: Meta = {
  component: MessageDisplay,
  title: 'Component/MessageDisplay',
  argTypes: {
    message: {
      defaultValue: 'This is some example message.',
    },
  },
  args: {},
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
export default meta;

const Template: ComponentStory = (args, { argTypes }) => ({
  components: { MessageDisplay },
  props: Object.keys(argTypes),
  template: `
    <message-display v-bind="$props"/>`,
});

export const Default = Template.bind({});
