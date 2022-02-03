import React, { useContext } from "react";
import { Menu } from "antd";
import { If, Else, Then } from "react-if";
import UserContext from "../../contexts/UserContext";
import { ReactComponent as SwopMartLogo } from "../../svgs/logo-color.svg";
import { UserOutlined, LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import { LoginResponse } from "../../types/hooks/auth";

const Navbar: React.FC = () => {
  const { SubMenu } = Menu;
  const { isLoggedIn, user } = useContext(UserContext);
  const profileHandler = JSON.stringify(user);
  const profile: Omit<LoginResponse, "password"> = JSON.parse(profileHandler);

  return (
    <>
      <div className="navbar">
        <Menu mode="horizontal">
          <Menu.Item>
            <SwopMartLogo />
          </Menu.Item>
          <If condition={isLoggedIn}>
            <Then>
              <Menu.Item>
                <a href="/" target="_self" rel="noopener noreferrer">
                  สินค้าทั้งหมด
                </a>
              </Menu.Item>

              <Menu.Item>
                <a href="/add" target="_self" rel="noopener noreferrer">
                  เพิ่มสินค้า
                </a>
              </Menu.Item>
              <SubMenu title={profile.name} icon={<UserOutlined />}>
                <Menu.Item icon={<LogoutOutlined />}>
                  <a href="/logout" target="_self" rel="noopener noreferrer">
                    ออกจากระบบ
                  </a>
                </Menu.Item>
              </SubMenu>
            </Then>
            <Else>
              <Then>
                <Menu.Item icon={<LoginOutlined />} style={{ float: "right" }}>
                  <a href="/login" target="_self">
                    เข้าสู่ระบบ
                  </a>
                </Menu.Item>
              </Then>
            </Else>
          </If>
        </Menu>
      </div>
    </>
  );
};

export default Navbar;
