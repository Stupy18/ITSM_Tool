import React from "react";
import { BugTicketDto } from "../../dto/BugTicketDto";


function ProjectDashboardTicketEntry({ticket}: {ticket : BugTicketDto}) 
{
    return (
        <>

            <table>
                <tbody>
                    <tr>
                        <td>
                            { ticket.id }
                        </td>
                        <td>
                            { ticket.title }
                        </td>
                        <td>
                            { ticket.priority }
                        </td>
                    </tr>
                </tbody>
            </table>

        </>
    );
}

export default ProjectDashboardTicketEntry;