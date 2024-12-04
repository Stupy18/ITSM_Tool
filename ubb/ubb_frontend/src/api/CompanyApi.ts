
import { CompanyRegistrationDto } from "../dto/CompanyRegistrationDto.ts";
import { apiSlice } from "./ApiSlice.ts";

const baseUrl = "http://localhost:8080/company";
export const companyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    registerCompany: builder.mutation<void, { request: CompanyRegistrationDto }>({
      query: ({ request }) => ({
        url: `${baseUrl}/register`,
        method: "POST",
        body: request,
      }),
    }),
  }),
});

export const { 
    useRegisterCompanyMutation,
    } = companyApi;
