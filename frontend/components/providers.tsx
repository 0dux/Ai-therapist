import { ReactNode } from "react";
import ThemeProvider from "./themeProvider";
import { SessionProvider as NextauthSessionProvider } from "next-auth/react";
import { SessionProvider as CustomSessionProvider } from "../lib/context/session-context";
const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <NextauthSessionProvider>
      <CustomSessionProvider>
        <ThemeProvider>{children}</ThemeProvider>;
      </CustomSessionProvider>
    </NextauthSessionProvider>
  );
};

export default Providers;
