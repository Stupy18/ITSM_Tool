import { TinyProjectDto } from "./TinyProjectDto";
import { TinyUserDto } from "./TinyUserDto";

export interface BugTicketDto{

    id:number;
    project:TinyProjectDto;
    title:string;
    description:string;
    priority:string;
    status:string;
    createdBy:TinyUserDto;
    assignedTo:TinyUserDto;
    commentsIds: number[];

}