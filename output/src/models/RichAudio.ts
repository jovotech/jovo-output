import { IsNotEmpty, IsString, IsUrl } from '..';

export class Mixer {
  type: 'Mixer',

  @IsNotEmpty()
  items: RichAudio[];

  toJson() {
    return {
      type: this.type,
      items: this.items.toJson(),
    };
  }
};

export class Sequencer {
  type: 'Sequencer',

  @IsNotEmpty()
  items: RichAudio[];

  toJson() {
    return {
      type: this.type,
      items: this.items.toJson(),
    };
  }
};

export class Audio {
  type: 'Audio',

  @IsNotEmpty()
  IsUrl()
  source: string;

  toJson() {
    return {
      type: this.type,
      source: this.source,
    };
  }
}

export class Speech {
  type: 'Speech',

  @IsNotEmpty()
  IsString()
  content: string;

  toJson() {
    return {
      type: this.type,
      content: this.content,
    };
  }
}

export class Silence {
  type: 'Silence',

  @IsNotEmpty()
  duration: number;

  toJson() {
    return {
      type: this.type,
      duration: this.duration,
    };
  }
}

export type RichAudio = Mixer | Sequencer | Audio | Speech | Silence;
