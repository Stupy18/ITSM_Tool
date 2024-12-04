import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProjectDto } from "../../dto/ProjectDto";
import { useGetProjectByIdQuery } from "../../api/ProjectApi.ts";
import { data } from "framer-motion/client";
import api from "../../api/AxiosConfig.ts";
import { BugTicketDto } from "../../dto/BugTicketDto.ts";
import { LocalStorageEnum } from "../../enum/LocalStorageEnum.tsx";
import ProjectDashboardTicketEntry from "../../components/ProjectDashboardTicketEntry/ProjectDashboardTicketEntry.tsx";

export default function ProjectDashboard(){
    const { id } = useParams();
    const [ project, setProject ] = useState<ProjectDto>();
    const [ tickets, setTickets ] = useState<BugTicketDto[]>();

    useEffect(() => {
        const fetchData = async () => {
            const project = await api.get<ProjectDto>(`http://localhost:8080/api/projects/${id}`);
            const tickets = await api.get<BugTicketDto[]>(`http://localhost:8080/bugticket/creator/${localStorage.getItem(LocalStorageEnum.USER_ID)}`);
            setProject(project.data);
            setTickets(tickets.data);
        };
        
    
        fetchData();
      }, [id]);

    if(!project)
        return (<h1>This project does not exist.</h1>);


    return(
    <>
        <h1>Welcome to Cashdoard for { project.projectName }</h1>
        
        <h2>Your Tickets:</h2>
        { tickets ? tickets.map((ticket, i)=>
                ( <ProjectDashboardTicketEntry key={i} ticket={ticket} /> )
        ) : null }

    </>)

}