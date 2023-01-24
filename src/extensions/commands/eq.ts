import { EmbedBuilder } from "discord.js";
import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";
import { Core } from "../../main";
import axios from "axios";

@Discord()
export class EarthquakeCommand {
  @Slash({
    description: "Kandilli Rasathanesinden ilk 10 depremi sıralar.",
    name: "eq",
  })
  async EarthquakeCommand(
    interaction: CommandInteraction,
    _client: Core
  ): Promise<void> {
    var embed = new EmbedBuilder()
      .setAuthor({
        name: "Son 15 deprem",
        url: "https://kandilli-server-1wx8r6x8j-br1ss.vercel.app/api",
      })
      .setColor("#5865f2");

    var url: string = "https://kandilli-server-1wx8r6x8j-br1ss.vercel.app/api";
    var { data } = await axios.get(url, {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    });

    var earthquakes = data.data.filter((x: { id: number }) => x.id <= 15);
    embed.setDescription(
      earthquakes
        .map(
          (x: {
            maps: any[];
            id: any;
            location: any;
            data: { size: { md: any; ml: any; mw: any } };
            date: any;
          }) =>
            `[#${x.id} [${x.date.trim()}] ${x.location} ML:${x.data.size.ml}](${
              x.maps[0]
            })`
        )
        .join("\n")
    );

    interaction.reply({ embeds: [embed] });
    return;
  }
}
