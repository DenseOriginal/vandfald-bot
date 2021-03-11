import { Action, ActionContext, Command } from "discord-framework";
import { GameService } from "../services/game.service";
import { CardDeck } from "../utils/deck";

@Command({
    name: 'bland',
    alias: ['shuffle'],
    canRun: [GameService.isOwnerInGame],
    description: 'Blander kortene'
})
export class ShuffleCommand implements Action {
    constructor(public gameService: GameService) {}

    action({ message }: ActionContext) {
        const game = this.gameService.findGame(message.author);
        if(!game) return;
        game.deck.resetDeck();
        return 'Kortbunken af blevet blandet';
    }
}