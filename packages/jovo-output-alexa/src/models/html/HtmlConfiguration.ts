import { IsInt, Max, Min } from 'jovo-output';

export class HtmlConfiguration {
  @IsInt()
  @Min(1)
  @Max(300)
  timeoutInSeconds: number;
}
