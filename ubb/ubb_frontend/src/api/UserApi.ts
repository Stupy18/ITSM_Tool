
// @ts-ignore
import { JwtLoginDto } from "../dto/JwtLoginDto.ts";
import { LoginRequestDto } from "../dto/LoginRequestDto";
import { LoginResponseDto } from "../dto/LoginResponseDto";
// @ts-ignore
import { UserRegistrationDto } from "../dto/UserRegistrationDto.ts";
// @ts-ignore
import { apiSlice } from "./ApiSlice.ts";
import {UserDto} from "../dto/UserDto";

const baseUrl = "http://localhost:8080";
export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<JwtLoginDto, { userRequest: LoginRequestDto }>({  //this "userRequest" is the request body of the mutation (query)
      query: ({ userRequest }) => ({                                      //while the JwtLoginDto will store our response
        url: `${baseUrl}/login`,
        method: "POST",
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

    getUserById: builder.query<UserDto, { id: number }>({
      query: ({ id }) => ({
        url: `${baseUrl}/api/users/${id}`,
        method: "GET",
      }),
    }),

    // updateUser: builder.mutation<void, { id: number; userRequest: UserDto }>({
    updateUser: builder.mutation<void, UserDto>({
        query: ({ id, ...userDto }) => ({
        url: `${baseUrl}/api/users/${id}`,
        method: "PUT",
        body: userDto,
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
    useGetUserByIdQuery,
    useUpdateUserMutation
     } = userApi;
