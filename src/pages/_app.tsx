import "@/styles/globals.css";
import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';

import { Center, ColorSchemeScript, createTheme, Flex, MantineProvider, Title } from "@mantine/core";
import type { AppProps } from "next/app";

const theme = createTheme({
  primaryColor: "temple",
  colors: {
    temple: [
      "#ffecef",
      "#f8d7dd",
      "#eeacb7",
      "#e47e90",
      "#dc596e",
      "#d74158",
      "#d6344d",
      "#be263f",
      "#aa1f37", // main color. i wish it was closer to the background, but whatever
      "#96142e"
    ]
  },
  other: {
    temple: {
      background: "#a41e35"
    }
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider theme={theme}>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
