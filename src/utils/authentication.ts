import { FriendlyError } from "discord-framework";
import { Message, TextChannel } from "discord.js";
import { ownerID } from "../main";

const vandfaldCategoryID = "819643234987933708";
// const vandfaldCategoryID = "778709597137403904"; // Dev server kategori
export function isRunInVandfaldChannel(message: Message): FriendlyError | void {
    // If it's the owner ignore the category check
    // if(message.author.id == ownerID) return;
    return;
    if ((message?.channel as TextChannel)?.parent?.id == vandfaldCategoryID) return;
    return new FriendlyError(`Jeg kan kun blive brugt i <#${vandfaldCategoryID}>`);
}

export function isOwner(message: Message): FriendlyError | void {
    if(message.author.id == ownerID) return;
    // Returning an empty FriendlyError so that no error will show up on discord
    // And the user will assume that the command doesn't exis
    return new FriendlyError('');
}