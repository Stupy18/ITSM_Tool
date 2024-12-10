
import { JwtLoginDto } from "../dto/JwtLoginDto.ts";
import { LoginRequestDto } from "../dto/LoginRequestDto";
import { LoginResponseDto } from "../dto/LoginResponseDto";
import { UserRegistrationDto } from "../dto/UserRegistrationDto.ts";
import { apiSlice } from "./ApiSlice.ts";

const baseUrl = "http://localhost:8080";
export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<JwtLoginDto, { userRequest: LoginRequestDto }>({  //this "userRequest" is the request body of the mutation (query)
      query: ({ userRequest }) => ({                                      //while the JwtLoginDto will store our response
        url: `${baseUrl}/login`,
        method: "POST",                //pretty self explanatory
        body: userRequest,
      }),
    }),


    loginGuest: builder.mutation<JwtLoginDto, { userId: Number }>({  //this "userRequest" is the request body of the mutation (query)
      query: ({ userId }) => ({                                      //while the JwtLoginDto will store our response
        url: `${baseUrl}/login/guest/${userId}`,
        method: "POST",                //pretty self explanatory
      }),
    }),


    register: builder.mutation<void, { userRequest: UserRegistrationDto }>({
      query: ({ userRequest }) => ({
        url: `${baseUrl}/register`,
        method: "POST",
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
    useLoginGuestMutation,
    useRegisterMutation,
    //useGetUsersQuery,
     } = userApi;
