// app/ReduxProvider.tsx (Client Component for Redux)
"use client";

import { Provider } from "react-redux";
import { store } from "./services/store"; // Adjust the path to your Redux store

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
