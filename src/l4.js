import React, { useContext } from "react";
import useSWR from "swr";

import { AppContext } from "./AppContext";

export function L4() {
  const valueContext = useContext(AppContext);
  const { data, isLoading, isValidating } = useSWR(valueContext.STOCK_API);

  if (isLoading) return <div className="skeleton" />;
  console.log("L4");
  return (
    <>
      <div>LEVEL 4 ${data}</div>
      {isValidating ? <div className="spinner" /> : null}
    </>
  );
}
