import {GameType} from './game';
import {User} from './user';

export class Room {
  public code: string;
  public gameType:  GameType;
  public users: User[] = [];

  constructor(id: string, gameType: GameType)
  {
    this.code = id;
    this.gameType = gameType;
  }
}
