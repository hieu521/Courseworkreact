import React from "react";
import { AppNavigator } from "./app.navigator";
import { HikingContextProvider } from "../../services/hikings/hiking.context";

export const Navigation = () => {
  return (
      <HikingContextProvider>
        <AppNavigator />
      </HikingContextProvider>
  );
};
