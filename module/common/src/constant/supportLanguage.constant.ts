export const SupportLanguageMap = {
    korean: 'KOREAN',
    english: 'ENGLISH',
} as const;

export const SupportLanguageList = Object.values(SupportLanguageMap);
export type SupportLanguageType = (typeof SupportLanguageList)[number];
