// @ts-ignore
import React, { useState, useEffect, useMemo } from 'react';
import './BugTicketPage.css';
import { useParams } from 'react-router-dom';



interface BugTicket {
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    createdBy?: { name: string };
    assignedTo?: { name: string };
}

interface Project {
    projectName: string;
}

interface BugTicketsPageProps {
    projectId: number;
}

const PRIORITY_OPTIONS = ['All', 'High', 'Medium', 'Low'];
const STATUS_OPTIONS = ['All', 'Open', 'In Progress', 'Resolved', 'Closed'];
const SORT_OPTIONS = [
    { value: 'title_asc', label: 'Title (A-Z)' },
    { value: 'title_desc', label: 'Title (Z-A)' },
    { value: 'priority_asc', label: 'Priority (Low-High)' },
    { value: 'priority_desc', label: 'Priority (High-Low)' },
    { value: 'status', label: 'Status' },
];

const priorityWeight = {
    'high': 3,
    'medium': 2,
    'low': 1
};

const BugTicketsPage: React.FC = () => {
    const { projectId } = useParams();
    const [tickets, setTickets] = useState<BugTicket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [project, setProject] = useState<Project | null>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortBy, setSortBy] = useState('title_asc');

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Current projectId:', projectId);

                // Fetch project details
                const projectResponse = await fetch(`http://localhost:8080/api/project/${projectId}`);
                console.log('Project response status:', projectResponse.status); // Add this
                if (!projectResponse.ok) {
                    throw new Error(`Project HTTP error! status: ${projectResponse.status}`);
                }
                const projectData = await projectResponse.json();
                console.log('Project data:', projectData); // Add this
                setProject(projectData);

                // Fetch tickets
                const ticketsResponse = await fetch(`http://localhost:8080/bugticket/project/${projectId}`);
                console.log('Tickets response status:', ticketsResponse.status); // Add this
                if (!ticketsResponse.ok) {
                    throw new Error(`Tickets HTTP error! status: ${ticketsResponse.status}`);
                }
                const ticketsData = await ticketsResponse.json();
                console.log('Tickets data:', ticketsData); // Add this
                setTickets(ticketsData);
                setLoading(false);
            } catch (err) {
                console.error('Error details:', err);
                setError(`Failed to load data: ${err.message}`);
                setLoading(false);
            }
        };

        if (projectId) {
            fetchData();
        }
    }, [projectId]);

    const filteredAndSortedTickets = useMemo(() => {
        return tickets
            .filter(ticket => {
                const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesPriority = priorityFilter === 'All' || ticket.priority.toLowerCase() === priorityFilter.toLowerCase();
                const matchesStatus = statusFilter === 'All' || ticket.status.toLowerCase() === statusFilter.toLowerCase();

                return matchesSearch && matchesPriority && matchesStatus;
            })
            .sort((a, b) => {
                switch (sortBy) {
                    case 'title_asc':
                        return a.title.localeCompare(b.title);
                    case 'title_desc':
                        return b.title.localeCompare(a.title);
                    case 'priority_asc':
                        return priorityWeight[a.priority.toLowerCase()] - priorityWeight[b.priority.toLowerCase()];
                    case 'priority_desc':
                        return priorityWeight[b.priority.toLowerCase()] - priorityWeight[a.priority.toLowerCase()];
                    case 'status':
                        return a.status.localeCompare(b.status);
                    default:
                        return 0;
                }
            });
    }, [tickets, searchQuery, priorityFilter, statusFilter, sortBy]);

    if (loading) return <div className="loading-container">Loading...</div>;
    if (error) return <div className="error-container">{error}</div>;

    return (
        <div className="bug-tickets-page">
            <div className="page-header">
                <h1 className="page-title">
                    {project?.projectName || 'Project'} Bug Tickets
                </h1>

                <div className="filters-section">
                    <div className="filters-container">
                        <input
                            type="text"
                            placeholder="Search tickets..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />

                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="filter-select"
                        >
                            {PRIORITY_OPTIONS.map(priority => (
                                <option key={priority} value={priority}>
                                    {priority}
                                </option>
                            ))}
                        </select>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="filter-select"
                        >
                            {STATUS_OPTIONS.map(status => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="filter-select"
                        >
                            {SORT_OPTIONS.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="tickets-grid">
                {filteredAndSortedTickets.map((ticket) => (
                    <div key={ticket.id} className="ticket-card">
                        <div className="ticket-header">
                            <div className="ticket-title">
                                {ticket.title}
                            </div>
                            <div className="ticket-badges">
                <span className={`badge priority-${ticket.priority.toLowerCase()}`}>
                  {ticket.priority}
                </span>
                                <span className={`badge status-${ticket.status.toLowerCase().replace(' ', '-')}`}>
                  {ticket.status}
                </span>
                            </div>
                        </div>
                        <div className="ticket-content">
                            <p className="ticket-description">{ticket.description}</p>
                            <div className="ticket-meta">
                                <div>
                                    Created by: {ticket.createdBy?.name || 'Unknown'}
                                </div>
                                <div>
                                    Assigned to: {ticket.assignedTo?.name || 'Unassigned'}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {filteredAndSortedTickets.length === 0 && (
                    <div className="no-tickets-message">
                        No bug tickets found matching your filters
                    </div>
                )}
            </div>
        </div>
    );
};

export default BugTicketsPage;