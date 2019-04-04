import { Card } from './models/Card';
import { DeckService } from './services/deck.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'black-jack';
  cards:Card[] =[];

  constructor(deckService : DeckService){
    
  }

  ngOnInit() {
  }


}
