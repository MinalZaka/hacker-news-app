import React, { useContext, useEffect, useReducer } from "react";

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";
import reducer from "./reducer";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

const initialState = {
  isLoading: true,
  query: "",
  page: 0,
  stories: [],
  nbPages: 0,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({
        type: SET_STORIES,
        payload: { stories: data.hits, nbPages: data.nbPages },
      });
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const removeStory = (id) => {
    dispatch({ type: REMOVE_STORY, payload: id });
  };

  const handlePage = (type) => {
    dispatch({ type: HANDLE_PAGE, payload: type });
  };

  const handleSearch = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: query });
  };

  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
  }, [state.page, state.query]);

  return (
    <AppContext.Provider
      value={{ ...state, handlePage, handleSearch, removeStory }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
