import React, { useEffect, useState } from "react";
import { Button, Layout, Spin, Table, Typography } from "antd";
import { useGetTicketsForAssigneeQuery, useUpdateTicketStatusMutation } from "../../api/BugTicketApi.ts";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import { BugTicketDto } from "../../dto/BugTicketDto";
import { LocalStorageEnum } from "../../enum/LocalStorageEnum.tsx";
import "./TicketPage.css"; // Import custom CSS for styling

export default function TicketPage() {
    const [currentUserId, setCurrentUserId] = useState<number>();
    const [assignedTickets, setAssignedTickets] = useState<BugTicketDto[] | undefined>();

    const [updateTicketStatus] = useUpdateTicketStatusMutation();

    useEffect(() => {
        const userId = localStorage.getItem(LocalStorageEnum.USER_ID)!.replace(/["']/g, "");
        setCurrentUserId(Number(userId));
    }, []);

    const { data: tickets, error, isLoading } = useGetTicketsForAssigneeQuery(currentUserId!, {
        skip: !currentUserId,
    });

    useEffect(() => {
        setAssignedTickets(tickets);
    }, [tickets]);

    const handleToggleStatus = async (ticketId: number, currentStatus: string) => {
        try {
            const newStatus = currentStatus === "unfinished" ? "finished" : "unfinished";
            await updateTicketStatus({ ticketId, newStatus }).unwrap();

            if (assignedTickets) {
                const updated = assignedTickets.map((t) =>
                    t.id === ticketId ? { ...t, status: newStatus } : t
                );
                setAssignedTickets(updated);
            }
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    const columns = [
        { title: "Ticket ID", dataIndex: "id", key: "id", align: "center" as const },
        { title: "Title", dataIndex: "title", key: "title" },
        { title: "Description", dataIndex: "description", key: "description" },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            align: "center" as const,
            render: (status: string) => (
                <span className={status === "unfinished" ? "status-unfinished" : "status-finished"}>
                    {status}
                </span>
            ),
        },
        { title: "Priority", dataIndex: "priority", key: "priority", align: "center" as const },
        { title: "Project", dataIndex: ["project", "projectName"], key: "project" },
        { title: "Created By", dataIndex: ["createdBy", "name"], key: "createdBy" },
        { title: "Assigned To", dataIndex: ["assignedTo", "name"], key: "assignedTo" },
        {
            title: "Action",
            key: "action",
            align: "center" as const,
            render: (_: any, record: BugTicketDto) => (
                <Button
                    type="primary"
                    className="toggle-button"
                    onClick={() => handleToggleStatus(record.id, record.status)}
                >
                    Toggle Status
                </Button>
            ),
        },
    ];

    return (
        <Layout className="ticket-layout">
            <Content className="ticket-content">
                <Title level={3} className="ticket-title">
                    Assigned Tickets
                </Title>
                {isLoading ? (
                    <div className="loading-container">
                        <Spin size="large" />
                    </div>
                ) : error ? (
                    <Typography.Text type="danger" className="error-text">
                        Failed to load tickets.
                    </Typography.Text>
                ) : (
                    <Table
                        dataSource={assignedTickets}
                        columns={columns}
                        rowKey="id"
                        pagination={{ pageSize: 10 }}
                        bordered
                        className="ticket-table"
                    />
                )}
            </Content>
        </Layout>
    );
}
