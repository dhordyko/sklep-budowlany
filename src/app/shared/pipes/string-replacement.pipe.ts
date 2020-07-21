import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringReplacement',
})
export class StringReplacementPipe implements PipeTransform {
  transform(str: string, words: string[]): unknown {
    console.log(str);

    for (var i = 0; i < words.length; i++) {
      str = str.split(words[i]).join('');
    }
    console.log(str);
    return str;
  }
}
