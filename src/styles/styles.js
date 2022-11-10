import { extendTheme } from "native-base";

export const theme = extendTheme({
  colors: {
    primary: {
      900: "#1E1E1E",
    },
    purple: {
      600: "#7E74F1",
    },
  },
  fontConfig: {
    Inter: {
      500: {
        normal: "Inter_500Medium",
      },
      700: {
        normal: "Inter_700Bold",
      },
      900: {
        normal: "Inter_900Black",
      },
    },
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
    mono: "Inter",
  },
});
