import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProjectDto } from "../../dto/ProjectDto";
import { useGetProjectByIdQuery } from "../../api/ProjectApi.ts";




export default function ProjectDashboard(){
    const { id } = useParams();
    const [currentProj,setCurrentProj] = useState<ProjectDto>();
    const getProjectById = useGetProjectByIdQuery;

    // const { data: users } = useGetProjectByIdQuery(id);


    return(
    <>
        <h1>Welcome to Bashdoard for Project {id}</h1>

    </>)

}