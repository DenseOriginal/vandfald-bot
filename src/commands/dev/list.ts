import { Action, ActionContext, Command } from "discord-framework";
import { GameService } from "../../services/game.service";

@Command({
    name: 'list',
    description: 'List'
})
export class ListGamesCommand implements Action {
    constructor(public gameService: GameService) {}
    
    action({ message }: ActionContext) {
        const list = JSON.stringify(this.gameService.getAllGames().map(game => {
            return {
                id: game.id,
                owner: game.owner.id,
                participants: game.participantsArray.map(user => user.id),
                started: game.started,
            }
        }), undefined, 2);

        message.author.send(list);
    }
}