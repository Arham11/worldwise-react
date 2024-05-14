import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [URLSearchParams] = useSearchParams();
  const lat = URLSearchParams.get("lat");
  const lng = URLSearchParams.get("lng");

  return { lat, lng };
}
