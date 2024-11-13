import { Button, Form, Input } from "antd";
import { useRegisterMutation } from "../../api/UserApi.ts";
import { UserRegistrationDto } from "../../dto/UserRegistrationDto.ts";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LoadingOutlined,
  LockOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import './RegistrationPage.css';

interface RegistrationFormItems {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const [form] = Form.useForm();
  const [registerUser, { isError, isLoading, isSuccess, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleOnSubmit = (formItems: RegistrationFormItems) => {
    const newUser: UserRegistrationDto = {
      name: formItems.name,
      email: formItems.email,
      password: formItems.password,
    };

    registerUser({ userRequest: newUser })
      .unwrap()
      .then(()=>{
        // might want to do auto-login
        navigate("/");
      })
      .catch((error) => console.log(error.message));
  };

  const errorMessage = error && 'data' in error && error.data != null && (error.data as { message?: string }).message;

  return (
    
    <div className="register-root">

        {/* Background Section */}
        <div className="box-root flex-flex flex-direction--column" style={{ minHeight: '100vh', flexGrow: 1 }}>
          <div className="loginbackground box-background--white padding-top--64">
            <div className="loginbackground-gridContainer">
              <div className="box-root flex-flex" style={{ gridArea: 'top / start / 8 / end' }}>
                <div
                  className="box-root"
                  style={{
                    backgroundImage: 'linear-gradient(white 0%, rgb(247, 250, 252) 33%)',
                    flexGrow: 1
                  }}
                />
              </div>

              <div className="box-root flex-flex" style={{ gridArea: '4 / 2 / auto / 5' }}>
                <div
                  className="box-root box-divider--light-all-2 animationLeftRight tans3s"
                  style={{ flexGrow: 1 }}
                />
              </div>

              <div className="box-root flex-flex" style={{ gridArea: '6 / start / auto / 2' }}>
                <div className="box-root box-background--blue800" style={{ flexGrow: 1 }} />
              </div>

              <div className="box-root flex-flex" style={{ gridArea: '7 / start / auto / 4' }}>
                <div className="box-root box-background--blue animationLeftRight" style={{ flexGrow: 1 }} />
              </div>

              <div className="box-root flex-flex" style={{ gridArea: '8 / 4 / auto / 6' }}>
                <div
                  className="box-root box-background--gray100 animationLeftRight tans3s"
                  style={{ flexGrow: 1 }}
                />
              </div>

              <div className="box-root flex-flex" style={{ gridArea: '2 / 15 / auto / end' }}>
                <div
                  className="box-root box-background--cyan200 animationRightLeft tans4s"
                  style={{ flexGrow: 1 }}
                />
              </div>

              <div className="box-root flex-flex" style={{ gridArea: '3 / 14 / auto / end' }}>
                <div className="box-root box-background--blue animationRightLeft" style={{ flexGrow: 1 }} />
              </div>

              <div className="box-root flex-flex" style={{ gridArea: '4 / 17 / auto / 20' }}>
                <div
                  className="box-root box-background--gray100 animationRightLeft tans4s"
                  style={{ flexGrow: 1 }}
                />
              </div>

              <div className="box-root flex-flex" style={{ gridArea: '5 / 14 / auto / 17' }}>
                <div
                  className="box-root box-divider--light-all-2 animationRightLeft tans3s"
                  style={{ flexGrow: 1 }}
                />
              </div>
            </div>
          </div>


          <div className="title">
            <h1>Welcome to our app</h1>
          </div>
          
          <Form
            id="registerForm"
            layout="vertical"
            form={form}
            onFinish={handleOnSubmit}
            className="register-form"
          >
            <Form.Item label="Name" name="name" 
            rules={[{ required: true, message: "You must specify a name" }]}>
              <Input prefix={<UserOutlined />} className="form-input" />
            </Form.Item>

            <Form.Item label="Email" name="email"
            rules={[{ required: true, message: "You must specify an e-mail address" }]}>
              <Input prefix={<MailOutlined />} className="form-input" />
            </Form.Item>

            <Form.Item label="Password" name="password"
            rules={[{ required: true, message: "You must specify a password" }]}>
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
              form="registerForm"
              type="primary"
              className="register-button"
            >
              {isLoading ? <LoadingOutlined /> : <span>Register</span>}
            </Button>

            {isSuccess && <p>Registration successful!</p>}
            {isError && <p>{errorMessage || "Registration failed."}</p>}
          </Form>
          </div>
      </div>
    );
  }
