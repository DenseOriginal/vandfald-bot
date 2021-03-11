import { Action, ActionContext, Command } from "discord-framework";
import { MessageEmbed } from "discord.js";
import { GameService } from "../services/game.service";

@Command({
    name: 'start',
    alias: ['begynd'],
    canRun: [
        GameService.isOwnerInGame,
        GameService.gameIsNotStarted
    ],
    description: 'Starter et spil'
})
export class StartCommand implements Action {
    constructor(public gameService: GameService) {}

    action({ message }: ActionContext) {
        const user = message.author;
        const game = this.gameService.findGame(user);
        game?.start();
        return new MessageEmbed()
            .setAuthor('Spillet er begyndt')
            .setDescription(`Den første person til at trække et kort er <@${game?.currentPlayer?.id}>`);
    }
}