import OutputTemplateDisplay from '@/components/OutputTemplateDisplay.vue';
import { ComponentStory } from '@/stories/utilities';
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
  },
  args: {},
};
export default meta;

const Template: ComponentStory = (args, { argTypes }) => ({
  components: { OutputTemplateDisplay },
  props: Object.keys(argTypes),
  template: `
    <output-template-display v-bind="$props"/>`,
});

export const Default = Template.bind({});
