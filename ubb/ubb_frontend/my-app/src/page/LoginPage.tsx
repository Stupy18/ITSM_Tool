import { useState } from "react";
import { LocalStorageEnum } from "../enum/LocalStorageEnum.tsx";
import { Alert, Button, Form, Input, Spin } from "antd";
import { useLoginMutation } from "../api/UserApi.ts";
import { LoginResponseDto } from "../dto/LoginResponseDto";
import { LoginRequestDto } from "../dto/LoginRequestDto";
import {
    EyeInvisibleOutlined,
    EyeOutlined,
    LoadingOutlined,
    LockOutlined,
    UserOutlined,
  } from "@ant-design/icons";
import React from "react";


interface FormItemIndexes {
    email: string;
    password: string;
  }

export default function Login() {
    const [form] = Form.useForm();
    const [user, setUser] = useState<LoginResponseDto>();
    const [loginUser, { isError, data, isLoading }] = useLoginMutation();

    const handleOnSubmit = (formItems: FormItemIndexes) => {
        const user: LoginRequestDto = {
          email: formItems.email,
          password: formItems.password,
        };

        loginUser({ userRequest: user })
          .unwrap()
          .then((data) => {
            localStorage.setItem(LocalStorageEnum.USER, JSON.stringify(data));
            
          })
          .catch((error) => console.log(error));



      };

      return(<Form
        id="loginForm"
        layout="vertical"
        form={form}
        onFinish={handleOnSubmit}
        className="login-form"
      >
        <Form.Item label="Email" name="email">
          <Input prefix={<UserOutlined />} className="form-input" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password
            prefix={<LockOutlined />}
            className="form-input"
            iconRender={(visible) =>
              visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Button
          key="submit"
          htmlType="submit"
          form="loginForm"
          type="primary"
          className="flat-button"
        >
          {isLoading ? <LoadingOutlined /> : <span>Login</span>}
        </Button>
      </Form>)





  }
