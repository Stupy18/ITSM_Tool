import { Button, Form, Input } from "antd";
import { useRegisterCompanyMutation } from "../../api/CompanyApi.ts";
import { CompanyRegistrationDto } from "../../dto/CompanyRegistrationDto.ts";
import React from "react";
import { ApartmentOutlined, LoadingOutlined } from "@ant-design/icons";

interface RegistrationFormItems {
  companyName: string;
}

export default function Register() {
  const [form] = Form.useForm();
  const [registerCompany, { isError, isLoading, isSuccess, error }] = useRegisterCompanyMutation();

  const handleOnSubmit = (formItems: RegistrationFormItems) => {
    const company: CompanyRegistrationDto = {
      companyName: formItems.companyName,
    };

    registerCompany({ request: company })
      .unwrap()
      .catch((error) => console.log("Company Registration failed:", error));
  };

  const errorMessage = error && 'data' in error && error.data != null && (error.data as { message?: string }).message;

  return (
    <div className="regiser-root">

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
      <Form.Item label="Company Name" name="companyName" 
       rules={[{ required: true, message: "You must specify a company name!" }]}>
        <Input prefix={<ApartmentOutlined/>} className="form-input" />
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

      {isSuccess && <p>Company Registration successful!</p>}
      {isError && <p>{errorMessage || "Company Registration failed."}</p>}
    </Form>

    </div>
    </div>
  );
}
