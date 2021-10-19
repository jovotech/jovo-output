import { OmitIndex, PlainObjectType } from '../utilities';
import { MessageValue } from './Message';
import { NormalizedPlatformOutputTemplate } from './NormalizedPlatformOutputTemplate';

// Construct an object-type that has the same keys as NormalizedPlatformOutputTemplate but additionally allows an array to be passed to messaged and reprompt.
export type DenormalizePlatformOutputTemplate<
  PLATFORM_OUTPUT_TEMPLATE extends NormalizedPlatformOutputTemplate,
> = Omit<OmitIndex<PLATFORM_OUTPUT_TEMPLATE, string>, 'message' | 'reprompt' | 'nativeResponse'> & {
  [key: string]: unknown;
  nativeResponse?: PlainObjectType<PLATFORM_OUTPUT_TEMPLATE['nativeResponse']>;
  message?: PLATFORM_OUTPUT_TEMPLATE['message'] | MessageValue[];
  reprompt?: PLATFORM_OUTPUT_TEMPLATE['reprompt'] | MessageValue[];
};

export type PlatformOutputTemplate<
  RESPONSE extends Record<string, unknown> = Record<string, unknown>,
> = DenormalizePlatformOutputTemplate<NormalizedPlatformOutputTemplate<RESPONSE>>;
