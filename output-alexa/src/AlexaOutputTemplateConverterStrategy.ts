import {
  DynamicEntities,
  DynamicEntitiesMode,
  DynamicEntity,
  DynamicEntityMap,
  mergeInstances,
  MessageValue,
  OutputTemplate,
  OutputTemplateConverterStrategyConfig,
  QuickReplyValue,
  SingleResponseOutputTemplateConverterStrategy,
  toSSML,
} from '@jovotech/output';
import { ALEXA_STRING_MAX_LENGTH, SLOT_TYPE_VALUES_MAX_SIZE, SSML_OFFSET } from './constants';
import {
  AlexaResponse,
  AplRenderDocumentDirective,
  DialogUpdateDynamicEntitiesDirective,
  Directive,
  DynamicEntitiesUpdateBehavior,
  OutputSpeech,
  OutputSpeechType,
  SlotType,
} from './models';

export interface AlexaOutputTemplateConverterStrategyConfig
  extends OutputTemplateConverterStrategyConfig {
  genericOutputToApl: boolean;
}

export class AlexaOutputTemplateConverterStrategy extends SingleResponseOutputTemplateConverterStrategy<
  AlexaResponse,
  AlexaOutputTemplateConverterStrategyConfig
> {
  platformName = 'alexa' as const;
  responseClass = AlexaResponse;

  getDefaultConfig(): AlexaOutputTemplateConverterStrategyConfig {
    return { ...super.getDefaultConfig(), genericOutputToApl: true };
  }

  protected sanitizeOutput(output: OutputTemplate): OutputTemplate {
    if (output.message) {
      output.message = this.sanitizeMessage(output.message, 'message');
    }

    if (output.reprompt) {
      output.reprompt = this.sanitizeMessage(output.reprompt, 'reprompt');
    }

    if (
      output.listen &&
      typeof output.listen === 'object' &&
      output.listen.entities?.types?.length
    ) {
      output.listen.entities = this.sanitizeDynamicEntities(
        output.listen.entities,
        'listen.entities.types',
      );
    }

    return output;
  }

  protected sanitizeMessage(
    message: MessageValue,
    path: string,
    maxLength = ALEXA_STRING_MAX_LENGTH,
    offset = SSML_OFFSET,
  ): MessageValue {
    return super.sanitizeMessage(message, path, maxLength, offset);
  }

  protected sanitizeDynamicEntities(
    dynamicEntities: DynamicEntities,
    path: string,
    maxSize = SLOT_TYPE_VALUES_MAX_SIZE,
  ): DynamicEntities {
    return super.sanitizeDynamicEntities(dynamicEntities, path, maxSize);
  }

  toResponse(output: OutputTemplate): AlexaResponse {
    const response: AlexaResponse = {
      version: '1.0',
      response: {},
    };

    const addToDirectives = <DIRECTIVES extends Directive[]>(...directives: DIRECTIVES) => {
      if (!response.response.directives) {
        response.response.directives = [];
      }
      response.response.directives.push(...directives);
    };

    const listen = output.listen;
    if (typeof listen !== 'undefined') {
      response.response.shouldEndSession = !listen;

      if (typeof listen === 'object' && listen.entities) {
        const directive = new DialogUpdateDynamicEntitiesDirective();
        if (listen.entities.mode === DynamicEntitiesMode.Clear) {
          directive.updateBehavior = DynamicEntitiesUpdateBehavior.Clear;
        } else if (listen.entities.types) {
          directive.updateBehavior = DynamicEntitiesUpdateBehavior.Replace;
          directive.types = Object.keys(listen.entities.types).map((entityName) =>
            this.convertDynamicEntityToSlotType(
              entityName,
              ((listen.entities as DynamicEntities).types as DynamicEntityMap)[entityName],
            ),
          );
        }
        addToDirectives(directive);
      }
    }

    const message = output.message;
    if (message) {
      response.response.outputSpeech = this.convertMessageToOutputSpeech(message);
    }

    const reprompt = output.reprompt;
    if (reprompt) {
      response.response.reprompt = {
        outputSpeech: this.convertMessageToOutputSpeech(reprompt),
      };
    }

    const card = output.card;
    if (card) {
      if (this.config.genericOutputToApl) {
        addToDirectives(card.toApl?.() as AplRenderDocumentDirective);
      } else {
        response.response.card = card.toAlexaCard?.();
      }
    }

    const carousel = output.carousel;
    if (carousel && this.config.genericOutputToApl) {
      addToDirectives(carousel.toApl?.() as AplRenderDocumentDirective);
    }

    const quickReplies = output.quickReplies;
    if (quickReplies && this.config.genericOutputToApl) {
      const directive: AplRenderDocumentDirective | undefined = response.response
        .directives?.[0] as AplRenderDocumentDirective | undefined;
      if (directive) {
        if (!directive.datasources?.data) {
          directive.datasources = {
            data: {},
          };
        }
        directive.datasources.data.quickReplies = quickReplies.map(
          (quickReply: QuickReplyValue) => {
            if (typeof quickReply === 'string') {
              return { type: 'QuickReply', intent: quickReply };
            } else {
              return { type: 'QuickReply', ...quickReply };
            }
          },
        );
      }
    }

    const list = output.platforms?.alexa?.list;
    if (list && this.config.genericOutputToApl) {
      addToDirectives(list.toApl?.() as AplRenderDocumentDirective);
    }

    if (output.platforms?.alexa?.nativeResponse) {
      mergeInstances(response, output.platforms.alexa.nativeResponse);
    }

    return response;
  }

  fromResponse(response: AlexaResponse): OutputTemplate {
    const output: OutputTemplate = {};

    if (
      (response.response.outputSpeech?.text || response.response.outputSpeech?.ssml) &&
      response.response.outputSpeech?.toMessage
    ) {
      output.message = response.response.outputSpeech.toMessage();
    }

    if (
      (response.response.reprompt?.outputSpeech?.text ||
        response.response.reprompt?.outputSpeech?.ssml) &&
      response.response.reprompt?.outputSpeech?.toMessage
    ) {
      output.reprompt = response.response.reprompt.outputSpeech.toMessage();
    }

    if (typeof response.response.shouldEndSession === 'boolean') {
      output.listen = !response.response.shouldEndSession;
    }

    if (response.response.card?.toCard) {
      output.card = response.response.card.toCard();
    }

    // use reversed directives to actually get the last match instead of the first
    const reversedDirectives = (response.response.directives?.slice() || []).reverse();
    const lastDialogUpdateDirective = reversedDirectives.find(
      (directive) => directive.type === 'Dialog.UpdateDynamicEntities',
    ) as DialogUpdateDynamicEntitiesDirective | undefined;
    if (lastDialogUpdateDirective) {
      output.listen = {
        entities: {
          mode: lastDialogUpdateDirective.updateBehavior,
          types: lastDialogUpdateDirective.types.reduce((map: DynamicEntityMap, type) => {
            map[type.name] = this.convertSlotTypeToDynamicEntity(type);
            return map;
          }, {}),
        },
      };
    }

    return output;
  }

  convertMessageToOutputSpeech(message: MessageValue): OutputSpeech {
    return typeof message === 'string'
      ? {
          type: OutputSpeechType.Ssml,
          ssml: toSSML(message),
        }
      : message.toAlexaOutputSpeech?.() || {
          type: OutputSpeechType.Ssml,
          ssml: toSSML(message.speech),
        };
  }

  private convertDynamicEntityToSlotType(name: string, entity: DynamicEntity): SlotType {
    return {
      name: name,
      values: (entity.values || []).slice(0, SLOT_TYPE_VALUES_MAX_SIZE).map((value) => ({
        id: value.id,
        name: {
          value: value.value,
          synonyms: value.synonyms?.slice(),
        },
      })),
    };
  }

  private convertSlotTypeToDynamicEntity(slotType: SlotType): DynamicEntity {
    return {
      values: slotType.values.map((value) => ({
        id: value.id || value.name.value,
        value: value.name.value,
        synonyms: value.name.synonyms?.slice(),
      })),
    };
  }
}
