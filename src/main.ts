require('dotenv').config()
import { bootstrap, FriendlyError, Handler } from "discord-framework";
import { CreateCommand } from "./commands/create";
import { DrawCommand } from "./commands/draw";
import { HelpCommand } from "./commands/help";
import { InfoCommand } from "./commands/info";
import { JoinCommand } from "./commands/join";
import { KickCommand } from "./commands/kick";
import { LeaveCommand } from "./commands/leave";
import { StartCommand } from "./commands/start";
import { SkipCommand } from "./commands/skip";
import { ShuffleCommand } from "./commands/shuffle";
import { isRunInVandfaldChannel } from "./utils/authentication";
import { DevHandler } from "./commands/dev/handler";

@Handler({
    name: 'main',
    commands: [
        CreateCommand,
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
    handlers: [DevHandler],
    description: 'Main',
    silentOnUnknownCommand: true,
    // canRun: [isRunInVandfaldChannel]
})
class MainHandler { }

export const prefix = '!';
export const ownerID = '248363557370986496';

const client = bootstrap(MainHandler, {
    prefix,
    token: process.env.BOT_TOKEN as string,
    usePingAsPrefix: false,
}).on('ready', () => {
    client.user?.setActivity('vandfald', { type: 'COMPETING' });
});
