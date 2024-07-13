import { Flex } from "@mantine/core";
import React from "react";
import { ReactNode } from "react";

export default function CenteredOnPage({ children }: { children: ReactNode }) {
  return (
    <Flex style={{
      height: "100vh",
      alignItems: "center",
      justifyContent: "center"
    }}>
      {children}
    </Flex>
  )
}