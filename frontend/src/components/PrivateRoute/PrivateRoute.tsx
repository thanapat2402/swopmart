import React, { useContext, useEffect } from "react";
import * as jwt from "jsonwebtoken";
import UserContext from "../../contexts/UserContext";
import {
  AccessTokenDecoded,
  PrivateRouteProps,
} from "../../types/components/PrivateRoute";
import { getCurrentTimestamp } from "../../utils/date";
import { message } from "antd";
import { Redirect, Route, useHistory } from "react-router-dom";
import { requestRefreshToken } from "../../hooks/auth";

const getExpFromToken = (token: string): number => {
  const { exp }: AccessTokenDecoded = Object(jwt.decode(token));
  return exp;
};
const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const { accessToken, isLoggedIn, setIsLoggedIn, setAccessToken, setUser } =
    useContext(UserContext);
  const history = useHistory();
  const accessTokenExp = getExpFromToken(accessToken);
  const currentTimestamp = getCurrentTimestamp();

  const toDoRefreshToken = async () => {
    try {
      const data = await requestRefreshToken(accessToken);
      setAccessToken(data.accessToken);
      setIsLoggedIn(true);
      setUser(data);
    } catch (error) {
      setAccessToken("");
      setIsLoggedIn(false);
      setUser({});
      message.error("Unauthorized");

      return history.push("/login");
    }
  };

  useEffect(() => {
    if (currentTimestamp > accessTokenExp) {
      message.error("Session has expired");
      setAccessToken("");
      setUser({});
      setIsLoggedIn(false);
      return;
    }
    const needToRefreshToken = accessTokenExp - currentTimestamp < 40;
    if (needToRefreshToken) {
      toDoRefreshToken();
    }
  });

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
