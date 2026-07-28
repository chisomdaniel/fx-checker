import { useQuery } from "@tanstack/react-query";
import NavBar from "./nav-bar";
import LiveMarket from "../live-market";
import { getCurrencies } from "@/utils/api";

export default function Header() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
  });

  return (
    <>
      <NavBar
        loading={isLoading}
        noOfCurrencies={data?.length || 0}
        isError={isError}
      />
      <LiveMarket />
    </>
  );
}
