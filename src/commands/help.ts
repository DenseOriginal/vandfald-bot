import { Action, Command } from "discord-framework";
import { MessageEmbed } from "discord.js";
import { prefix } from "../main";

@Command({
    name: 'hjælp',
    alias: ['help'],
    description: 'Giver en hjælpe besked'
})
export class HelpCommand implements Action {
    action() {
        return new MessageEmbed()
            .setTitle('Hjælp')
            .setDescription('Forskellige commands du kan bruge')
            .addField('Alle commands', commands.map(cmd => `**${prefix}${cmd.name}**: ${cmd.desc}`))
            .addField('Hvordan spiller man?', howToPlay);
    }
}

interface YEEE {
    name: string;
    desc: string;
}

const commands: YEEE[] = [
    { name: 'opret', desc: 'Opretter et spile som dine venner kan joine' },
    { name: 'join @person', desc: 'Joiner et spil, du skal tagge den person du gerne vil join' },
    { name: 'forlad', desc: 'Forlader det spil du er inde i' },
    { name: 'træk', desc: 'Trækker et kort i det spil du er i, du kan kun trække et kort, hvis der er din tur' },
    { name: 'begynd', desc: 'Begynder spillet du er i, du kan kun starte spillet hvis du er ejeren' },
    { name: 'info @person', desc: 'Giver information om et spil, hvis du ikke tagger en person får du information om dit eget spil' },
    { name: 'kick @person', desc: 'Kicker en person fra dit spil, du kan kun kicke personer hvis du er ejeren af spillet' },
    { name: 'skip', desc: 'Springer over den nuværende person, du kan kun skippe personer hvis du er ejeren af spillet' },
    { name: 'hjælp', desc: 'Giver denne besked' }
];

const howToPlay = `Skriv \`${prefix}opret\` for at oprette et spil, som dine venner kan joine.

Hvis du vil joine et spil skal du skrive \`${prefix}join @person\` og erstatte @person med den person du gerne vil joine.

Når alle personer er joined skal ejeren skrive \`${prefix}start\` før at spillet går igang.

Når spillet er begyndt skiftes spillerne til at trække kort, når det er din tur skal du skrive \`${prefix}træk\`, hvorefter der vil komme en besked der fortæller dig hvad du har trukket, og hvem den næste spiller til at trække et kort er.

Hvis du vil forlade at spil skal du bare skrive \`${prefix}forlad\`, hvis du er ejeren af det spil du forlader bliver rollen givet videre til en anden spiller.

Hvis du vil have information omkring det spil du er i skal du skrive \`${prefix}info\`, og hvis du vil have information om en anden person, skal du huske og tagge den person du vil have information om.`;