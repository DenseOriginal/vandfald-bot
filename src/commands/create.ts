import { Action, ActionContext, Command } from "discord-framework";
import { GameService } from "../services/game.service";

@Command({
    name: 'opret',
    alias: ['create'],
    canRun: [GameService.userNotInGame]
})
export class CreateCommand implements Action {
    constructor(public gameService: GameService) {}

    action({ message }: ActionContext) {
        const owner = message.author;
        this.gameService.createGame(owner);
        return 'Spillet er oprettet';
    }
}