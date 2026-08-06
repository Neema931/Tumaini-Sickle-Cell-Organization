import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import "./components/responsive.css";
import "./auth/auth.css";
import AnalyticsTracker from "./AnalyticsTracker";

import { initGA } from "./analytics";

initGA();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AnalyticsTracker />
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);