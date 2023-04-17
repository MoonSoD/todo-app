import "@styles/global.scss";
import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { Hydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { Layout } from "@components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchProvider } from "@hooks/use-search";

type AppPropsWithDehydratedState = AppProps & {
  pageProps: { dehydratedState: unknown };
};

function MyApp({
  Component,
  pageProps,
}: AppPropsWithDehydratedState): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <>
          <ToastContainer />
          <SearchProvider>
            <Component {...pageProps} />
          </SearchProvider>
        </>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
