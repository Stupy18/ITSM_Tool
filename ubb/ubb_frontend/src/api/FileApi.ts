import { apiSlice } from "./ApiSlice.ts";
import { FileUploadRequestDto } from "../dto/FileUploadRequestDto";
import { FileUploadResponseDto } from "../dto/FileUploadResponseDto";

const baseUrl = "http://localhost:8080/files";

export const fileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<FileUploadResponseDto, FileUploadRequestDto>({
      query: ({ projectId, uploadedBy, file }) => {
        const formData = new FormData();
        formData.append("projectId", projectId.toString());
        formData.append("uploadedBy", uploadedBy.toString());
        formData.append("file", file);

        return {
          url: `${baseUrl}/upload`,
          method: "POST",
          body: formData,
        };
      },
    }),
    fetchFilesByProject: builder.query<FileUploadResponseDto[], number>({
      query: (projectId) => `${baseUrl}/project/${projectId}/files`,
      // Optional: providesTags for cache invalidation
      providesTags: (result, error, projectId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'File' as const, id })),
              { type: 'File', id: 'LIST' },
            ]
          : [{ type: 'File', id: 'LIST' }],
    }),
  }),
});

export const { useUploadFileMutation, useFetchFilesByProjectQuery } = fileApi;
