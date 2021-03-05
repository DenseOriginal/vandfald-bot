import { Action, Command } from "discord-framework";
import { GameService } from "../services/game.service";

@Command({
    name: 'list'
})
export class ListGamesCommand implements Action {
    constructor(public gameService: GameService) {}
    
    action() {
        return JSON.stringify(this.gameService.getAllGames().map(game => {
            return {
                owner: game.owner.id,
                participants: game.participantsArray.map(user => user.id)
            }
        }), undefined, 2);
    }
}