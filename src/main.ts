require('dotenv').config()
import { bootstrap, Handler } from "discord-framework";
import { CreateCommand } from "./commands/create";
import { DrawCommand } from "./commands/draw";
import { DummyCommand } from "./commands/dummy";
import { HelpCommand } from "./commands/help";
import { InfoCommand } from "./commands/info";
import { JoinCommand } from "./commands/join";
import { KickCommand } from "./commands/kick";
import { LeaveCommand } from "./commands/leave";
import { ListGamesCommand } from "./commands/list";
import { StartCommand } from "./commands/start";
import { SkipCommand } from "./commands/skip";
import { ShuffleCommand } from "./commands/shuffle";

@Handler({
    name: 'main',
    commands: [
        CreateCommand,
        DummyCommand,
        ListGamesCommand,
        LeaveCommand,
        InfoCommand,
        DrawCommand,
        JoinCommand,
        KickCommand,
        StartCommand,
        HelpCommand,
        SkipCommand,
        ShuffleCommand
    ],
    description: 'Main'
})
class MainHandler { }

export const prefix = '!';

const client = bootstrap(MainHandler, {
    prefix,
    token: process.env.BOT_TOKEN as string
}).on('ready', () => {
    client.user?.setActivity('vandfald', { type: 'COMPETING' });
});
