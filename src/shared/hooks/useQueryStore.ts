import RootStore from "@shared/store/RootStore";
import { useNavigate, useLocation } from "react-router-dom";

const useQueryStore = (): void => {
  const location = useLocation();
  const navigator = useNavigate();

  RootStore.query.setHistory(navigator, location);
};

export default useQueryStore;
