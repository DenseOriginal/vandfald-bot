import { Action, ActionContext, Command } from "discord-framework";
import { User } from "discord.js";
import { GameService } from "../services/game.service";

@Command({
    name: 'skip',
    canRun: [GameService.isOwnerInGame, GameService.isGameStarted],
    description: 'Springer over en person'
})
export class SkipCommand implements Action {
    constructor(public gameService: GameService) {}

    action({ message }: ActionContext) {
        const author = message.author;
        const game = this.gameService.findGame(author);
        if(!game) return;
        const userToSkip = game.currentPlayer;
        game.currentPlayerIndex++;
        if(userToSkip) return `Der er blevet sprunget over <@${userToSkip.id}>, nu er det <@${game.currentPlayer?.id}>'s tur`;
        return `Nu er det <@${game.currentPlayer?.id}>'s tur`;
    }
}