import "./sass/reset.scss";
import "./sass/main.scss";
import card from "./components/Cards/card.html";

import { app } from "./utils/document";

function component() {
  const element = document.createElement("div");
  app.innerHTML = card;

  return app;
}

document.body.appendChild(component());
// https://api.adviceslip.com/advice
