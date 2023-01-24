interface IConstantsDiscord {
  TOKEN: string;
  CLIENT_ID: string;
  DEVELOPER_ID: string[];
  ACTIVITIE_NAME: string;
  WORD_GAME_CHANNEL: string;
  WORD_GAME_IGNORE_WORDS: string[];
}

interface IConstantsDatabase {
  USER: string;
  HOST: string;
  DATABASE: string;
  PASS: string;
  PORT: number;
}

interface IConstants {
  DISCORD: IConstantsDiscord;
  DATABASE: IConstantsDatabase;
}

export { IConstants, IConstantsDiscord };
