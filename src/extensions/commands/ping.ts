import type { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";
import { Core } from "../../main";

@Discord()
export class PingCommand {
  @Slash({
    description: "Ping Pong :^) 🏓",
    name: "ping",
  })
  async ping(interaction: CommandInteraction, _client: Core): Promise<void> {
    interaction.reply("🏓 Pong **" + _client.ws.ping + "ms**");
  }
}
