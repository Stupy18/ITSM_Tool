import { BugTicketDto } from "../dto/BugTicketDto.ts";
import { apiSlice } from "./ApiSlice.ts";


const baseUrl = "http://localhost:8080";

export const ticketApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTicketsForAssignee: builder.query<BugTicketDto[], number>({ 
      query: (id) => `${baseUrl}/bugticket/${id}`,  // Dynamically insert `id` into the path
    }),
  }),
});


export const { useGetTicketsForAssigneeQuery } = ticketApi;
