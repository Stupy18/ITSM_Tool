
import { LoginRequestDto } from "../dto/LoginRequestDto";
import { LoginResponseDto } from "../dto/LoginResponseDto";
import { apiSlice } from "./ApiSlice.ts";

const baseUrl = "http://localhost:8080";
export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseDto, { userRequest: LoginRequestDto }>({  //this "userRequest" is the request body of the mutation (query)
      query: ({ userRequest }) => ({                                      //while the UserDto will store our response
        url: `${baseUrl}/login`,
        method: "POST",                //pretty self explanatory
        body: userRequest,
      }),
    }),

    // getUsers: builder.query<ListUserDto[], void>({         //we'll implement this later
    //   query: () => baseUrl + `/users`,
    // }),
  }),
});

export const { 
    useLoginMutation, 
    //useGetUsersQuery,
     } = userApi;
