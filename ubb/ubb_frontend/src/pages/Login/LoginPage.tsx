import { useState } from "react";
import { LocalStorageEnum } from "../../enum/LocalStorageEnum.tsx";
import {  Button, Form, Input,  } from "antd";
import { useLoginMutation } from "../../api/UserApi.ts";
import { LoginResponseDto } from "../../dto/LoginResponseDto.ts";
import { LoginRequestDto } from "../../dto/LoginRequestDto.ts";
import {
    EyeInvisibleOutlined,
    EyeOutlined,
    LoadingOutlined,
    LockOutlined,
    UserOutlined,
  } from "@ant-design/icons";
import React from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';



interface FormItemIndexes {
    email: string;
    password: string;
  }

export default function Login() {
    const [form] = Form.useForm();
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
                const decoded: LoginResponseDto = jwtDecode(data.jwt);

                console.log('Decoded JWT:', decoded);


                localStorage.setItem(LocalStorageEnum.JWT_TOKEN, data.jwt);
                localStorage.setItem(LocalStorageEnum.USER_NAME, JSON.stringify(decoded.user));
                localStorage.setItem(LocalStorageEnum.USER_ID, decoded.sub);

                localStorage.setItem(LocalStorageEnum.USER_EMAIL, JSON.stringify(decoded.email));

                navigate("/logged");
            })
            .catch((error) => console.log(error));
    };


    return(

        <div className="login-root">

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

          <h1 className="title">Welcome to your ITSM Tool</h1>

          {/* Form Section */}
          <Form
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
          {/* <div className="field-checkbox">
            <input type="checkbox" id="keepLoggedIn" name="keepLoggedIn"/>
            <label>Keep me logged in</label>
          </div> */}

          <Button
            key="submit"
            htmlType="submit"
            form="loginForm"
            type="primary"
            className="login-button"
          >
            {isLoading ? <LoadingOutlined /> : <span>Continue</span>}
          </Button>
          <p>Don't have an account? <a href="/register">Register.</a></p>
        </Form>

        </div>
      </div>
      )

  }