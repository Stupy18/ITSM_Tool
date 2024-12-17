import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProjectDto } from "../../dto/ProjectDto";
import { useGetProjectByIdQuery } from "../../api/ProjectApi.ts";
import { BugTicketDto } from "../../dto/BugTicketDto.ts";
import { Button, Form, Input, Select, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import "./ProjectDashboard.css";
import { AddableTicketDto } from "../../dto/AddableTicketDto.ts";
import {
  useAddTicketMutation,
  useGetTicketsByCreatorQuery,
} from "../../api/BugTicketApi.ts";
import ProjectDashboardTickets from "../../components/ProjectDashboardTicketEntry/ProjectDashboardTickets.tsx";
import { useLoginGuestMutation } from "../../api/UserApi.ts";
import { LoginResponseDto } from "../../dto/LoginResponseDto.ts";
import { jwtDecode } from "jwt-decode";
import { LocalStorageEnum } from "../../enum/LocalStorageEnum.tsx";
import FileUpload from "../../components/ProjectFiles/FileUpload.tsx";
import FileList from "../../components/ProjectFiles/FileList.tsx";

// interface FormItems {
//   id: number;
//   projectId: number;
//   title: string;
//   description: string;
//   priority: string;
//   status: string;
//   createdById: number;
// }

export default function ProjectDashboard() {
  const { projectId, userId } = useParams() as any as {
    projectId: Number;
    userId: Number;
  };
  const [loginGuest] = useLoginGuestMutation();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [currentProj, setCurrentProj] = useState<ProjectDto>();
  const [addIsVisible, setAddIsVisible] = useState<boolean>(false);
  const [addTicket, { isLoading }] = useAddTicketMutation();

  // fetch data from backend, only run when user is logged in
  const { data: ticketData } = useGetTicketsByCreatorQuery(Number(userId), {
    skip: !loggedIn,
  });
  const { data: projectData } = useGetProjectByIdQuery(String(projectId), {
    skip: !loggedIn,
  });

  // set project when it's retrieved
  useEffect(() => {
    if (projectData) setCurrentProj(projectData);
  }, [projectData]);

  useEffect(() => {
    // spring security ii prost si iti da jwt token expired daca ai unu chiar daca /login/guest ii permitAll asa ca stergem tot
    localStorage.removeItem(LocalStorageEnum.JWT_TOKEN);
    localStorage.removeItem(LocalStorageEnum.USER_NAME);
    localStorage.removeItem(LocalStorageEnum.USER_ID);

    // log user in as guest
    loginGuest({ userId: Number(userId) })
      .unwrap()
      .then((data) => {
        const decoded: LoginResponseDto = jwtDecode(data.jwt);

        localStorage.setItem(LocalStorageEnum.JWT_TOKEN, data.jwt);
        localStorage.setItem(LocalStorageEnum.USER_NAME, String(decoded.user));
        localStorage.setItem(LocalStorageEnum.USER_ID, decoded.sub);

        setLoggedIn(true);
      })
      .catch((error) => console.log(error));
  }, [userId, loginGuest]);

  // form button handlers
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

  const handleOnFail = () => {
    console.error("Form submission failed!");
  };

  const handleOnCancel = () => {
    setAddIsVisible(false); // Close modal on cancel
  };

  return (
    <>
      <h1>
        Welcome to Dashboard for Project {String(projectId)},{" "}
        {localStorage.getItem(LocalStorageEnum.USER_NAME)}!
      </h1>

      <h2>Your Tickets:</h2>

      {loggedIn ? (
        <>
          {ticketData ? (
            <ProjectDashboardTickets tickets={ticketData as BugTicketDto[]} />
          ) : (
            <p> Loading Tickets...</p>
          )}
          <Button
            onClick={() => setAddIsVisible(true)}
            className={"write-ticket-button"}
          >
            Write a Bug Ticket
          </Button>
        </>
      ) : (
        <p>Logging In...</p>
      )}

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
            rules={[{ required: true, message: "Please select the priority!" }]}
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

      <h2 className="project-files-h2">Project Files</h2>

      <div className="upload-section">
        <FileUpload projectId={Number(projectId)} userId={Number(userId)} />
      </div>

      <div className="files-section-container">
        <FileList projectId={Number(projectId)} />
      </div>
    </>
  );
}
