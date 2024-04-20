export interface MemoryType {
    total: number;
    free: number;
    used: number;
    active: number;
    available: number;
    buffcache: number;
    buffers: number;
    cached: number;
    slab: number;
    swaptotal: number;
    swapused: number;
    swapfree: number;
    writeback: number | null;
    dirty: number | null;
}
