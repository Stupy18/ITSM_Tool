import { ProjectDto } from "../dto/ProjectDto.ts";
import { apiSlice } from "./ApiSlice.ts";

const baseUrl = "http://localhost:8080/api/projects";
export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
        getProjectById: builder.query<ProjectDto, string>({         
      query: (id) => `${baseUrl}/${id}`,
    }),
})})

export const {
    useGetProjectByIdQuery
} = projectApi;