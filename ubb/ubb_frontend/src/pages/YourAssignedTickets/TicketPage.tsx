import React, { useEffect, useState } from 'react';
import { Table, Typography, Layout, Spin } from 'antd';
import './TicketPage.css'; // Add styling for consistency
import { BugTicketDto } from '../../dto/BugTicketDto';
import { useGetTicketsForAssigneeQuery } from '../../api/BugTicketApi.ts';
import { LocalStorageEnum } from '../../enum/LocalStorageEnum.tsx';

const { Title } = Typography;
const { Content } = Layout;

export default function TicketPage() {
const [currentUserId, setCurrentUserId] = useState<number>();
  const [assignedTickets, setAssignedTickets] = useState<BugTicketDto[] | undefined>();

  // Set the current user ID from localStorage
  useEffect(() => {
    const userId = parseInt(localStorage.getItem(LocalStorageEnum.USER_ID)!);
    setCurrentUserId(userId);
  }, []);

  // Fetch tickets for the current user using RTK Query
  const { data: tickets, error, isLoading } = useGetTicketsForAssigneeQuery(currentUserId!, {
    skip: !currentUserId,
  });

  useEffect(() => {
    setAssignedTickets(tickets);
  }, [tickets]);
  

    // Define table columns
    const columns = [
        {
          title: 'Ticket ID',
          dataIndex: 'id',
          key: 'id',
          align: 'center' as 'center', // Type assertion to match AlignType
        },
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (status: string) => (
            <span style={{ color: status === 'Open' ? 'green' : 'red' }}>{status}</span>
          ),
        },
        {
          title: 'Priority',
          dataIndex: 'priority',
          key: 'priority',
          align: 'center' as 'center', // Use type assertion
        },
        {
            title: 'Project',
            dataIndex: ['project', 'projectName'], // Access the nested "name" field from "project"
            key: 'project',
          },
          {
            title: 'Created By',
            dataIndex: ['createdBy', 'name'], // Access the nested "name" field from "createdBy"
            key: 'createdBy',
          },
          {
            title: 'Assigned To',
            dataIndex: ['assignedTo', 'name'], // Access the nested "name" field from "assignedTo"
            key: 'assignedTo',
          },
      ];
      
  
    return (
      <Layout style={{ minHeight: '100vh', background: '#f6f9fc' }}>
        <Content style={{ margin: '2rem auto', maxWidth: '800px', padding: '2rem', background: '#fff', borderRadius: '8px' }}>
          <Title level={3} style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Assigned Tickets
          </Title>
  
          {isLoading ? (
            <div style={{ textAlign: 'center' }}>
              <Spin size="large" />
            </div>
          ) : error ? (
            <Typography.Text type="danger" style={{ textAlign: 'center', display: 'block' }}>
              Failed to load tickets.
            </Typography.Text>
          ) : (
            <Table
              dataSource={assignedTickets}
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 5 }}
              bordered
            />
          )}
        </Content>
      </Layout>
    );
  }