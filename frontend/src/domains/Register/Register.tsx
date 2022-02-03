import React from "react";
import { Form, Button, Input, message, Modal, Space } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { RegisterFormSubmitValues } from "../../types/domains/Register";
import { requestAuthRegister } from "../../hooks/auth";
import { useHistory } from "react-router-dom";

const DomainRegister: React.FC = () => {
  const history = useHistory();

  const handleSubmitForm = async (values: RegisterFormSubmitValues) => {
    try {
      const { email, password, name, surname } = values;
      const data = await requestAuthRegister(email, password, name, surname);
      console.log(data);

      message.success("Register success");
      return history.push("/login");
    } catch (error: any) {
      const code = error.code ?? "";
      message.error(`${error.message} ${code ? ` (${code})` : ""}`);
    }
  };

  const [visible, setVisible] = React.useState(true);
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <Modal
      title="สมัครสมาชิก"
      visible={visible}
      footer={null}
      onCancel={handleCancel}
      className="modal"
    >
      <div>
        <Form
          name="formRegister"
          className="formRegister"
          layout="vertical"
          onFinish={handleSubmitForm}
        >
          <Space>
            <Form.Item
              label="ชื่อ"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your Name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Name"
                className="form-input"
              />
            </Form.Item>
            <div style={{ width: "30px" }}></div>
            <Form.Item
              label="นามสกุล"
              name="surname"
              rules={[
                {
                  required: true,
                  message: "Please input your Surname!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Surname"
              />
            </Form.Item>
          </Space>

          <Form.Item
            label="อีเมล"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              className="form-input"
            />
          </Form.Item>
          <Form.Item
            label="รหัสผ่าน"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              className="form-input"
            />
          </Form.Item>
          <Form.Item
            label="ยืนยันรหัสผ่าน"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
              className="form-input"
            />
          </Form.Item>
          <Form.Item>
            <Space direction="vertical">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                สมัครสมาชิก
              </Button>
              <Space className="modal-footer">
                มีบัญชีแล้ว
                <a className="text-register" href="/login">
                  เข้าสู่ระบบ
                </a>
              </Space>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
export default DomainRegister;
