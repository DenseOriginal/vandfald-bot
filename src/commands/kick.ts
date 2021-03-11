import { Action, ActionContext, Command, Validator } from "discord-framework";
import { User } from "discord.js";
import { GameService } from "../services/game.service";

@Command({
    name: 'kick',
    canRun: [GameService.userInGame, GameService.isOwnerInGame],
    arguments: [{
        key: 'userToKick',
        type: 'member',
        validators: [GameService.isAuthorAndUserInSameGame]
    }],
    description: 'Smider en person ud af et spil'
})
export class KickCommand implements Action {
    constructor(public gameService: GameService) {}

    action({ message, args }: ActionContext) {
        const userToKick: User = args.userToKick.user;
        const author = message.author;
        const game = this.gameService.findGame(author);
        game?.leave(userToKick);
        return `${userToKick.username} er blevet smidt ud`;
    }
}