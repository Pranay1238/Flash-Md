const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibU9UdFRoeHpNNjFrQUs2cFl6TlA2QzhhSCtQVU1id2xaQ0R4MHIxKzcyYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZjQxZW1IWjBpOWtZbkl0NDBhSUIyVzJ3aERBbGRNb0diTEw2bUpXT0l3RT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnTnJHL0o3d0hQT3FGTnpnSmY3Vll6Mmw0S2t2NGhBbXdQcVJUZDRkNjIwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtMUhQVnN2dVhSa1NCQ3ZJaXFQcEc5R2o2QWRkdWpFU09tMHV4ZkNjdWlNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVCeWZWem1GMHBPaFBUZWNRdnhKTDlhbGFDZkl0cjFuSnlzM2hJa1FXbWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhibkFoR3d0T3FMdEZkdUJHakhoTzlsZXpzR0JsalFVZVdvMk1sK2R3VkU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0VVY1B0YVJ3cktCMEdCYW5Jb1JVQk51ZnNXdEYvMG9oMzN5bTB3blNVTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNnNlMlhoV2FHUFFkeG1jVlNYL2lZdExHWWYzNEw5NWV5cEdra0huak9qYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZTVHpvRWNvOWk1RnZ2bjBWcFRzSDdRZkkvUko5ckRjNFZ2cnRNT2JXLzQrMDR1andRT0xVZGZiTUVsenE2bVdVdW5LdVhwTE9PQ0QxcHZSekN4ZWlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjU1LCJhZHZTZWNyZXRLZXkiOiIwNUQ5d28xeFRTSG1SV3ZySGpYVkp2N0pCMlQ3MFlhWHpzYWNjalZhQk1ZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkxNzA0NDU5NzExMkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3QTE3RkJGODA2QjVBM0EzRTlFOUE3MDQ4ODQ5Qzg0OCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzM3Nzg5NzIwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJraWMyVFQyUVFfYUJiUElfTlZ5VVN3IiwicGhvbmVJZCI6ImVlYzJhZGU4LTc2YTAtNDRiMy1hOGNkLWFjZmMxYjFmMTAwNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBSW14YlhwUWFZVEMvWEIxSEgwc1NqWFFkV0E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMjNHZHhZMlJSRlBTMHNLQm12eGt2RUxCWlU4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IldQU0Q0Rks4IiwibWUiOnsiaWQiOiI5MTcwNDQ1OTcxMTI6ODFAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09TdGliRURFSWVpMHJ3R0dFRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik1DMXBwalRsVXhwSXZBd0JydjJXKzJtbGlTRVE1UkhVUFZJaW9PWjV1R0k9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlNyY1ZnbG5USVBQdGhHdzhXK0FtQkIzVFhkd1oxVzk2dm9yeXhmVjJORVJ3WW1uRjV4U0JLU3l5OE8wcDZRazNkdlByTVFVSXNDb0lTQXBWRm1tZkNBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJBWmZyeTR5ekM0ZUlITUtGKzFmV0xiVnU1dmZoVUNsRW85QTRuVU1QTGZ4dkdWWEhmTXFycGJScEdUSGhpTFhiNW85UzF5NkVhUU9HNW9QVjFaMDJoQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkxNzA0NDU5NzExMjo4MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUQXRhYVkwNVZNYVNMd01BYTc5bHZ0cHBZa2hFT1VSMUQxU0lxRG1lYmhpIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM3Nzg5NzE2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUVKYSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "254757835036", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
CHATBOT: process.env.CHAT_BOT || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
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
