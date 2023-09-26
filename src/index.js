import "./sass/reset.scss";
import "./sass/main.scss";
import card from "./components/Cards";
import { app } from "./utils";

function component() {
  card();
  return app;
}

document.body.appendChild(component());
