import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textShortner'
})
export class TextShortnerPipe implements PipeTransform {

  transform(value?: string, lenght?: number, ...args: unknown[]): unknown { 

    if(!value) return ""
    
    return value.slice(0, (lenght ?? 12)) + "...";
  }

}
