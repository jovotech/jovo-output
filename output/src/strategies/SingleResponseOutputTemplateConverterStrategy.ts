import {
  mergeInstances,
  Message,
  OutputTemplate,
  OutputTemplateConverterStrategyConfig,
  OutputTemplatePlatforms,
  plainToClass,
  PlatformOutputTemplate,
} from '..';
import { OutputTemplateConverterStrategy } from '../OutputTemplateConverterStrategy';

export abstract class SingleResponseOutputTemplateConverterStrategy<
  RESPONSE extends Record<string, unknown>,
  CONFIG extends OutputTemplateConverterStrategyConfig,
> extends OutputTemplateConverterStrategy<RESPONSE, CONFIG> {
  abstract responseClass: new () => RESPONSE;
  abstract platformName: keyof OutputTemplatePlatforms;

  abstract fromResponse(response: RESPONSE): OutputTemplate;

  toResponse(output: OutputTemplate | OutputTemplate[]): RESPONSE {
    const mergedOutput = Array.isArray(output) ? this.mergeOutputTemplates(output) : output;
    return this.buildResponse(mergedOutput);
  }

  abstract buildResponse(output: OutputTemplate): RESPONSE;

  mergeOutputTemplates(output: OutputTemplate[]): OutputTemplate {
    return output.reduce(
      (accumulator, current) => this.mergeOutputTemplateWith(accumulator, current),
      {},
    );
  }

  protected mergeOutputTemplateWith(
    target: OutputTemplate,
    mergeWith: OutputTemplate,
  ): OutputTemplate {
    this.mergeOutputTemplateMessageIfSet(target, mergeWith, 'message');
    this.mergeOutputTemplateMessageIfSet(target, mergeWith, 'reprompt');

    if (mergeWith.quickReplies) {
      if (!target.quickReplies) {
        target.quickReplies = [];
      }
      target.quickReplies.push(...mergeWith.quickReplies);
    }

    if (mergeWith.card) {
      target.card = { ...mergeWith.card };
    }

    if (mergeWith.carousel) {
      target.carousel = { ...mergeWith.carousel };
    }

    // if new listen is an object
    if (typeof mergeWith.listen === 'object') {
      target.listen = { ...mergeWith.listen };
      // if current listen is not an object and new listen is not undefined
    } else if (typeof target.listen !== 'object' && typeof mergeWith.listen !== 'undefined') {
      target.listen = mergeWith.listen;
    }

    const mergeWithPlatformOutput = mergeWith.platforms?.[this.platformName];
    if (mergeWithPlatformOutput) {
      if (!target.platforms) {
        target.platforms = {};
      }
      if (!target.platforms[this.platformName]) {
        target.platforms[this.platformName] = {};
      }
      const targetPlatformOutput = target.platforms[this.platformName] as PlatformOutputTemplate;

      if (mergeWithPlatformOutput.nativeResponse) {
        if (!targetPlatformOutput.nativeResponse) {
          targetPlatformOutput.nativeResponse = {};
        }
        // TODO determine whether merge is sufficient
        mergeInstances(targetPlatformOutput.nativeResponse, mergeWithPlatformOutput.nativeResponse);
      }

      this.mergeOutputTemplateWith(targetPlatformOutput, mergeWithPlatformOutput);
    }
    return plainToClass(OutputTemplate, target);
  }

  protected mergeOutputTemplateMessageIfSet(
    target: OutputTemplate,
    mergeWith: OutputTemplate,
    key: 'message' | 'reprompt',
  ): void {
    if (mergeWith[key]) {
      const mergeText =
        typeof mergeWith[key] === 'string' ? mergeWith[key] : (mergeWith[key] as Message).text;

      // TODO Determine whether the space should be added here
      target[key] = target[key] ? [target.message, mergeText].join(' ') : mergeText;
    }
  }
}
