import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  constructor() { }

  firstWordInSentenceToUppercase(sentence: string) {
    const words = sentence.split(' ');
    return words.map((word) => {
      if (word) {
        return word[0].toUpperCase() + word.substring(1);
      }
      return ""
    }) 
    .join(' ');
  }
}
