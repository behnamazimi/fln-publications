import {useLayoutEffect} from "react";
import {useData} from "../contexts/data.context";
import {getJwtToken} from "../services";

export default function useAuth() {

  const {state, setLoading, setToken} = useData()

  useLayoutEffect(() => {
    if (!state.token) {
      setLoading(true)
      getJwtToken()
          .then(({data}) => {
            setToken(data.access_token)
          })
          .catch(console.log)
          .finally(() => setLoading(false))
    }
  }, [state.token])
}
