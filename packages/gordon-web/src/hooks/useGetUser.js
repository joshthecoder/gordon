import useAPI from "./useAPI";

export default function useGetUser() {
  const context = useAPI("/api/user", undefined, { retry: false });
  return { ...context, data: context.data?.user };
}
