import { TransformFnParams } from 'class-transformer';

export function splitQueryString<Dto>(key: keyof Dto) {
    return (property: TransformFnParams) => {
        const target = property.obj[key] as string;
        if (target === undefined) {
            return undefined;
        }

        return (target ?? '')
            .split(',')
            .map((v) => v.trim())
            .filter((v) => v.length > 0);
    };
}

export function versionConvert<Dto>(key: keyof Dto) {
    return (property: TransformFnParams) => {
        const target = property.obj[key] as string;
        if (target.startsWith('v')) {
            return target.substring(1);
        }

        return target;
    };
}

export function getHostFromUrl<Dto>(key1: keyof Dto, key2?: string | undefined) {
    return (property: TransformFnParams) => {
        const target = (() => {
            if (key2 !== undefined) {
                return property.obj[key1][key2] as string;
            }
            return property.obj[key1] as string;
        })();

        if (target === undefined) {
            return undefined;
        }

        const slicedUrl = target.split(':')[1];
        return slicedUrl.replaceAll('//', '');
    };
}

export function getProtocolFromUrl<Dto>(key1: keyof Dto, key2?: string | undefined) {
    return (property: TransformFnParams) => {
        const target = (() => {
            if (key2 !== undefined) {
                return property.obj[key1][key2] as string;
            }
            return property.obj[key1] as string;
        })();

        if (target === undefined) {
            return undefined;
        }

        if (target.includes(':')) {
            return target.split(':')[0];
        }

        return target;
    };
}

export function getPortFromUrl<Dto>(key1: keyof Dto, key2?: string | undefined) {
    return (property: TransformFnParams) => {
        const target = (() => {
            if (key2 !== undefined) {
                return property.obj[key1][key2] as string;
            }
            return property.obj[key1] as string;
        })();

        if (target === undefined || !target.includes(':')) {
            return undefined;
        }

        const slicedUrl = target.split(':')[2];
        if (slicedUrl === undefined) {
            return '';
        }

        if (slicedUrl.includes('/')) {
            return slicedUrl.split('/')[0];
        }

        if (slicedUrl.includes('?')) {
            return slicedUrl.split('?')[0];
        }

        return slicedUrl;
    };
}
