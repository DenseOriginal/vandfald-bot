import { FriendlyError, Service } from "discord-framework";
import { GuildManager, GuildMember, Message, User } from "discord.js";
import { Game } from "../utils/game";

const games: Game[] = []
let gameIdIncremental = 0;

@Service()
export class GameService {
    get games(): Game[] { return games }
    static get games(): Game[] { return games }

    createGame(owner: User) {
        const isUserInGame = this.games.some(game => game.isUserInThisGame(owner));
        if(isUserInGame) return;

        const newGame = new Game(owner, gameIdIncremental++);

        this.games.push(newGame);
        return newGame;
    }

    findGame(user: User): Game | undefined {
        return this.games.find(game => game.isUserInThisGame(user));
    }

    findGameById(id: number): Game | undefined {
        return games.find(game => game.id == id);
    }

    getAllGames(): Game[] {
        return this.games;
    }

    removeGame(game: Game) {
        const indexInGameArray = games.findIndex(g => g.id == game.id);
        games.splice(indexInGameArray, 1);
    }

    // Auth functions
    static userNotInGame(message: Message): FriendlyError | void {
        const isUserInGame = games.some(game => game.isUserInThisGame(message.author));
        if(isUserInGame) return new FriendlyError('Du er allerede i et spil, skriv `!forlad` for at forlade spillet du er i');
        return;
    }

    static userInGame(message: Message): FriendlyError | void {
        const isUserInGame = games.some(game => game.isUserInThisGame(message.author));
        if(isUserInGame) return;
        return new FriendlyError('Du skal være i et spil');
    }

    static isUsersTurn(message: Message): FriendlyError | void {
        const user = message.author;
        const game = games.find(game => game.isUserInThisGame(user));
        if(!game) return new FriendlyError('Du skal være i et spil');
        if(user.id != game.currentPlayer?.id) return new FriendlyError('Det ikke din tur endnu');
        return;
    }

    static isOwnerInGame(message: Message): FriendlyError | void {
        const user = message.author;
        const game = games.find(game => game.isUserInThisGame(user));
        if(!game) return new FriendlyError('Du skal være i et spil');
        const isOwner = game.isUserOwner(user);
        if(!isOwner) return new FriendlyError('Du skal være ejeren af det spil du er i, for at bruge denne command');
        return;
    }

    static isAuthorAndUserInSameGame(member: GuildMember, message: Message): FriendlyError | void {        
        const user = member.user;
        const game = games.find(game => game.isUserInThisGame(message.author));
        if(!game) return new FriendlyError(`Du er ikke i samme spil som ${user.username}`);
        if(!game?.isUserInThisGame(user)) return new FriendlyError(`Du er ikke i samme spil som ${user.username}`);
        return;
    }

    static isGameStarted(message: Message): FriendlyError | void {
        const user = message.author;
        const game = games.find(game => game.isUserInThisGame(user));
        if(!game) return new FriendlyError('Du er ikke i et spil');
        const howToStartMessage = game.isUserOwner(user) ? `Du er ejeren af spillet, skriv \`!start\` for at starte spillet` : `Bed <@${game.owner}> om at starte spillet ved at skrive \`!start\``
        if(!game.started) return new FriendlyError(`Spillet er ikke startet endnu. ${howToStartMessage}`);
        return;
    }

    static gameIsNotStarted(message: Message): FriendlyError | void {
        const user = message.author;
        const game = games.find(game => game.isUserInThisGame(user));
        if(!game) return new FriendlyError('Du er ikke i et spil');
        if(game.started) return new FriendlyError('Spillet er allerede begyndt');
        return;
    }
}