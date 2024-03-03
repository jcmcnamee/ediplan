import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  const { data, error, isPending } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { data, error, isPending };
}
