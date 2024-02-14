import { useState } from "react";
import MyContext from "./MyContext";

const MyProvider = ({ children }) => {
  const [genre, setGenre] = useState();
  const [search, setSearch] = useState();
  const contextValue = {
    genre: genre,
    setGenre: setGenre,
    search: search,
    setSearch: setSearch,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export default MyProvider;
