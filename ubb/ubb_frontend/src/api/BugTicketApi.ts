// @ts-ignore
import { AddableTicketDto } from "../dto/AddableTicketDto.ts";
// @ts-ignore
import { BugTicketDto } from "../dto/BugTicketDto.ts";
// @ts-ignore
import { apiSlice } from "./ApiSlice.ts";


const baseUrl = "http://localhost:8080/bugticket";

export const ticketApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTicketsForAssignee: builder.query<BugTicketDto[], number>({
      query: (assigneeId) => ({
        url: `${baseUrl}/${assigneeId}`,
        method: "GET"
      }),
    }),
    addTicket: builder.mutation<void, { request: AddableTicketDto }>({
      query: ({ request }) => ({
        url: `${baseUrl}/add`,
        method: "POST",
        body: request,
      }),
    }),
    getTicketsByCreator: builder.query<BugTicketDto[], number>({
      query: (creatorId) => ({
        url: `${baseUrl}/creator/${creatorId}`,
        method: "GET",
      }),
    }),

    // AICI e mutația care face update de status
    updateTicketStatus: builder.mutation<BugTicketDto, { ticketId: number; newStatus: string }>({
      query: ({ ticketId, newStatus }) => ({
        url: `${baseUrl}/${ticketId}/status`,
        method: "PUT",
        body: newStatus,
      }),
      // Dacă vrei să refaci automat cache-ul după update, poți folosi invalidatesTags, etc.
    }),
  }),
});

export const {
  useGetTicketsForAssigneeQuery,
  useAddTicketMutation,
  useGetTicketsByCreatorQuery,
  useUpdateTicketStatusMutation,  // <-- Importă mutația
} = ticketApi;

