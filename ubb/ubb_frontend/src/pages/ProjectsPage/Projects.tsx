import React, { useEffect, useState } from 'react';
import './Projects.css'
import {
  LoadingOutlined
} from "@ant-design/icons";
import { useGetProjectByIdQuery } from './../../api/ProjectApi';
import { ProjectDto } from '../../dto/ProjectDto';

// interface Project {
//   id: number;
//   name: string;
//   developers: string[];
//   startDate: string;
//   endDate: string;
//   documents: Document[];
//   details: string;
// }

interface PopupProps {
  project: ProjectDto;
  onClose: () => void;
}

interface Document {
  id: number;
  name: string;
  url: string;
  type: "pdf" | "image" | "text";
}

const ProjectList: React.FC = () => {
  // const [projects, setProjects] = useState<Project[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [selectedProject, setSelectedProject] = useState(null);

  // const handleViewMore = (project: any) => {
  //   setSelectedProject(project);
  // };

  // const handleClosePopup = () => {
  //   setSelectedProject(null);
  // };

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     setLoading(true);
  //     const dummyProjects: Project[] = [
  //       {
  //         id: 1,
  //         name: 'ITSM Tool',
  //         developers: ['Alice', 'Bob'],
  //         startDate: '2023-10-01',
  //         endDate: '2023-12-01',
  //         documents: [
  //           { id: 1, name: "Overview.pdf", url: "/documents/overview.pdf", type: "pdf" },
  //           { id: 2, name: "Diagram.jpg", url: "/documents/diagram.jpg", type: "image" },
  //           { id: 3, name: "Notes.txt", url: "/documents/notes.txt", type: "text" },
  //         ],
  //         details: 'used react, python. can do a lot of stuff. this is a mock project, add more in db'
  //       },
  //       {
  //         id: 2,
  //         name: 'Bug Tracker',
  //         developers: ['Charlie', 'David'],
  //         startDate: '2023-11-01',
  //         endDate: '2024-01-01',
  //         documents: [],
  //         details: 'used vue, spring, can do even more. this is a mock project, add more in db'
  //       },
  //     ];
  //     setTimeout(() => {
  //       setProjects(dummyProjects);
  //       setLoading(false);
  //     }, 1000);
  //   };

  //   fetchProjects();
  // }, []);

  // if (loading) {
  //   return <div className="projects-wrapper"><LoadingOutlined className='loading'/></div>;
  // }

  // if (projects.length === 0) {
  //   return <div className="projects-wrapper"><p>No projects found.</p></div>;
  // }

  // Using the RTK Query hook to fetch data
  const { data: projects = [], isLoading, isError } = useGetProjectByIdQuery();

  if (isLoading) {
    return (
      <div className="projects-wrapper">
        <LoadingOutlined className="loading" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="projects-wrapper">
        <p>Failed to load projects. Please try again later.</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="projects-wrapper">
        <p>No projects found.</p>
      </div>
    );
  }

  return (
    <div >
      <h1 style={{textAlign: 'center'}}>Project List</h1>
      <ul className="projects-container">
      {projects.map((project: ProjectDto, index: number) => (
          <li key={index} className="project-card">
          <h2>{project.projectName}</h2>
          <p>
            <strong>Developers: </strong> {project.userIds.join(', ')}
          </p>
          <p>
            <strong>Start Date: </strong> {new Date(project.startDate).toLocaleDateString()}
          </p>
          <p>
            <strong>End Date: </strong> {new Date(project.endDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Bug Ticket IDs: </strong> {project.bugTicketIds.join(', ')}
          </p>
          <button>View more</button>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
