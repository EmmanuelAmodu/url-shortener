import { IsNotEmpty, IsUrl } from 'class-validator';

export class URLDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
