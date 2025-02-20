import { render, RenderOptions } from "@testing-library/react";
import {
  AppContext,
  appContextDefault,
  AppContextType,
} from "context/app-context";
import {
  SSEContext,
  sseContextDefault,
  SSEContextType,
} from "context/sse-context";
import React, { FC, ReactElement } from "react";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import i18n from "../i18n/test_config";

const AllTheProviders: FC<{
  children: React.ReactNode;
  sseProps: SSEContextType;
  appProps: AppContextType;
}> = ({ children, appProps, sseProps }) => {
  return (
    <BrowserRouter>
      <SSEContext.Provider
        value={{
          ...sseContextDefault,
          ...sseProps,
        }}
      >
        <AppContext.Provider
          value={{
            ...appContextDefault,
            ...appProps,
          }}
        >
          <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </AppContext.Provider>
      </SSEContext.Provider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & {
    providerOptions?: {
      sseProps?: Partial<SSEContextType>;
      appProps?: Partial<AppContextType>;
    };
  }
) =>
  render(ui, {
    wrapper: (props: any) => (
      <AllTheProviders {...props} {...options?.providerOptions} />
    ),
    ...options,
  });

export * from "@testing-library/react";
export { customRender as render };
