import QuickReplyDisplay from '@/components/QuickReplyDisplay.vue';
import { ComponentStory } from '@/stories/utilities';
import { Meta } from '@storybook/vue';

const meta: Meta = {
  component: QuickReplyDisplay,
  title: 'Component/QuickReplyDisplay',
  argTypes: {
    quickReply: {
      defaultValue: 'Quick Reply',
    },
  },
  args: {},
};
export default meta;

const Template: ComponentStory = (args, { argTypes }) => ({
  components: { QuickReplyDisplay },
  props: Object.keys(argTypes),
  template: `<quick-reply-display v-bind="$props" />`,
});

export const Default = Template.bind({});
