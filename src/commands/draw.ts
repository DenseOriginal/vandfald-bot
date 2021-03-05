import { Action, ActionContext, Command } from "discord-framework";
import { MessageEmbed } from "discord.js";
import { GameService } from "../services/game.service";

@Command({
    name: 'træk',
    alias: ['draw'],
    canRun: [
        GameService.userInGame,
        GameService.isUsersTurn,
        GameService.isGameStarted
    ]
})
export class DrawCommand implements Action {
    constructor(public gameService: GameService) {}

    action({ message }: ActionContext) {
        const user = message.author;
        const game = this.gameService.findGame(user);
        if(!game || user.id != game.currentPlayer?.id) return;
        const card = game.draw();
        if(!card) return 'Der er ikke flere kort';

        return new MessageEmbed()
            .setAuthor(`${user.username} har trukket en ${card.friendlyName.toLowerCase()}`, user.displayAvatarURL())
            .setDescription(card.vandfaldRule)
            .addField('Næste spiller', `<@${game.currentPlayer.id}>`, true)
            .setImage(card.imageUrl())
            .setTimestamp()
    }
}