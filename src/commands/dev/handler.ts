import { Handler } from "discord-framework";
import { isOwner } from "../../utils/authentication";
import { DummyCommand } from "./dummy";
import { ListGamesCommand } from "./list";
import { PingCommand } from "./ping";

@Handler({
    name: 'dev',
    commands: [PingCommand, ListGamesCommand, DummyCommand],
    description: 'Developer commands',
    canRun: [isOwner]
})
export class DevHandler {}