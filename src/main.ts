import { Client } from "discordx";
import { IntentsBitField, Interaction } from "discord.js";
import { IConstants } from "./types/constants";
import { constants } from "./utils/constants";
import { importx } from "@discordx/importer";
import { Database } from "quickmongo";

export class Core extends Client {
  public constants: IConstants = constants;
  public db: Database = new Database("mongodb://0.0.0.0:27017/pixbot");

  public constructor() {
    super({
      botId: constants.DISCORD.CLIENT_ID,
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.GuildIntegrations,
        IntentsBitField.Flags.MessageContent,
      ],
      silent: false,
      simpleCommand: {
        prefix: "pix!",
      },
    });

    this.setup();
    this.db.connect().then(() => console.log("DATABASE READY!"));
  }

  public async setup() {
    this.on("ready", async () => {
      this.initApplicationCommands();
    });

    this.on("interactionCreate", (i: Interaction) => {
      this.executeInteraction(i);
    });
  }

  public async runner() {
    await importx(`${__dirname}/extensions/{events,commands}/**/*.{ts,js}`);
    this.login(this.constants.DISCORD.TOKEN);
  }
}

export default new Core().runner();
