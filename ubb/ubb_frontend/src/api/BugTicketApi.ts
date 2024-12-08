import { AddableTicketDto } from "../dto/AddableTicketDto.ts";
import { BugTicketDto } from "../dto/BugTicketDto.ts";
import { apiSlice } from "./ApiSlice.ts";


const baseUrl = "http://localhost:8080/bugticket";

export const ticketApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTicketsForAssignee: builder.query<BugTicketDto[], number>({ 
      query: (id) => `${baseUrl}/${id}`,  // Dynamically insert `id` into the path
    }),
    addTicket: builder.mutation<void, { request: AddableTicketDto }>({
      query: ({ request }) => ({
        url: `${baseUrl}/add`,
        method: "POST",
        body: request,
      }),
    }),
  }),
});


export const { useGetTicketsForAssigneeQuery, useAddTicketMutation } = ticketApi;
