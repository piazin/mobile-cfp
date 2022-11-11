import React, { useContext, useState } from "react";
import { StatusBar } from "react-native";
import AppRoutes from "./app/app.routes";
import AuthRoutes from "../routes/auth/auth.routes";

import { AuthContext } from "../contexts/authContext";
import { ThemeContext } from "../contexts/themeContext";

export default function Routes() {
  const { signed } = useContext(AuthContext);
  const { deviceTheme } = useContext(ThemeContext);

  return (
    <>
      {signed ? <AppRoutes /> : <AuthRoutes />}
      <StatusBar
        barStyle={deviceTheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={deviceTheme === "dark" ? "#1E1E1E" : "#ffffff"}
        translucent
      />
    </>
  );
}
