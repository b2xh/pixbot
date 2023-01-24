import { EmbedBuilder } from "discord.js";
import { constants } from "../../utils/constants";

function createdGameEmbed(word: string) {
  return new EmbedBuilder()
    .setColor("#5865f2")
    .setTitle("Yeni Oyun! :tada:")
    .setDescription(
      "Yeni bir oyun başladı! Bu mesajdan sonra bütün kelimeler sayılacak, ve yanlış kelimeler silinecektir."
    )
    .setFields([
      {
        name: "Tüyo 😳",
        value:
          "Oyun dışında bir şeyler konuşmak istiyorsanız, mesaj yazarken başına " +
          constants.DISCORD.WORD_GAME_IGNORE_WORDS.map((x) => `\`${x}\``) +
          " karakterlerinde birini kullanabilirsiniz.\n- Bu karaterlerle başlayan kelimeler oyuna dahil edilmeyecektir! ",
      },
    ])
    .addFields({
      name: "Başlangıç Harfi",
      value: `\`${word}\``,
      inline: true,
    })
    .addFields({
      name: "Oyun Kanalı",
      value: `<#${constants.DISCORD.WORD_GAME_CHANNEL}>`,
      inline: true,
    })
    .setTimestamp();
}

export { createdGameEmbed };
