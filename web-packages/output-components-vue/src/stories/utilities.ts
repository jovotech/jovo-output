import { Card } from '@jovotech/output';
import { Annotations, Args as DefaultArgs, BaseStory } from '@storybook/addons';
import { ThisTypedComponentOptionsWithArrayProps } from 'vue/types/options';

export type VueReturnType = ThisTypedComponentOptionsWithArrayProps<any, any, any, any, any>;
export type ComponentStory<Args = DefaultArgs> = BaseStory<Args, VueReturnType> &
  Annotations<Args, VueReturnType>;

export function getCompleteExampleCard(): Card {
  return {
    title: 'Pizza?',
    content: 'Do you like Pizza?',
    imageUrl:
      'https://2.bp.blogspot.com/-K7Q8Fyl4r5U/VsT-pn9R6XI/AAAAAAAA39I/tVaT7aHOzLQ/s1600/pizza.gif',
  };
}
