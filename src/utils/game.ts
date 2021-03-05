import { MessageEmbed, User } from "discord.js";
import { Card } from "./card";
import { CardDeck } from "./deck";

export class Game {
    participants: Map<string, User> = new Map();
    get participantsArray() { return [...this.participants.values()] }
    get isEmpty() { return this.participants.size == 0; }
    deck = new CardDeck();
    started = false;
    currentPlayerIndex = 0;
    get nextPlayer(): User | undefined { return this.participantsArray[this.currentPlayerIndex+1 % this.participantsArray.length] }
    get currentPlayer(): User | undefined { return this.participantsArray[this.currentPlayerIndex % this.participantsArray.length] }

    constructor(
        public owner: User,
        public id: number
    ) {
        this.participants.set(owner.id, owner);
    }

    isUserInThisGame(user: User): boolean {
        return this.participants.has(user.id);
    }

    isUserOwner(user: User): boolean {
        return this.owner.id == user.id;
    }

    addUser(user: User) {
        if(this.isUserInThisGame(user)) return;
        this.participants.set(user.id, user);
    }

    leave(user: User) {
        if(!this.isUserInThisGame(user)) return;
        this.participants.delete(user.id);
        
        // If the owner leaves
        // Find new owner
        if(this.isUserOwner(user) && !this.isEmpty) this.owner = this.participantsArray[0];
    }

    start() {
        this.started = true;
    }

    draw(): Card | undefined {
        this.currentPlayerIndex++;
        return this.deck.draw();
    }

    createInfoEmbed(): MessageEmbed {
        return new MessageEmbed()
            .setTitle('Vandfald')
            .addField('Ejer', `<@${this.owner.id}>`)
            .addField('Deltagere', this.participantsArray.map(user => `<@${user.id}> ${this.isUserOwner(user) ? '👑' : ''}`).join(',   '))
            .addField('Status', this.started ? `Spillet er begyndt. Det er ${this.currentPlayer?.username}'s tur` : `Spillet er ikke begyndt`);
    }
}