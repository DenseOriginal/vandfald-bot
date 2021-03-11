import { Action, ActionContext, Command } from "discord-framework";
import { GameService } from "../services/game.service";

@Command({
    name: 'forlad',
    alias: ['leave'],
    canRun: [GameService.userInGame],
    description: 'Forlader et spil'
})
export class LeaveCommand implements Action {
    constructor(public gameService: GameService) {}

    action({ message }: ActionContext) {
        const game = this.gameService.findGame(message.author);
        if(!game) return;
        const userWasOwner = game.isUserOwner(message.author);
        game.leave(message.author);
        if(game.isEmpty) { this.gameService.removeGame(game); return 'Du har forladt dit spil' };
        return `Du har forladt dit spil. ${userWasOwner ? `Den nye ejer af spillet er <@${game.owner.id}>` : ''}`;
    }
}