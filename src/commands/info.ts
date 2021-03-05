import { Action, ActionContext, Command } from "discord-framework";
import { GameService } from "../services/game.service";

@Command({
    name: 'info',
    arguments: [{
        key: 'usersGame',
        type: 'member',
        optional: true
    }]
})
export class InfoCommand implements Action {
    constructor(public gameService: GameService) {}

    action({ message, args }: ActionContext) {
        const game = this.gameService.findGame(args.usersGame || message.author);
        if(!game) return args.usersGame ? `${args.usersGame?.user?.username} er ikke i noget spil` : 'Du er ikke i noget spil';
        return game.createInfoEmbed();
    }
}