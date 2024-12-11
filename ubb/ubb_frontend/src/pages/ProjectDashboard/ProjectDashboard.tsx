import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProjectDto } from "../../dto/ProjectDto";
import { useGetProjectByIdQuery } from "../../api/ProjectApi.ts";
import { BugTicketDto } from "../../dto/BugTicketDto.ts";
import { Button, Form, Input, Select, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import './ProjectDashboard.css';
import { AddableTicketDto } from "../../dto/AddableTicketDto.ts";
import { useAddTicketMutation } from "../../api/BugTicketApi.ts";
import api from "../../api/AxiosConfig.ts";
import ProjectDashboardTickets from "../../components/ProjectDashboardTicketEntry/ProjectDashboardTickets.tsx";
import { useLoginGuestMutation } from "../../api/UserApi.ts";
import { LoginResponseDto } from "../../dto/LoginResponseDto.ts";
import { jwtDecode } from "jwt-decode";
import { LocalStorageEnum } from "../../enum/LocalStorageEnum.tsx";

interface FormItems {
  id: number;
  projectId: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  createdById: number;
}

export default function ProjectDashboard() {
  const { projectId, userId } = useParams();
  const [currentProj, setCurrentProj] = useState<ProjectDto>();
  const [addIsVisible, setAddIsVisible] = useState<boolean>(false);
  const [addTicket, { isLoading }] = useAddTicketMutation();
  const [tickets, setTickets] = useState<BugTicketDto[]>([]);
  const [loginGuest, { isError, data }] = useLoginGuestMutation();


  const handleOnSubmit = async (ticket: AddableTicketDto) => {
    try {
      // Add additional properties to the ticket
      ticket.createdById = +userId!;
      ticket.projectId = +projectId!;
      ticket.status = "OPEN";

      console.log("Submitting ticket:", ticket);

      // Call the API to add the ticket
      await addTicket({ request: ticket });
      console.log("Ticket added successfully!");
      setAddIsVisible(false); // Close modal after submission
    } catch (error) {
      console.error("Error adding ticket:", error);
      console.log("Failed to add the ticket. Please try again.");
    }
  };

  useEffect(() => {
    loginGuest({ userId: Number(userId) })
      .unwrap()
      .then((data) => {
          const decoded: LoginResponseDto = jwtDecode(data.jwt);

          localStorage.setItem(LocalStorageEnum.JWT_TOKEN, data.jwt);
          localStorage.setItem(LocalStorageEnum.USER_NAME, String(decoded.user));
          localStorage.setItem(LocalStorageEnum.USER_ID, decoded.sub);
      })
      .catch((error) => console.log(error));

  }, [projectId, userId]);

  useEffect(() =>
  {
    const fetchData = async () => {
      const project = await api.get<ProjectDto>(`http://localhost:8080/api/projects/${Number(projectId)}`);
      const tickets = await api.get<BugTicketDto[]>(`http://localhost:8080/bugticket/creator/${Number(userId)}`);
      setCurrentProj(project.data);
      setTickets(tickets.data);
    };

    fetchData();
}, [addIsVisible]);

if(!currentProj)
    return (<h1>This project does not exist.</h1>);

  const handleOnFail = () => {
    console.error("Form submission failed!");
  };

  const handleOnCancel = () => {
    setAddIsVisible(false); // Close modal on cancel
  };



  return (
    <>
      <h1>
        Welcome to Dashboard for Project {projectId}, {localStorage.getItem(LocalStorageEnum.USER_NAME)}!
      </h1>

      <h2>Your Tickets:</h2>
        
      <ProjectDashboardTickets tickets={tickets} />

      <Button
        onClick={() => setAddIsVisible(true)}
        className={"write-ticket-button"}
      >
        Write a Bug Ticket
      </Button>

      {/* Modal for the Form */}
      <Modal
        title="Submit a Bug Ticket"
        visible={addIsVisible}
        onCancel={handleOnCancel}
        footer={null} // Remove default footer buttons
      >
        <Form
          name="bugTicket"
          layout="vertical"
          onFinish={handleOnSubmit}
          onFinishFailed={handleOnFail}
        >

          {/* Title */}
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter the title!" }]}
          >
            <Input />
          </Form.Item>

          {/* Description */}
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter the description!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          {/* Priority */}
          <Form.Item
            name="priority"
            label="Priority"
            rules={[
              { required: true, message: "Please select the priority!" },
            ]}
          >
            <Select>
              <Select.Option value="Low">Low</Select.Option>
              <Select.Option value="Medium">Medium</Select.Option>
              <Select.Option value="High">High</Select.Option>
            </Select>
          </Form.Item>

          {/* Buttons */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
