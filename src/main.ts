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
        HelpCommand
    ]
})
class MainHandler { }

const client = bootstrap(MainHandler, {
    prefix: '!',
    token: process.env.BOT_TOKEN as string
}).on('ready', () => {
    console.log('Bot is ready');
    client.user?.setActivity('vandfald', { type: 'COMPETING' });
});
