import { IsNumber } from 'jovo-output';

export class ApltDocumentSettings {
  @IsNumber()
  idleTimeout: number;
}
