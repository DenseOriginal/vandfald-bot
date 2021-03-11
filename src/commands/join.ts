import { Action, ActionContext, Command, FriendlyError } from "discord-framework";
import { GuildMember, User } from "discord.js";
import { GameService } from "../services/game.service";

// Validator function
function isUserInGame(member: GuildMember): FriendlyError | void {
    const user = member.user;
    const isUserInGame = GameService.games.some(game => game.isUserInThisGame(user));
    if (!isUserInGame) return new FriendlyError(`<@${user.id}> er ikke i et spil`);
    return;
}

@Command({
    name: 'join',
    canRun: [GameService.userNotInGame],
    arguments: [{
        key: 'userToJoin',
        type: 'member',
        validators: [isUserInGame]
    }],
    description: 'Tilslutter et spil'
})
export class JoinCommand implements Action {
    constructor(public gameService: GameService) {}

    action({ message, args }: ActionContext) {
        const author = message.author;
        const userToJoin: User = args.userToJoin.user;
        const gameToJoin = this.gameService.findGame(userToJoin);
        if(!gameToJoin) return 'Kan ikke finde det spil du leder efter';
        if(gameToJoin.started) return 'Spillet er desværre allerede begyndt'
        gameToJoin?.addUser(author);
        return `Du har tilsluttet ${userToJoin.username}'s spil`;
    }
}