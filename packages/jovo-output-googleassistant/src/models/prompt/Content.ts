import { Type } from 'jovo-output';
import { IsValidContentObject } from '../../decorators/validation/IsValidContentObject';
import { Card } from '../content/Card';
import { Collection } from '../content/Collection';
import { Image } from '../common/Image';
import { List } from '../content/List';
import { Media } from '../content/Media';
import { Table } from '../content/Table';

export class Content {
  @IsValidContentObject()
  @Type(() => Card)
  card?: Card;

  @IsValidContentObject()
  @Type(() => Image)
  image?: Image;

  @IsValidContentObject()
  @Type(() => Table)
  table?: Table;

  @IsValidContentObject()
  @Type(() => Media)
  media?: Media;

  @IsValidContentObject()
  @Type(() => Collection)
  collection?: Collection;

  @IsValidContentObject()
  @Type(() => List)
  list?: List;
}
