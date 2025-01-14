import React, { useEffect, useState } from 'react';
import { Button, Layout, Spin, Typography, Card, Row, Col, Tag } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useGetTicketsForAssigneeQuery, useUpdateTicketStatusMutation } from '../../api/BugTicketApi.ts';
import { BugTicketDto } from '../../dto/BugTicketDto.ts';
import { LocalStorageEnum } from "../../enum/LocalStorageEnum.tsx";
import './TicketPage.css';

const TicketPage = () => {
    const [currentUserId, setCurrentUserId] = useState<number>();
    const [assignedTickets, setAssignedTickets] = useState<BugTicketDto[]>();
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

    const renderTicketCard = (ticket: BugTicketDto) => (
        <Col xs={24} sm={24} md={12} lg={8} xl={8} key={ticket.id}>
            <Card
                className="ticket-card"
                title={
                    <div className="card-header">
                        <span className="ticket-id">#{ticket.id}</span>
                        <span className="ticket-title">{ticket.title}</span>
                    </div>
                }
                actions={[
                    <Button
                        type="primary"
                        onClick={() => handleToggleStatus(ticket.id, ticket.status)}
                        className={`status-button ${ticket.status === 'unfinished' ? 'unfinished' : 'finished'}`}
                    >
                        {ticket.status === 'unfinished' ? 'Mark Complete' : 'Mark Incomplete'}
                    </Button>
                ]}
            >
                <div className="card-content">
                    <div className="info-row">
                        <span className="label">Status:</span>
                        <Tag color={ticket.status === 'unfinished' ? 'error' : 'success'}>
                            {ticket.status}
                        </Tag>
                    </div>

                    <div className="info-row">
                        <span className="label">Priority:</span>
                        <Tag color={
                            ticket.priority === 'high' ? 'red' :
                                ticket.priority === 'mid' ? 'orange' : 'green'
                        }>
                            {ticket.priority}
                        </Tag>
                    </div>

                    <div className="info-row">
                        <span className="label">Description:</span>
                        <span className="description">{ticket.description}</span>
                    </div>

                    <div className="info-row">
                        <span className="label">Project:</span>
                        <span>{ticket.project?.projectName}</span>
                    </div>

                    <div className="info-row">
                        <span className="label">Created By:</span>
                        <span>{ticket.createdBy?.name}</span>
                    </div>

                    <div className="info-row">
                        <span className="label">Assigned To:</span>
                        <span>{ticket.assignedTo?.name}</span>
                    </div>
                </div>
            </Card>
        </Col>
    );

    return (
        <Layout className="ticket-layout">
            <Content className="ticket-content">
                <Typography.Title level={3} className="ticket-title">
                    Assigned Tickets
                </Typography.Title>

                {isLoading ? (
                    <div className="loading-container">
                        <Spin size="large" />
                    </div>
                ) : error ? (
                    <Typography.Text type="danger" className="error-text">
                        Failed to load tickets.
                    </Typography.Text>
                ) : (
                    <Row gutter={[16, 16]} className="tickets-grid">
                        {assignedTickets?.map(ticket => renderTicketCard(ticket))}
                    </Row>
                )}
            </Content>
        </Layout>
    );
};

export default TicketPage;