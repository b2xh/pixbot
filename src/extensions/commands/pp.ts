import {
  Discord,
  SimpleCommand,
  SimpleCommandMessage,
  SimpleCommandOption,
  SimpleCommandOptionType,
} from "discordx";
import { GuildMember } from "discord.js";

@Discord()
export class AvatarCommand {
  @SimpleCommand({ name: "avatar", aliases: ["pp"] })
  async Avatar(
    @SimpleCommandOption({
      name: "user",
      type: SimpleCommandOptionType.Mentionable,
    })
    guildUser: GuildMember,
    command: SimpleCommandMessage
  ) {
    if (!command.isValid()) return command.sendUsageSyntax();
    return command.message.reply(`${guildUser.user.username}`);
  }
}
