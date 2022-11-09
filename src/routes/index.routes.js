import React from "react";

import AppRoutes from "./app/app.routes";
import AuthRoutes from "../routes/auth/auth.routes";

export default function Routes() {
  const [signed, setSigned] = React.useState(false);

  return signed ? <AppRoutes /> : <AuthRoutes />;
}
