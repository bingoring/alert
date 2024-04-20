export interface CpuType {
    avgLoad: number;
    currentLoad: number;
    currentLoadUser: number;
    currentLoadSystem: number;
    currentLoadNice: number;
    currentLoadIdle: number;
    currentLoadIrq: number;
    currentLoadSteal: number;
    currentLoadGuest: number;
    rawCurrentLoad: number;
    rawCurrentLoadUser: number;
    rawCurrentLoadSystem: number;
    rawCurrentLoadNice: number;
    rawCurrentLoadIdle: number;
    rawCurrentLoadIrq: number;
    rawCurrentLoadSteal: number;
    rawCurrentLoadGuest: number;
    cpus: CurrentLoadCpuData[];
}

interface CurrentLoadCpuData {
    load: number;
    loadUser: number;
    loadSystem: number;
    loadNice: number;
    loadIdle: number;
    loadIrq: number;
    loadSteal: number;
    loadGuest: number;
    rawLoad: number;
    rawLoadUser: number;
    rawLoadSystem: number;
    rawLoadNice: number;
    rawLoadIdle: number;
    rawLoadIrq: number;
    rawLoadSteal: number;
    rawLoadGuest: number;
}
