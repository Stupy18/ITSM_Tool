import { ProjectDto } from "../dto/ProjectDto.ts";
import { ShowableProjectDto } from "../dto/ShowableProjectDto.ts";
import { apiSlice } from "./ApiSlice.ts";

const baseUrl = "http://localhost:8080/api/projects";
export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
        getProjectById: builder.query<ProjectDto, string>({         
      query: (id) => `${baseUrl}/${id}`,
    }),
    getAllProjects: builder.query<ShowableProjectDto[], void>({         
      query: () => `${baseUrl}`,
    }),
})})

export const {
    useGetProjectByIdQuery,
    useGetAllProjectsQuery,
} = projectApi;