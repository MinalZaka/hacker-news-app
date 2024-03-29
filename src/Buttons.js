import React from "react";
import { useGlobalContext } from "./context";

const Buttons = () => {
  const { page, nbPages, isLoading, handlePage } = useGlobalContext();
  return (
    <div className="btn-container">
      <button disabled={isLoading} onClick={() => handlePage("dec")}>
        prev
      </button>
      <p>
        {!isLoading ? page + 1 : 0} of {nbPages}
      </p>
      <button disabled={isLoading} onClick={() => handlePage("inc")}>
        next
      </button>
    </div>
  );
};

export default Buttons;
