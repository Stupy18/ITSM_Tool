import React from "react";
import { BugTicketDto } from "../../dto/BugTicketDto";


export default function ProjectDashboardTicketEntry(ticket : BugTicketDto)
{
    return (
        <>

            <table>
                <tr>
                    <td>
                        {ticket.id}
                    </td>
                    <td>
                        {ticket.title}
                    </td>
                    <td>
                        {ticket.priority}
                    </td>
                </tr>
            </table>

        </>
    );
}