import { ReactNode } from "react";
import ThemeProvider from "./themeProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default Providers;
