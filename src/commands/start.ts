import { Action, ActionContext, Command } from "discord-framework";
import { GameService } from "../services/game.service";

@Command({
    name: 'start',
    alias: ['begynd'],
    canRun: [
        GameService.isOwnerInGame,
        GameService.gameIsNotStarted
    ]
})
export class StartCommand implements Action {
    constructor(public gameService: GameService) {}

    action({ message }: ActionContext) {
        const user = message.author;
        const game = this.gameService.findGame(user);
        game?.start();
        return 'Spillet er blevet startet';
    }
}