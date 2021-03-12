import dotenv from 'dotenv'

dotenv.config();

export const CREDENTIALS = {
    VALID_USER: {
        USERNAME: process.env.USERNAME,
        PASSWORD: process.env.PASSWORD,
    },
    INVALID_USER: {
        USERNAME: process.env.INVALID_USERNAME,
        PASSWORD: process.env.INVALID_PASSWORD,
    },
    VALID_ADDRESS: {
        FIRST_NAME: process.env.FISRT_NAME,
        LAST_NAME: process.env.LAST_NAME,
        ZIP_CODE: process.env.ZIP_CODE
    },
};
