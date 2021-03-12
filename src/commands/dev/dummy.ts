import { Action, ActionContext, Command } from "discord-framework";
import { GuildMember } from "discord.js";
import { GameService } from "../../services/game.service";

@Command({
    name: 'addDummy',
    arguments: [{
        key: 'dummy',
        type: 'member'
    }],
    canRun: [GameService.userInGame],
    description: 'Dummy'
})
export class DummyCommand implements Action {
    constructor(public gameService: GameService) {}

    action({ message, args }: ActionContext) {
        const dummy: GuildMember = args.dummy;
        const game = this.gameService.findGame(message.author);
        
        if(!game) return;
        game.addUser(dummy.user);
    }
}