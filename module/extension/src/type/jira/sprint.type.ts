export interface SprintType {
    id: number;
    self: string;
    state: 'active' | 'future' | 'closed';
    name: string;
    startDate: string;
    endDate: string;
    activatedDate?: string;
    originBoardId: number;
    goal: string;
}
