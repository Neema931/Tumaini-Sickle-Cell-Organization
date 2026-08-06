import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPage } from "./analytics";

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPage();
  }, [location]);

  return null;
}

export default AnalyticsTracker;