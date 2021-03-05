import { Card } from "./card";

export class CardDeck {
    cards: Card[] = [];

    constructor() {
        this.resetDeck();
    }

    resetDeck() {
        const suits = ['H', 'R', 'S', 'K'];
        // Reset cards array
        this.cards = [];
        suits.forEach((suitSymbol) => {
            for(let idx = 0; idx < 13; idx++) {
                this.cards.push(new Card(`${suitSymbol}${idx}`));
            }
        });
    }

    draw(): Card | undefined {
        const idx = Math.floor(Math.random() * this.cards.length);
        const card = this.cards.splice(idx, 1)[0];
        return card;
    }
}