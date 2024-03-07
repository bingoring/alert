import { Session } from 'express-session';

export function setSession<Data extends Record<string, any>>(
    session: Session,
    { data, option }: SetSessionDataParamType<Data>
) {
    Object.assign(session, data);

    if (option?.expired) {
        session.cookie.expires = new Date(Date.now() + option.expired);
    }

    session.save();
}

export function destroySession(session: Session, cb?: () => void) {
    return new Promise<void>((resolve, reject) => {
        session.destroy(() => {
            try {
                if (cb !== undefined) {
                    cb();
                }
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    });
}

interface SetSessionDataParamType<T> {
    data: T;
    option?: {
        expired?: number;
    };
}
