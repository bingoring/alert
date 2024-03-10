/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-empty-interface */
import 'multer';
import { SessionAllType } from '../router/sign-up/session.type';

declare module 'express-session' {
    interface SessionData extends SessionAllType {}
}

declare global {
    namespace Express {
        interface Request {
            isAdmin?: boolean;
        }
    }
}
