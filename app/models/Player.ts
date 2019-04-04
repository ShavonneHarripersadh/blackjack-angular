import { Card } from './Card';

export interface Player {
  name: string;
  hand: Card[];
  totalPoints: number;
  bust: boolean;
  stand: boolean;
  result:string
}
