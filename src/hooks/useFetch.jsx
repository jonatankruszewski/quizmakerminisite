import {useEffect} from "react";
import useNamedState from "./useNamedState.jsx";
import axios from "axios";
import _ from "lodash";

const useFetch = (url, axiosOptions = {}, minTime = 500) => {
  const [isLoading, setIsLoading] = useNamedState(false, 'isLoading');
  const [data, setData] = useNamedState(null, 'data');
  const [error, setError] = useNamedState(null, 'error');

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    let isMounted = true;
    let awaitedResponse;

    setIsLoading(true);
    axios.get(url, {signal, timeout: 5000, ...axiosOptions})
      .then(res => {
        if (!isMounted) {
          return
        }

        _.delay(() => {
          setData(res.data);
          setIsLoading(false);
          setError(null);
        }, minTime)

      })
      .catch(err => {
        if (!isMounted) {
          return
        }

        _.delay(() => {
          setError(err?.message || 'Error fetching data');
          setIsLoading(false);
          setData(null)
        }, minTime)
      })


    return () => {
      abortController.abort();
      isMounted = false;
      if (awaitedResponse) {
        clearTimeout(awaitedResponse);
      }
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {data, isLoading, error}
}

export default useFetch;
