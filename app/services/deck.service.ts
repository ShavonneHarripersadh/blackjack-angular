import { Card } from './../models/Card';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  cards: Card[] = []; // Array of cards
  card: Card ; // initialize blank object
  count: number = 0; // Card Array index

  constructor() {
    this.card = {suit: '', rank: '', value: 0, image: ''};
   }

  generateCards(): Card[]{

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 13; j++) {
        if(i === 0)        {
          this.card.suit = 'club';
        }
        else if(i === 1)        {
          this.card.suit = 'diamond';
        }
        else if(i === 2){
          this.card.suit = 'heart';
        }
        else if(i===3){
          this.card.suit = 'spade';
        }
        this.setCardRankAndValue(this.count, (j));
        var getImage = this.setCardImage(this.card);
        let cardsTemp = {suit:this.card.suit , rank: this.card.rank, value: this.card.value, image:getImage };
        this.cards.push(cardsTemp)
        this.count++;
      }
    }

    return this.cards;
  }

  setCardRankAndValue(num:number, index:number){
    if(index === 0)    {
      this.card.rank = 'ace';
      this.card.value = 1;
    }
    else if(index===10){
      this.card.rank = 'jack';
      this.card.value = 10;
    }
    else if(index === 11){
      this.card.rank = 'queen';
      this.card.value = 10;
    }
    else if(index === 12){
      this.card.rank = 'king';
      this.card.value = 10;
    }
    else{
      index+=1
      this.card.rank = index.toString();
      this.card.value = index;
    }
  }

  setCardImage(card:Card){ // constructing image path
    if(card.value === 1)
    {
      return '../assets/images/' + this.card.suit + '_' + this.card.value + '.png';
    }
    else  {
      return '../assets/images/' + this.card.suit + '_' + this.card.rank + '.png';
    }

  }

}
