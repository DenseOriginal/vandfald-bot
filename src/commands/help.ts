import { Action, Command } from "discord-framework";
import { MessageEmbed } from "discord.js";

@Command({
    name: 'hjælp',
    alias: ['help']
})
export class HelpCommand implements Action {
    action() {
        return new MessageEmbed()
            .setTitle('Hjælp')
            .setDescription('Forskellige commands du kan bruge')
            .addField('Alle commands', commands.map(cmd => `**${prefix}${cmd.name}**: ${cmd.desc}`))
    }
}

interface YEEE {
    name: string;
    desc: string;
}

const prefix = '!';
const commands: YEEE[] = [
    { name: 'opret', desc: 'Opretter et spile som dine venner kan joine' },
    { name: 'join @person', desc: 'Joiner et spil, du skal tagge den person du gerne vil join' },
    { name: 'forlad', desc: 'Forlader det spil du er inde i' },
    { name: 'træk', desc: 'Trækker et kort i det spil du er i, du kan kun trække et kort, hvis der er din tur' },
    { name: 'begynd', desc: 'Begynder spillet du er i, du kan kun starte spillet hvis du er ejeren' },
    { name: 'info @person', desc: 'Giver information om et spil, hvis du ikke tagger en person for du information om dit eget spil' },
    { name: 'kick @person', desc: 'Kicker en person fra dit spil, du kan kun kicke personer hvis du er ejeren af spillet' },
    { name: 'hjælp', desc: 'Giver denne besked' }
]