"use client"
import React from "react";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { store } from "../../lib/store/store";
import { persistStore } from "redux-persist";

persistStore(store);

interface Props {
  children: ReactNode;
}

export default function StoreProvider({ children }: Props) {
 

  return <Provider store={store}>{children}</Provider>;
}
