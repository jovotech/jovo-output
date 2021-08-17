# Output Templates

Learn more about the structure of Jovo output templates, which off the ability to create cross-platform output for voice and chat experiences.
- [Introduction](#introduction)
- [Generic Output Elements](#generic-output-elements)
  - [Message](#message)
  - [Reprompt](#reprompt)
  - [Card](#card)
  - [Carousel](#carousel)
  - [Quick Replies](#quick-replies)
  - [Listen](#listen)
- [Platform Specific Output Elements](#platform-specific-output-elements)
  - [Native Response](#native-response)
- [Multiple Responses](#multiple-responses)

## Introduction

The Jovo output template engine takes structured output and translates it into a native platform response. This makes it possible to have a common format for multimodal output that works across platforms and devices.

For example, here is a simple output that just returns a "Hello World!":

```typescript
{
  message: 'Hello World!'
}
```

And here is an example that asks the user a question and offers guidance how to answer:

```typescript
{
  message: 'Do you like pizza?',
  quickReplies: [ 'yes', 'no' ],
  listen: true,
}
```

Jovo output offers both [generic output](#generic-output-elements) as well as [platform-specific output elements](#platform-specific-output-elements).



## Generic Output Elements

Jovo output templates come with a selection of generic elements that are supported by most platforms, including:

* `message`
* `reprompt`
* `carousel`
* `card`
* `quickReplies`
* `listen`

Not all platforms support all of these elements. In such a case, the platform just ignores that element and still successfully builds the rest of the output template.

### Message

The `message` is usually either what you hear (speech output) or what see you see in the form of a chat bubble.

```typescript
{
  message: 'Hello world!',
}
```

A `message` can either be a `string` or have the following properties:

```typescript
{
  message: {
    text: 'Hello world!', // Default message
    displayText: 'Hello screen!', // For voice platforms that support display text
  }
}
```

### Reprompt

The `reprompt` is typically only relevant for voice interfaces. It represents the output that is presented to the user if they haven't responded to a previous question.

```typescript
{
  message: `Hello world! What's your name?`,
  reprompt: 'Could you tell me your name?',
}
```

A `reprompt` can have the same values (`text`, `displayText`) as a [`message`](#message).


### Card

Cards are often used to display content in a visual and structured way.

```typescript
{
  card: {
    title: 'Hello world!',
    content: 'Welcome to this new app built with Jovo.',
  },
}
```

A `card` consists of the following properties:

* `title`: required
* `key`
* `subtitle`
* `content`
* `imageUrl`
* `imageAlt`


### Carousel

A carousel is a (usually horizontally scrollable) collection of at least 2 [cards](#card).

```typescript
{
  carousel: {
    items: [
      {
        title: 'Element 1',
        content: 'To my right, you will see element 2.'
      },
      {
        title: 'Element 2',
        content: 'Hi there!'
      }
    ]
  },
}
```

A `carousel` consists of the following properties:

* `title`
* `items`: An array of [card](#card) items

### Quick Replies

Quick replies (sometimes called *suggestion chips*) are little buttons that provide suggestions for the user to tap instead of having to type out a response to a question.

```typescript
{
  quickReplies: [
    'Berlin',
    'NYC'
  ],
}
```

Quick replies can also contain a `text` and a `value`:

```typescript
{
  quickReplies: [
    {
      text: 'Berlin',
      value: 'berlin',
    },
    // ...
  ],
}
```

Usually, the `value` of the quick reply gets passed to a platform's natural language understanding service. For some platforms, you can also add intent (and entity) information so that the button click can be directly mapped to structured user input:

```typescript
{
  quickReplies: [
    {
      text: 'Berlin',
      intent: 'CityIntent',
      entities: [
        {
          name: 'city',
          value: 'berlin',
        }
      ]
    },
    // ...
  ],
}
```

### Listen

Especially for voice platforms, it is important to indicate that you are expecting the user to answer. You can do this by setting `listen` to `true`. The platform will then leave the microphone open.

```typescript
{
  message: `Hello world! What's your name?`,
  listen: true,
}
```

It's also possible to turn `listen` into an object to tell the platform to listen for specific user input. You can add dynamic entities this way:

```typescript
{
  // ...
  listen: {
    entities: [
      {
        name: 'CityType',
        values: [
          {
            value: 'berlin'
          }
          // ...
        ],
      }
    ]
  }
}
```

[Learn more about dynamic entities in the entities documentation](https://github.com/jovotech/jovo-framework/blob/v4dev/docs/entities.md).


## Platform Specific Output Elements

Each output object can contain a `platforms` element for platform specific content:

```typescript
{
  message: 'Hello world!',
  platforms: {
    // ...
  },
}
```

You can reference each platform by using their name, for example `Alexa` or `GoogleAssistant`:

```typescript
{
  message: 'Hello world!',
  platforms: {
    Alexa: {
      // ...
    },
  },
}
```

There are two ways how this can be used:

* Add content types that are only available on one platform (for example an account linking card on Alexa)
* Override [generic output elements](#generic-output-elements) for specific platforms

For example, the `message` can be overridden for Alexa users:

```typescript
{
  message: 'Hello world!',
  platforms: {
    Alexa: {
      message: 'Hello Alexa!',
    },
  },
}
```

A platform can also remove generic output by setting it to `null`:

```typescript
{
  message: 'Hello world!',
  platforms: {
    Alexa: {
      message: null,
    },
  },
}
```


### Native Response

For each platform, you can add a `nativeResponse` object that is directly translated into the native platform JSON.

```typescript
{
  message: 'Hello world!',
  platforms: {
    Alexa: {
      nativeResponse: {
        // Add elements in the same way they show up in the response JSON
      }
    },
  },
}
```

## Multiple Responses

You can also have an array of output objects:

```typescript
[
  {
    message: 'Hello world!',
  },
  {
    message: 'This is a second chat bubble.',
  }
]
```

Platforms that support multiple responses will display the example above in 2 chat bubbles. Synchronous platforms like Alexa will concatenate the `message` to a single response:

```typescript
{
  message: 'Hello world! This is a second chat bubble.',
}
```

