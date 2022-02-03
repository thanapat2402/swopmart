import {
  CheckSquareFilled,
  CreditCardFilled,
  TagFilled,
} from "@ant-design/icons";
import { Card, Space, Typography } from "antd";
import React from "react";
import "../../components/App/App.css";
import { ReactComponent as Banner } from "./banner.svg";

const domainHome: React.FC = () => {
  const { Text } = Typography;
  const gridStyle = {
    width: "25%",
    textAlign: "center",
  };
  const { Meta } = Card;
  return (
    <>
      <div className="space-align-container title">
        แพลตฟอร์มซื้อ-ขายสินค้าไอทีมือสอง
      </div>
      <div className="space-align-container des-1">
        <div>ที่ดีที่สุดในการซื้อสินค้าไอทีมือสองที่คุณรัก</div>
      </div>
      <div className="space-align-container des-2">
        <Space align="center">
          <TagFilled style={{ color: "#a4afbf" }} />
          <Text style={{ color: "#a4afbf" }}>สินค้าสุดคุ้ม</Text>
          <CheckSquareFilled style={{ color: "#a4afbf" }} />
          <Text style={{ color: "#a4afbf" }}>ชำระเงินปลอดภัย</Text>
          <CreditCardFilled style={{ color: "#a4afbf" }} />
          <Text style={{ color: "#a4afbf" }}>บรืการผ่อนชำระ</Text>
        </Space>
      </div>
      <div className="space-align-container">
        <Banner className="banner" />
      </div>
      <div className="my-product">
        <Text>สินค้าของฉัน</Text>
      </div>
      <Card>
        <Card.Grid style={{ width: "20%" }}>
          <Card
            cover={
              <img
                alt="example"
                src="https://p-th.ipricegroup.com/uploaded_0418e1f713a0d53e9b5e105368abb151.jpg"
              />
            }
          >
            <Meta title="Playstation 5" description="฿ 23000" />
          </Card>
        </Card.Grid>
        <Card.Grid style={{ width: "20%" }}>
          <Card
            cover={
              <img
                alt="example"
                src="https://p-th.ipricegroup.com/uploaded_0418e1f713a0d53e9b5e105368abb151.jpg"
              />
            }
          >
            <Meta title="Playstation 5" description="฿ 23000" />
          </Card>
        </Card.Grid>
        <Card.Grid style={{ width: "20%" }}>
          <Card
            cover={
              <img
                alt="example"
                src="https://p-th.ipricegroup.com/uploaded_0418e1f713a0d53e9b5e105368abb151.jpg"
              />
            }
          >
            <Meta title="Playstation 5" description="฿ 23000" />
          </Card>
        </Card.Grid>
        <Card.Grid style={{ width: "20%" }}>
          <Card
            cover={
              <img
                alt="example"
                src="https://p-th.ipricegroup.com/uploaded_0418e1f713a0d53e9b5e105368abb151.jpg"
              />
            }
          >
            <Meta title="Playstation 5" description="฿ 23000" />
          </Card>
        </Card.Grid>
        <Card.Grid style={{ width: "20%" }}>
          <Card
            cover={
              <img
                alt="example"
                src="https://p-th.ipricegroup.com/uploaded_0418e1f713a0d53e9b5e105368abb151.jpg"
              />
            }
          >
            <Meta title="Playstation 5" description="฿ 23000" />
          </Card>
        </Card.Grid>
        <Card.Grid style={{ width: "20%" }}>
          <Card
            cover={
              <img
                alt="example"
                src="https://p-th.ipricegroup.com/uploaded_0418e1f713a0d53e9b5e105368abb151.jpg"
              />
            }
          >
            <Meta title="Playstation 5" description="฿ 23000" />
          </Card>
        </Card.Grid>
      </Card>
    </>
  );
};

export default domainHome;
