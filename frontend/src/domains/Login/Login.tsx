import React, { useContext } from "react";
import { Form, Button, Input, message, Modal, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { requestAuthLogin } from "../../hooks/auth";
import UserContext from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { RegisterFormSubmitValues } from "../../types/domains/Register";

export const DomainLogin: React.FC = () => {
  const history = useHistory();
  const { setIsLoggedIn, setUser, setAccessToken } = useContext(UserContext);

  const handleSubmitForm = async (values: RegisterFormSubmitValues) => {
    try {
      const { email, password } = values;
      const data = await requestAuthLogin(email, password);
      setAccessToken(data.accessToken);
      setUser(data);
      setIsLoggedIn(true);
      console.log(data);

      message.success("Login Success");
      return history.push("/");
    } catch (error: any) {
      setAccessToken("");
      setUser({});
      setIsLoggedIn(false);
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
      title="เข้าสู่ระบบ"
      visible={visible}
      footer={null}
      onCancel={handleCancel}
      className="modal"
    >
      <div>
        <Form
          name="formLogin"
          className="formLogin"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={handleSubmitForm}
        >
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
              className="form-input"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
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
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
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
                เข้าสู่ระบบ
              </Button>
              <Space className="modal-footer">
                ยังไม่มีบัญชี
                <a className="text-register" href="/register">
                  สมัครสมาชิก
                </a>
              </Space>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
export default DomainLogin;
