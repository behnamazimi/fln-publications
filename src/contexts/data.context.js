import React, {useCallback, useContext, useMemo, useReducer} from "react";

const initialState = {
  loading: true,
  token: null,
  categories: ["ebook", "newsletter", "whitepaper", "brochure"],
}

export const dataActions = {
  setLoading: "setLoading",
  setToken: "setToken",
  setCategories: "setCategories",
}

const DataContext = React.createContext(initialState)

export function useData() {
  return useContext(DataContext)
}

function dataReducer(state, action) {
  switch (action.type) {
    case dataActions.setLoading:
      state.loading = !!action.payload
      break;
    case dataActions.setToken:
      state.token = action.payload
      break;
    case dataActions.setCategories:
      state.categories = action.categories
      break;
    default:
      console.log("Invalid data action")
      break
  }
  return {...state}
}

export default function DataProvider({children}) {

  const [state, dispatch] = useReducer(dataReducer, initialState)

  const setLoading = useCallback((payload) => {
    return dispatch({
      type: dataActions.setLoading,
      payload
    })
  }, [dispatch])

  const setToken = useCallback((payload) => {
    return dispatch({
      type: dataActions.setToken,
      payload
    })
  }, [dispatch])

  const value = useMemo(() => ({
    state,
    dispatch,
    setLoading,
    setToken
  }), [state, dispatch, setLoading, setToken])

  return (
      <DataContext.Provider value={value}>
        {children}
      </DataContext.Provider>
  )
}