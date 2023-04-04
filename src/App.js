import React, { useContext } from "react";
import useSWR, { SWRConfig } from "swr";
import { AppContext } from "./AppContext";
import { L1 } from "./l1";

// Add some delay here.
const fetcher = (url) =>
  Promise.all([fetch(url), new Promise((res) => setTimeout(res, 800))])
    .then(([res]) => res.json())
    .then((numbers) => (numbers[0] / 100).toFixed(2));

const STOCK_API = `https://www.randomnumberapi.com/api/v1.0/random?min=15000&max=25000&count=1`;
const valueContext = {
  STOCK_API: STOCK_API
};

function Stock() {
  const valueContext = useContext(AppContext);
  const { data, isLoading, isValidating } = useSWR(valueContext.STOCK_API);

  // If it's still loading the initial data, there is nothing to display.
  // We return a skeleton here.
  if (isLoading) return <div className="skeleton" />;

  // Otherwise, display the data and a spinner that indicates a background
  // revalidation.
  console.log("Stock");
  return (
    <>
      <div>RAIZ ${data}</div>
      {isValidating ? <div className="spinner" /> : null}
    </>
  );
}

export default function App() {
  console.log("APP");
  return (
    <AppContext.Provider value={valueContext}>
      <SWRConfig
        value={{
          refreshInterval: 5000,
          fetcher: fetcher
        }}
      >
        <div>
          <h1>SWR Loading State Example and Context</h1>
          <div className="stock">
            <Stock />
            <L1 />
          </div>
        </div>
      </SWRConfig>
    </AppContext.Provider>
  );
}
