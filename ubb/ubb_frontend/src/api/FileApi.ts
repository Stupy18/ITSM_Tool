import { apiSlice } from "./ApiSlice.ts";
import { FileUploadRequestDto } from "../dto/FileUploadRequestDto";
import { FileUploadResponseDto } from "../dto/FileUploadResponseDto";

const baseUrl = "http://localhost:8080/files";

export const fileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<FileUploadResponseDto, FileUploadRequestDto>({
      query: ({ projectId, file }) => {
        const formData = new FormData();
        formData.append("projectId", projectId.toString());
        formData.append("file", file);

        return {
          url: `${baseUrl}/upload`,
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useUploadFileMutation } = fileApi;
