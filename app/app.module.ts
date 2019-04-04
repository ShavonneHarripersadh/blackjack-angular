import { PlayerService } from './services/player.service';
import { DeckService } from './services/deck.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GameComponent } from './components/game/game.component';
import {MatIconModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule,
  MatCardModule, MatProgressSpinnerModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule
  , MatExpansionModule, MatSelectModule,MatPaginatorModule, MatRippleModule, MatDividerModule, MatListModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatRippleModule,
    MatListModule
  ],
  providers: [DeckService, PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
