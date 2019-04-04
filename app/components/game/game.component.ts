import { Player } from './../../models/Player';
import { PlayerService } from './../../services/player.service';
import { GameplayService } from './../../services/gameplay.service';
import { Card } from './../../models/Card';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  players: Player[] = []; // gets Players from players Service
  player: Player;
  numLimit: boolean = false;
  count: number = 0;
  canIResult: boolean = false;
  showAceButton:boolean = true; // to disable making ace 11 after click event
  nameValue: string = '';

  constructor(private gameplayService: GameplayService, private playerService: PlayerService) {
  }

  ngOnInit() {
  }


  addPlayer(playerName) {
    console.log(this.nameValue)
    let player = { name: playerName, hand: [], totalPoints: 0, bust: false, stand: false, result:'' }
    this.players = this.playerService.addPlayer(player);
    this.count++;
    if (this.count === 3) {
      this.numLimit = true;
      this.players = this.gameplayService.startGame(this.players);
    }
    this.nameValue='';
  }

  check() {

    if (this.numLimit) {
      this.players = this.playerService.getPlayers();
      this.players = this.gameplayService.setTotalPoints();
      return true;
    }
    return false;
  }

  hit(index) {

    this.players = this.gameplayService.drawCard(index);
    this.players = this.gameplayService.addTotalPoints(index);
    this.allDone();
  }

  stand(index){ // service call to end player from playing after clicking on stand
    this.players = this.gameplayService.changeStand(index);
    this.allDone();
  }

  checkIfAce(index) { // service call to see if hand has an ace
    return this.gameplayService.checkAce(index);
  }

  changeAceValue(index) {
    this.showAceButton = false;
    this.players = this.gameplayService.changeAceValue(index);
    this.players = this.gameplayService.addTotalPoints(index);
  }

  getResult(){ // calls service method to get result
    this.players = this.gameplayService.result(this.players)
  }

  allDone(){ // calls service method to see if all players are done playing
    this.canIResult = this.gameplayService.gameResults();
  }


}
