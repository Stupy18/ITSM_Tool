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
        url: `${baseUrl}/${assigneeId}`, // Updated endpoint path to better reflect intent
        method: "GET"
    })}),
    addTicket: builder.mutation<void, { request: AddableTicketDto }>({
      query: ({ request }) => ({
        url: `${baseUrl}/add`,
        method: "POST",
        body: request,
      }),
    }),


    getTicketsByCreator: builder.query<BugTicketDto[], number>({
      query: (creatorId) => ({
        url: `${baseUrl}/creator/${creatorId}`, // Updated endpoint path to better reflect intent
        method: "GET"
    })}),
  }),
});


export const { useGetTicketsForAssigneeQuery, useAddTicketMutation, useGetTicketsByCreatorQuery } = ticketApi;
