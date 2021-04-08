import { Annotations, Args as DefaultArgs, BaseStory } from '@storybook/addons';
import { ThisTypedComponentOptionsWithArrayProps } from 'vue/types/options';

export type VueReturnType = ThisTypedComponentOptionsWithArrayProps<any, any, any, any, any>;
export type ComponentStory<Args = DefaultArgs> = BaseStory<Args, VueReturnType> &
  Annotations<Args, VueReturnType>;
