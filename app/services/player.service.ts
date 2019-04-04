import { Player } from './../models/Player';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  players: Player[] = []; // Player array with players to be added
  player: Player ={name: '', hand: [], totalPoints: 0, bust: false, stand: false, result: ''}; // blank Player object to add to players
  playerNumber: number;

  constructor() {

   }

   addPlayer(player: Player){

    this.players.push(player);
    console.log(this.players)
    return this.players;
   }

   getPlayers() {
     return this.players;
   }




}
