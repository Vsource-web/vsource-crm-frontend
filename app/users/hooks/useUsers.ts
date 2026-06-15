import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../service/user.service";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};
