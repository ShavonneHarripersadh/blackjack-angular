import { Player } from "./../models/Player";
import { PlayerService } from "./player.service";
import { Card } from "./../models/Card";
import { DeckService } from "./deck.service";
import { Injectable } from "@angular/core";
import { forEach } from "@angular/router/src/utils/collection";

@Injectable({
  providedIn: "root"
})
export class GameplayService {
  deck: Card[] = [];
  players: Player[] = [];

  constructor(deckService: DeckService, playerService: PlayerService) {
    this.deck = deckService.generateCards(); // calls deckService method to generate the card array and return it
    this.players = playerService.getPlayers(); // gets Players
  }

  startGame(players) { // initializes game, deals 2 cards to each player
    this.deck = this.shuffle();

    // for each player, draws 2 cards to start game
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        if (players[i].hand.length < 2) {
          this.players = this.drawCard(i)
        }

      }
    }
    return players;
  }

  drawCard(index) {
    let card = this.deck.pop();
    this.players[index].hand.push(card);
    this.addTotalPoints(index);
    if(this.players[index].totalPoints > 21){
      this.players[index].bust = true;
      this.players[index].stand = true;
    }
    return this.players;
  }

  shuffle() { // randomizes deck
    let count = this.deck.length,
      temp,
      index;

    while (count > 0) {
      index = Math.floor(Math.random() * count); // gets random index in arrayLength

      count--;

      temp = this.deck[count];
      this.deck[count] = this.deck[index];
      this.deck[index] = temp;
    }
    return this.deck;
  } // going through each index in the deck and randomly swapping it with a random index

  setTotalPoints() {
    // in each hand for each player, calculates the total Value
    for (let i = 0; i < this.players.length; i++) {
      let totalVal = 0;
      for (let j = 0; j < this.players[i].hand.length; j++) {
        totalVal += this.players[i].hand[j].value;
      }
      this.players[i].totalPoints = totalVal;
    }
    return this.players;
  }

  addTotalPoints(index){
    let totalVal = 0;
      for (let j = 0; j < this.players[index].hand.length; j++) {
        totalVal += this.players[index].hand[j].value;
      }
      this.players[index].totalPoints = totalVal;

      return this.players;
  }

  changeAceValue(index) { // changes ace value
    for(let i=0; i< this.players.length;i++){
      for(let j = 0; j< this.players[i].hand.length; j++){
        if(this.players[i].hand[j].rank === 'ace' && i===index)
        {
          this.players[i].hand[j].value = 11;
        }
      }
    }
    return this.players;
  } // changes ace value from 1 to 11, so add 10

  checkAce(index){ // checks to see if theres an ace
    for(let i =0; i< this.players[index].hand.length; i++){
      if(this.players[index].hand[i].rank === 'ace'){
        return true;
      }
    }
    return false;

  }

  changeStand(index){ // change stand property
    this.players[index].stand = true;
    this.players[index].bust = true;
    return this.players;
  }

  result(players) { // method results who wins
    let winner:Player [] = []
    winner.push(this.players[0]);

    for(let i=1; i< players.length; i++)
    {
      if(winner[0].totalPoints > 21){
        winner.pop();
        if(this.players[i].totalPoints < 22)
        {
          winner.push(this.players[i])
        }
      }

      if(this.players[i].totalPoints > winner[0].totalPoints && this.players[i].totalPoints<22 )
      {
        for(let j =0; j < winner.length; j++)
        {
          winner.pop();
        }
        winner.push(this.players[i])

      }
      else if(this.players[i].totalPoints === winner[0].totalPoints && winner[0].totalPoints <22){
        winner.push(this.players[i])
      }
    }

    for(let i =0; i< this.players.length;i++){
      if (this.players[i].totalPoints === winner[0].totalPoints) {
        this.players[i].result = 'winner';
      }
      else{
        this.players[i].result = 'loser';
      }
    }
    return players;
  }

  gameResults(){ // check if all players are done and resulting can be done
    let resulting = true;
    for(let i = 0; i< this.players.length; i++)
    {
      if(this.players[i].bust === false || this.players[i].stand === false){
        resulting = false;
      }
    }
    return resulting;
  }

}
