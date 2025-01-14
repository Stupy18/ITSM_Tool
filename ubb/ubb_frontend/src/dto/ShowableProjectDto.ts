export interface ShowableProjectDto {
    projectName: string;
    startDate: string; // ISO date string
    endDate: string; // ISO date string
    userIds: number[];
    bugTicketIds: number[];
    id: number;
}