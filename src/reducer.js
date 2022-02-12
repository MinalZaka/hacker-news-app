import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

const reducer = (state, action) => {
  //SET LOADING
  if (action.type === SET_LOADING) {
    return { ...state, isLoading: true };
  }

  //SET STORIES
  if (action.type === SET_STORIES) {
    return {
      ...state,
      isLoading: false,
      stories: action.payload.stories,
      nbPages: action.payload.nbPages,
    };
  }

  //REMOVE STORY
  if (action.type === REMOVE_STORY) {
    return {
      ...state,
      stories: state.stories.filter(
        (story) => story.objectID !== action.payload
      ),
    };
  }

  //HANDLE PAGE
  if (action.type === HANDLE_PAGE) {
    if (action.payload === "inc") {
      let nextPage = state.page + 1;
      if (nextPage >= state.nbPages) {
        nextPage = 0;
      }
      console.log(action.payload);
      return { ...state, page: nextPage };
    }

    if (action.payload === "dec") {
      let prevPage = state.page - 1;
      if (prevPage <= 0) {
        prevPage = state.nbPages - 1;
      }
      console.log(action.payload);
      return { ...state, page: prevPage };
    }
  }

  //HANDLE SEARCH
  if (action.type === HANDLE_SEARCH) {
    return { ...state, query: action.payload };
  }
  throw new Error("no matching type");
};
export default reducer;
