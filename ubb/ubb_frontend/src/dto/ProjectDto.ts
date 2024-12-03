export interface ProjectDto{
    projectName:string;
    startDate: Date;
    endDate: Date;
    userIds: number[];
    bugTicketIds: number[];
}