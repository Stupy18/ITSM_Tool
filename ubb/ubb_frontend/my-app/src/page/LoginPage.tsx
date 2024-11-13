import { useState } from "react";
import { LocalStorageEnum } from "../enum/LocalStorageEnum.tsx";
import {  Button, Form, Input,  } from "antd";
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
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


interface FormItemIndexes {
    email: string;
    password: string;
  }

export default function Login() {
    const [form] = Form.useForm();
    const [user, setUser] = useState<LoginResponseDto>();
    const [loginUser, { isError, data, isLoading }] = useLoginMutation();
    const navigate = useNavigate();

    const handleOnSubmit = (formItems: FormItemIndexes) => {
        const user: LoginRequestDto = {
          email: formItems.email,
          password: formItems.password,
        };

        loginUser({ userRequest: user })
          .unwrap()
          .then((data) => {
            const decoded : LoginResponseDto = jwtDecode(data.jwt);
            localStorage.setItem(LocalStorageEnum.USER_NAME, JSON.stringify(decoded.user));
            localStorage.setItem(LocalStorageEnum.USER_ID, JSON.stringify(decoded.id));
            navigate("/logged");

            
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


