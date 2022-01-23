import {useData} from "../contexts/data.context";
import {useCallback, useEffect, useState} from "react";
import {getEditions, getJwtToken} from "../services";
import qs from "qs";

export default function useFetchEditions(initParams) {
  const {state, setToken, setLoading} = useData()
  const [editions, setEditions] = useState(null)

  const fetchEditions = useCallback((params, append = false) => {
    setLoading(true)
    getEditions(qs.stringify(params), state.token)
        .then(({data}) => {
          if (append) {
            const newItems = data?._embedded?.edition
            setEditions(s => {
              s.page = data.page
              s._embedded.edition.push(...newItems)
              return s
            });
          } else {
            setEditions(data);
          }
          setLoading(false)
        })
        .catch(err => {
          console.log(err);

          // get jwt in the case of err 401
          if (err?.response?.status === 401) {
            getJwtToken()
                .then(({data}) => {
                  setToken(data.access_token)
                })
                .catch(console.log)
                .finally(() => setLoading(false))
          }
        })
  }, [setLoading, setToken, setEditions, state.token])

  useEffect(() => {
    if (!state.token) {
      return
    }
    fetchEditions(initParams)
  }, [state.token])

  return {
    editions,
    loading: state.loading,
    fetchEditions
  }
}
