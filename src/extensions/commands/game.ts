import {
  ApplicationCommandOptionType,
  CommandInteraction,
  GuildChannel,
  ChannelType,
} from "discord.js";
import { Discord, Guard, Slash, SlashOption } from "discordx";
import { createdGameEmbed } from "../../components/embeds/createdGame";
import { Core } from "../../main";

var letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

@Discord()
export class GameCommand {
  @Slash({ name: "set-game", description: "Set game channel" })
  async setGame(
    @SlashOption({
      description: "Channel",
      name: "channel",
      required: true,
      type: ApplicationCommandOptionType.Channel,
    })
    channel: GuildChannel,
    interaction: CommandInteraction,
    _client: Core
  ): Promise<void> {
    var dbChannel = await _client.db.get(
      `game.channel.${interaction.guild?.id}`
    );
    var gameChannel = await interaction.guild?.channels.cache.get(channel.id);
    var randomLetter = Math.floor(Math.random() * letters.length);
    if (dbChannel) {
      interaction.reply({
        content: `<#${channel.id}> kanalında zaten oyun oynanıyor. Yeni bir oyun başlatamazsın!`,
        ephemeral: true,
      });
    } else {
      await _client.db.set(
        `game.letter.${interaction.guild?.id}`,
        String(letters[randomLetter])
      );
      await _client.db.push(`game.letters.${interaction.guild?.id}`, "x");
      await _client.db.set(`game.channel.${interaction.guild?.id}`, channel.id);
      interaction.reply({
        content: `<#${channel.id}> kanalıda oyun başlatılıyor..`,
        ephemeral: true,
      });
      if (gameChannel?.type == ChannelType.GuildText) {
        gameChannel.send({
          embeds: [createdGameEmbed(String(letters[randomLetter]))],
        });
      }
    }
    return;
  }

  @Slash({ name: "delete-game", description: "Remove game channel" })
  async deleteGame(
    @SlashOption({
      description: "Channel",
      name: "channel",
      required: true,
      type: ApplicationCommandOptionType.Channel,
    })
    channel: GuildChannel,
    interaction: CommandInteraction,
    _client: Core
  ) {}
}
