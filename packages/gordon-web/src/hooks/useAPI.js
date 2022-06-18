import axios from "axios";
import { useQuery } from "react-query";

export default function useAPI(url, params, config) {
  const context = useQuery(
    [url, params],
    ({ queryKey }) => fetcher({ queryKey }),
    {
      eanbled: !!url,
      ...config,
    }
  );

  return context;
}

function fetcher({ queryKey }) {
  const [url, params] = queryKey;
  return axios.get(url, { params }).then((res) => res.data);
}
