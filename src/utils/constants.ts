import { IConstants } from "../types/constants";
import { config } from "dotenv";
config();

const constants: IConstants = {
  DISCORD: {
    TOKEN: process.env.TOKEN as string,
    CLIENT_ID: "1054713447482392638",
    DEVELOPER_ID: ["489886461718560788", "668120333135511583"],
    ACTIVITIE_NAME: "PIX TEAM",
    WORD_GAME_CHANNEL: "1055857159956607037",
    WORD_GAME_IGNORE_WORDS: [">", ".", "#", "!", "(", ")"],
  },
  DATABASE: {
    USER: "postgres",
    HOST: "localhost",
    DATABASE: "pixbot",
    PASS: "admin",
    PORT: 5432,
  },
};

export { constants };
