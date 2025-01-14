import React, { useEffect, useState } from 'react';
import './Projects.css'
import {
  LoadingOutlined
} from "@ant-design/icons";
import { ProjectDto } from '../../dto/ProjectDto';
import { ShowableProjectDto } from '../../dto/ShowableProjectDto';
import { useGetAllProjectsQuery } from '../../api/ProjectApi.ts';
import { useNavigate } from 'react-router-dom';




const ProjectList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [projects,setProjects] = useState<ShowableProjectDto[]>([]);

  const navigate = useNavigate();
  const { data: projectData } = useGetAllProjectsQuery();



  useEffect(() => {
    if (projectData) {
      const updatedProjects = projectData.map((project: ShowableProjectDto, index: number) => ({
        ...project,
        id: index + 1,
      }));
      setProjects(updatedProjects);
      setLoading(false);
    }
  }, [projectData]);



  if (loading) {
    return <div className="projects-wrapper"><LoadingOutlined className='loading'/></div>;
  }

  if (projects.length === 0) {
    return <div className="projects-wrapper"><p>No projects found.</p></div>;
  }

  return (
      <div className="projects-wrapper">
        <h1 style={{textAlign: 'center'}}>Project List</h1>
        <ul className='projects-container'>
          {projects.map((project) => (
                <li key={project.id} className="project-card">
                <h2>{project.projectName}</h2>
                <p>
                  <strong>Start Date: </strong> {project.startDate}
                </p>
                <p>
                  <strong>End Date: </strong> {project.endDate}
                </p>
                <p>
                  <strong>User IDs: </strong> {project.userIds.join(', ')}
                </p>
                <p>
                  <strong>Bug Ticket IDs: </strong> {project.bugTicketIds.join(', ')}
                </p>
                
                </li>
          ))}
        </ul>
      </div>
  );
};

export default ProjectList;

function useGetAllQuery(): { data: any; } {
  throw new Error('Function not implemented.');
}
