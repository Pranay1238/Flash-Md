const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY09SVjJIQ1huNm9YOXA0UjRTUEpZUkJFbUw4SEp4QVpZaXFNNEQ3WXhGVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaWtJTytRdUdKbkJwSUpqN3BiVEs2ZkpSUGhTaFNuam5ySTlSekxob0h3QT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0TFdjc09mQkdpbkM0Rmw3bitSSzY4M29qRTNScmJzR2FZd1h5Mnl2aEV3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoZm9SNUxNemd5UWZEbFFod0hGSERvaitzT0EzUUhsaVFoZG5yWTR3bVdFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFMN2Q4QzJ1OEw2MytNamtnQm1RQ3MrUFA4Sy9DSkpzVStRTGNQMG12bFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJUeDJSYXdXa3F3VUczUHdiY2ZHcEFJendnYTJoMmxrOEM5V1pnUGkrbEk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEVzcGxaT3FuTU9yWUJiQmlBTjRqLzc5TXY1UFI1U1dBTk8raElZb3cxST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUVVERDkyck1Wa1VlcXAwQzQ1V2tITFBKQ21JVHZHQ2pIQ2l5RmxOZHFWdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhFSmhzRlpNWGNXMW5HN0tubHR5aldyMDVta01iVEFmSnhwN0YxTUw5QTZPNWZYZm1POU1kMS85K0MrSk5LcmRnWStmOWxBeEgzcUx6aXpzZnM5Vml3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM1LCJhZHZTZWNyZXRLZXkiOiJQcklMZWJhNWZCVGF1L3M5alFUUWxVbU1UeHA1akk4TEF4djRESEZiZGE4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ4SURsMEdXNlF6YXBhazFzRWxBQXZnIiwicGhvbmVJZCI6IjM2ZDg3OTU2LTAxZGUtNGUyZC1iNjgyLWNmZDY3MWM1OTY1ZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxSVlMTDdmK1BtaTgxd0pFWngwOGVDc1BXVU09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWEcvUW0xd1FGT1Z0TXRXTzYzRzNqdlpqcitRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlMyQUw5QjJYIiwibWUiOnsiaWQiOiI5MTcwNDQ1OTcxMTI6NzNAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09TdGliRURFUGJId3J3R0dEa2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik1DMXBwalRsVXhwSXZBd0JydjJXKzJtbGlTRVE1UkhVUFZJaW9PWjV1R0k9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlIwZDNtelJYSGJtL0hIaVJuUTNXWU9PRk9WZ0ZFUFRqN0t1Vk85bmNQenVOVVlBcFhldzNXOEpXN0NJaXhkUTVISWk1M0pSdzhSMjVVWkw3TERHWURBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI2anh4cTQ1bHBUSUVLbDlRZzZLaFNLYUYvYm1QWEl3M2JKVnppRXlXdUxGR1hoVnBGTVltdGVLbUJxbENUZEU0STJZR29DNFZpSmZKT0I0dnJyWkxqZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkxNzA0NDU5NzExMjo3M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUQXRhYVkwNVZNYVNMd01BYTc5bHZ0cHBZa2hFT1VSMUQxU0lxRG1lYmhpIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM3NTMyNDIwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUVKYSJ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "7044597112",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
