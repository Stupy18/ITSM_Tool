import React, { useEffect, useState } from 'react';
import './Projects.css'
import {
  LoadingOutlined
} from "@ant-design/icons";

interface Project {
  id: number;
  name: string;
  developers: string[];
  startDate: string;
  endDate: string;
  details: string;
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const dummyProjects: Project[] = [
        {
          id: 1,
          name: 'ITSM Tool',
          developers: ['Alice', 'Bob'],
          startDate: '2023-10-01',
          endDate: '2023-12-01',
          details: 'used react, python. can do a lot of stuff. this is a mock project, add more in db'
        },
        {
          id: 2,
          name: 'Bug Tracker',
          developers: ['Charlie', 'David'],
          startDate: '2023-11-01',
          endDate: '2024-01-01',
          details: 'used vue, spring, can do even more. this is a mock project, add more in db'
        },
      ];
      setTimeout(() => {
        setProjects(dummyProjects);
        setLoading(false);
      }, 1500);
    };

    fetchProjects();
  }, []);

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
                <h2>{project.name}</h2>
                <p>
                  <strong>Developers: </strong> {project.developers.join(', ')}
                </p>
                <p>
                  <strong>Start Date: </strong> {project.startDate}
                </p>
                <p>
                  <strong>End Date: </strong> {project.endDate}
                </p>
                <p>
                  <strong>Details: </strong> {project.details}
                </p>
                <button> View more</button>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default ProjectList;