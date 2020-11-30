import { Type } from 'class-transformer';
import { ValidateNested } from '..';
import { GenericCard } from './GenericCard';

export class GenericCarousel {
  @ValidateNested({
    each: true,
  })
  @Type(() => GenericCard)
  items: GenericCard[];
}
