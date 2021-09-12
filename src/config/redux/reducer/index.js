const intialState = {
  popup: false,
  isLogin: false,
  isLoading: false,
  user: {},
};

const reducer = (state = intialState, action) => {
  if (action.type === "CHANGE_POPUP") {
    return {
      ...state,
      popup: action.value,
    };
  }
  if (action.type === "CHANGE_ISLOGIN") {
    return {
      ...state,
      isLogin: action.value,
    };
  }
  if (action.type === "CHANGE_LOADING") {
    return {
      ...state,
      isLoading: action.value,
    };
  }
  return state;
};

export default reducer;
