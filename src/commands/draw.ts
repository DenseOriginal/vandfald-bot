import { Action, ActionContext, Command } from "discord-framework";
import { MessageEmbed } from "discord.js";
import { prefix } from "../main";
import { GameService } from "../services/game.service";

@Command({
    name: 'træk',
    alias: ['draw'],
    canRun: [
        GameService.userInGame,
        GameService.isUsersTurn,
        GameService.isGameStarted
    ],
    description: 'Trækker et kort'
})
export class DrawCommand implements Action {
    constructor(public gameService: GameService) {}

    action({ message }: ActionContext) {
        const user = message.author;
        const game = this.gameService.findGame(user);
        if(!game || user.id != game.currentPlayer?.id) return;
        const card = game.draw();
        const howToShuffleMessage = game.isUserOwner(user) ? `Du er ejeren af spillet, skrive \`${prefix}bland\` for at fylde kortbunken op` : `Bed <@${game.owner}> om at fylde kortbunken op ved at skrive \`${prefix}bland\``
        if(!card) return `Der er ikke flere kort. ${howToShuffleMessage}`;

        return new MessageEmbed()
            .setAuthor(`${user.username} har trukket en ${card.friendlyName.toLowerCase()}`, user.displayAvatarURL())
            .setDescription(card.vandfaldRule)
            .addField('Næste spiller', `<@${game.currentPlayer.id}>`, true)
            .setImage(card.imageUrl())
            .setTimestamp()
    }
}