/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-empty-interface */
import 'multer';
import type { SessionAllType } from '../type/session.type';

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
