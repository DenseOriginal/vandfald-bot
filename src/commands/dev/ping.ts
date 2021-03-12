import { Action, Command } from "discord-framework";

@Command({
    name: 'ping',
    description: 'Pong'
})
export class PingCommand implements Action {
    action() {
        return 'Pong 🏓';
    }
}