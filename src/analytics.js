import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-YPBZNDVFF7");
};

export const trackPage = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname + window.location.search,
  });
};