import * as dotenv from 'dotenv';

dotenv.config()

export const key = process.env.KEY as string;
export const appId = process.env.APP_ID as string;
export const secret = process.env.SECRET as string;