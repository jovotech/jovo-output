import OutputTemplateDisplay from '@/components/OutputTemplateDisplay.vue';
import { ComponentStory, getCompleteExampleCard } from '@/stories/utilities';
import { Meta } from '@storybook/vue';

const meta: Meta = {
  component: OutputTemplateDisplay,
  title: 'Component/OutputTemplateDisplay',
  argTypes: {
    output: {
      defaultValue: {
        message: 'Message',
      },
    },
    class: {
      control: {
        type: 'text',
      },
      defaultValue: 'items-start',
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
  components: { OutputTemplateDisplay },
  props: Object.keys(argTypes),
  template: `
    <output-template-display v-bind="$props" />`,
});

export const Default = Template.bind({});

export const WithCard = Template.bind({});
WithCard.args = {
  output: {
    card: getCompleteExampleCard(),
    message: 'I would like to know if you like pizza.',
  },
};
