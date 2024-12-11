import React, { useState } from "react";
import { BugTicketDto } from "../../dto/BugTicketDto";
import './ProjectDashboardTickets.css';
import { Modal } from "antd";

function ProjectDashboardTickets({tickets}: {tickets : BugTicketDto[]}) 
{
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<BugTicketDto | null>(null);

    const handleRowClick = (ticket: BugTicketDto) => {
        setSelectedTicket(ticket);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedTicket(null);
    };


    return (
        <>
            <table className="table-container">
                <thead>
                    <tr>
                        <td>
                            ID
                        </td>
                        <td>
                            Title
                        </td>
                        <td>
                            Description
                        </td>
                        <td>
                            Priority
                        </td>
                        <td>
                            Status
                        </td>
                        <td>
                            Assigned To
                        </td>
                    </tr>
                </thead>
                <tbody>
                { tickets ? tickets.map((ticket, i)=>
                    <tr key={i} onClick={() => handleRowClick(ticket)} style={{ cursor: "pointer" }}>
                        <td>
                            { ticket.id }
                        </td>
                        <td>
                            { ticket.title }
                        </td>
                        <td>
                            { ticket.description }
                        </td>
                        <td>
                            { ticket.priority }
                        </td>
                        <td>
                            { ticket.status }
                        </td>
                        <td>
                            { ticket.assignedTo?ticket.assignedTo.name:"None" }
                        </td>
                    </tr>
                ) : null }
                    
                </tbody>
            </table>
            
             <Modal
                title={`Ticket Details: ${selectedTicket?.title || ""}`}
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
            >
                {selectedTicket && (
                    <div>
                        <p><strong>ID:</strong> {selectedTicket.id}</p>
                        <p><strong>Project:</strong> {selectedTicket.project.projectName}</p>
                        <p><strong>Title:</strong> {selectedTicket.title}</p>
                        <p><strong>Description:</strong> {selectedTicket.description}</p>
                        <p><strong>Priority:</strong> {selectedTicket.priority}</p>
                        <p><strong>Status:</strong> {selectedTicket.status}</p>
                        <p><strong>Created By:</strong> {selectedTicket.createdBy.name}</p>
                        <p><strong>Assigned To:</strong> {selectedTicket.assignedTo ? selectedTicket.assignedTo.name : "None"}</p>
                    </div>
                )}
            </Modal>

        </>
    );
}

export default ProjectDashboardTickets;