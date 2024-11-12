import { Button, Form, Input } from "antd";
import { useRegisterCompanyMutation } from "../api/CompanyApi.ts";
import { CompanyRegistrationDto } from "../dto/CompanyRegistrationDto.ts";
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
        className="flat-button"
      >
        {isLoading ? <LoadingOutlined /> : <span>Register</span>}
      </Button>

      {isSuccess && <p>Company Registration successful!</p>}
      {isError && <p>{errorMessage || "Company Registration failed."}</p>}
    </Form>
  );
}
