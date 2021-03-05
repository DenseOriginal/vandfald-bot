const symbolNames = { R: 'Ruder', H: 'Hjerter', S: 'Spar', K: 'Klør' };
const cardNames = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Knægt', 'Dronning', 'Konge', 'Es'];
const apiFriendlyCard = ['2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K', 'A'];
const apiFriendlySuite = {R: 'D', H: 'H', S: 'S', K: 'C'}

export class Card {
    friendlyName: string;
    vandfaldRule: string;

    constructor(public id: string) {
        this.friendlyName = (<any>this.constructor).createFriendlyName(id);
        this.vandfaldRule = getVandfaldRule(id);
    }

    imageUrl(): string {
        return `http://deckofcardsapi.com/static/img/${apiFriendlyCard[+(this.id.slice(1))]}${(apiFriendlySuite as any)[this.id[0]]}.png`
    }

    static createFriendlyName(id: string): string {
        const symbolName: string = (symbolNames as any)[id[0]];
        const cardName = cardNames[+(id.slice(1))];
        if (!symbolName) throw new RangeError(`Kan ikke finde kulør fra symbol "${id[0]}"`);
        if (!cardName) throw new RangeError(`Kan ikke finde kort fra fra nummeret "${id.slice(1)}"`);
        return `${symbolName} ${cardName}`;
    }
}

function getVandfaldRule(id: string): string {
    const farve = ['R', 'H'].includes(id[0]) ? 'red' : 'black';
    const cardNumber = id.slice(1);
    switch (cardNumber) {
        case '0': // 2
            return farve == 'red' ? 'Uddel 2 slurke til en anden spiller' : 'Drik selv 2 slurke';
        case '1': // 3
            return farve == 'red' ? 'Uddel 3 slurke til en anden spiller' : 'Drik selv 3 slurke';
        case '2': // 4
            return farve == 'red' ? 'Uddel 4 slurke til en anden spiller' : 'Drik selv 4 slurke';
        case '3': // 5
            return farve == 'red' ? 'Uddel 5 slurke til en anden spiller' : 'Drik selv 5 slurke';
        case '4': // 6
            return '**Tissekort**: Du må kun tage en pause fra spillet til f.eks. at gå på toilet, hvis du har det her kort';
        case '5': // 7
            return '**Kategori**: Du skal nævne en kategori, f.eks. grøntsager eller bilmærker, og derefter skal deltagerne på tur nævne en ting fra kategorien. Når en person siger noget forkert, noget der allerede er sagt – eller bare ikke kan komme i tanke om noget, taber han eller hun – og skal drikke det antal slurke, der svarer til antallet af runder, I har været igennem i legen';
        case '6': // 8
            return '**Vandfald**: Alle begynder at drikke af deres genstand samtidigt. Personen der trak kortet vælger selv, hvornår han eller hun stopper med at drikke. Den næste i rækken må først stoppe med at drikke, når den første har gjort det (og sådan fortsætter det hele vejen rundt).'
        case '7': // 9
            return '**Regelkort**: Du finder på en regel som alle skal overholde resten af spillet, hvis en person glemmer eller ikke følger reglen skal personen drikke en slurk';
        case '8': // 10
            return '**Never have i ever**: Hver person siger på skift noget de ikke har gjort f.eks "Jeg har aldrig fucket mit hår op med hårfarve", hvis en person har gjort hvad der bliver sagt drikker personen en slurk. Personen der trak kortet starter'; 
        case '9': // Knægt
            return '**Herreskål**: Alle herrer skåler og drikker';
        case '10': // Dronning
            return '**Dameskål**: Alle damer skåler og drikker';
        case '11': // Konge
            return '**Konge**: Du sætter kortet på din pand, og må bestemme over resten af spillerne indtil kortet falder ned, eller en anden person trækker en konge'
        case '12': // Es
            return '**Fællesskål**: Alle skåler og drikker en slurk';
    }
    return '';
}