import { useSearchParams } from "react-router-dom";

function useSalesPlanSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const planId = searchParams.get("plan") ?? undefined;

  const setPlanId = (plan: string | "null") => {
    if (plan === "null") {
      searchParams.delete("plan");
    } else {
      searchParams.set("plan", plan);
    }
    setSearchParams(new URLSearchParams(searchParams));
  };
  return { planId, setPlanId };
}

export default useSalesPlanSearchParams;
