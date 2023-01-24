import { EmbedBuilder, Message, AwaitMessagesOptions } from "discord.js";
import type { ArgsOf } from "discordx";
import { Discord, On } from "discordx";
import { createdGameEmbed } from "../../components/embeds/createdGame";
import { wordControl } from "../../lib/game/wordControl";
import { Core } from "../../main";

const puans = [23, 16, 9, 30, 43, 20, 10, 3, 2];
const randomPuans = puans[Math.floor(Math.random() * puans.length)];

@Discord()
export class WordGame {
  @On()
  async messageCreate(
    [message]: ArgsOf<"messageCreate">,
    _client: Core
  ): Promise<void | Message<boolean>> {
    _client.executeCommand(message);
    var content = message.content;
    var gameChannel = await _client.db.get(`game.channel.${message.guild?.id}`);
    var gameLetter: string = await _client.db.get(
      `game.letter.${message.guild?.id}`
    );
    var gameLetters: string[] = await _client.db.get(
      `game.letters.${message.guild?.id}`
    );
    var lastGamer: string = await _client.db.get(
      `game.lastGamer.${message.guild?.id}`
    );

    if (message.author.bot) return;
    if (message.author.id === _client.botId) return;
    if (message.channel?.id === gameChannel) {
      if (message.attachments.size >= 1) return message.delete();
      var lastLetter = content.charAt(content.length - 1);
      var firstLetter = content.charAt(0);

      if (
        _client.constants.DISCORD.WORD_GAME_IGNORE_WORDS.includes(firstLetter)
      )
        return;

      if (content.startsWith(gameLetter)) {
        var control = await wordControl(content);
        if (control) {
          if (lastGamer !== message.author.id) {
            if (typeof gameLetters !== undefined) {
              if (!gameLetters.includes(content)) {
                await _client.db.set(
                  `game.puan.${message.author.id}`,
                  randomPuans
                );
                await _client.db.set(
                  `game.lastGamer.${message.guild?.id}`,
                  message.author.id
                );
                await _client.db.push(
                  `game.letters.${message.guild?.id}`,
                  content
                );
                await _client.db.set(
                  `game.letter.${message.guild?.id}`,
                  lastLetter
                );
                message.react("👍");
              } else {
                await message.delete();
                message.channel
                  .send({
                    content: `${content} kelimesi zaten daha onceden kullanılmış`,
                  })
                  .then((m) => setTimeout(() => m.delete(), 3000));
              }
            }
          } else {
            await message.delete();
            message.channel
              .send("En son sen yazdım zaten amk keli")
              .then((m) => setTimeout(() => m.delete(), 3000));
          }
        } else {
          await message.delete();
          message.channel
            .send("Bu kelime tdk da yok!")
            .then((m) => setTimeout(() => m.delete(), 3000));
        }
      } else {
        await message.delete();
        message.channel
          .send("Ustam **" + gameLetter + "** harfi ile başlamalısın.")
          .then((m) => setTimeout(() => m.delete(), 3000));
      }
    }
  }
}
