import { CrownFilled, LikeFilled, StarFilled } from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Select,
  Space,
  Typography,
} from "antd";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { requestAddProduct } from "../../hooks/product";
import { AddProductFormSubmitValues } from "../../types/domains/product";
import { LoginResponse } from "../../types/hooks/auth";

const DomainAddProduct: React.FC = () => {
  const history = useHistory();
  const { user, accessToken } = useContext(UserContext);
  const profileHandler = JSON.stringify(user);
  const profile: Omit<LoginResponse, "password"> = JSON.parse(profileHandler);
  const { Option } = Select;
  const { Text } = Typography;

  const handleSubmitForm = async (values: AddProductFormSubmitValues) => {
    try {
      const { name, quality, price } = values;
      console.log(values);
      const owner = profile.id;
      console.log(owner);
      const data = await requestAddProduct(
        name,
        quality,
        price,
        owner,
        accessToken
      );
      console.log(data);

      message.success("Add item success");
      return history.push("/add");
    } catch (error: any) {
      const code = error.code ?? "";
      message.error(`${error.message} ${code ? ` (${code})` : ""}`);
    }
  };

  return (
    <Form name="formAddProduct" layout="vertical" onFinish={handleSubmitForm}>
      <h1>สินค้าและรายละเอียด</h1>
      <Divider />
      <Space direction="vertical">
        <Form.Item
          label="ชื่อสินค้า"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Product Name!",
            },
          ]}
        >
          <Input placeholder="ระบุชื่อสินค้า" />
        </Form.Item>
        <Space>
          <Form.Item
            label="ราคา"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your Product Price!",
              },
            ]}
          >
            <Input placeholder="ระบุราคา" />
          </Form.Item>
          <Form.Item
            label="เลือกสภาพของสินค้า"
            name="quality"
            rules={[
              {
                required: true,
                message: "Please input your Product Quality!",
              },
            ]}
          >
            <Select placeholder="ระบุสภาพสินค้า" optionFilterProp="children">
              <Option value="เหมือนใหม่">
                <CrownFilled style={{ color: "#FFA400" }}></CrownFilled>
                <Text style={{ color: "#FFA400" }}>เหมือนใหม่</Text>
              </Option>
              <Option value="สภาพดี">
                <LikeFilled style={{ color: "#45BDFF" }} />
                <Text style={{ color: "#45BDFF" }}>สภาพดี</Text>
              </Option>
              <Option value="ปานกลาง">
                <StarFilled style={{ color: "#EB5757" }} />
                <Text style={{ color: "#EB5757" }}>ปานกลาง</Text>
              </Option>
            </Select>
          </Form.Item>
        </Space>
      </Space>

      <Form.Item>
        <Button
          type="primary"
          shape="round"
          htmlType="submit"
          className="add-form-button"
        >
          บันทึก
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DomainAddProduct;
