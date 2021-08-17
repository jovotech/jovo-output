# Jovo Output Changelog

### Latest Prerelease Output Version: 4.0.0-alpha.12

## 2021-08-10

##### `@jovotech/output-alexa [4.0.0-alpha.12]`

- [#10](https://github.com/jovotech/jovo-output/pull/10) :sparkles: Add optional permissions-property to Alexa-Card

## 2021-08-02

##### `@jovotech/output [4.0.0-alpha.11]`

- [#6](https://github.com/jovotech/jovo-output/pull/6) :bug: Fix invalid listen for SingleResponseOutputTemplateConverterStrategy
- [#7](https://github.com/jovotech/jovo-output/pull/7) :bug: Fix bug that was caused by merging nativeResponse

##### `@jovotech/output-alexa [4.0.0-alpha.11]`

- [#9](https://github.com/jovotech/jovo-output/pull/9) :recycle: Improve dynamic entities for Alexa and do not add quick-replies if APL is disabled

##### `@jovotech/output-googleassistant [4.0.0-alpha.11]`

- [#8](https://github.com/jovotech/jovo-output/pull/8) :bug: Fix bug that was caused by not allowing an empty id

## 2021-06-25

##### `@jovotech/output [4.0.0-alpha.10]`

- [#4](https://github.com/jovotech/jovo-output/pull/4) :sparkles: Implement getKeys to return all possible keys of OutputTemplate
- [0517836](https://github.com/jovotech/jovo-output/commit/051783642822859c433ca5f035ee24fa384bc260) :sparkles: :art: Implement DynamicEntity-models and link it via Listen, also improve imports to be standardized

##### `@jovotech/output-alexa [4.0.0-alpha.10]`

- [#3](https://github.com/jovotech/jovo-output/pull/3) :sparkles: Add selection to Carousel and List items
- [31454f3](https://github.com/jovotech/jovo-output/commit/31454f3891fc9ab7849916e4c7e14b588054ad21) :sparkles: Implement dynamic entities for Alexa

##### `@jovotech/output-dialogflow [4.0.0-alpha.10]`

- [571e15a](https://github.com/jovotech/jovo-output/commit/571e15a53c765ff2f66165911b7eb945e3fbf85e) :sparkles: Implement dynamic entities for Dialogflow

##### `@jovotech/output-googleassistant [4.0.0-alpha.10]`

- [1502c42](https://github.com/jovotech/jovo-output/commit/1502c421b6bb0c4b0bd22f6fe99b96d548ac6b45) :sparkles: Implement dynamic entities for GoogleAssistant

## 2021-06-07

##### `@jovotech/output-* [4.0.0-alpha.9]`

:boom: All 4.0.0-alpha.9-packages are only compatible with other 4.0.0-alpha.9-packages or newer due to changes of exports.

- [a0d4bfb](https://github.com/jovotech/jovo-output/commit/a0d4bfb8530f235b0f3dd4bb743fc966e7cd74f5) :wrench: Update build-system - All output-packages now support tree-shaking

## 2021-06-02

##### `@jovotech/output-alexa [4.0.0-alpha.8]`

- [#2](https://github.com/jovotech/jovo-output/pull/2) :sparkles: Generate APL from generic output
