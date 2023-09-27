import card from "./card.html";
import { Api } from "../../utils";

const getAdvice = async () => {
  try {
    return await Api.get("advice");
  } catch (error) {
    console.log(error);
  }
};

export default () => {
  const app = document?.getElementById("app");
  app.insertAdjacentHTML("beforeend", card);
  const _card = app.querySelector(".card");
  const adviceElement = _card.querySelector("#advice");
  const numberAdvice = _card.querySelector("#advicie-id");
  const diceBtn = _card.querySelector(".dice-btn");
  const dice = _card.querySelector("#dice");

  let currentDiceDot = 5;
  const changeDots = () => {
    const dot = Math.floor(Math.random() * 6) + 1;
    dice.classList.remove(`dot-${currentDiceDot}`);
    dice.classList.add(`dot-${dot}`);
    currentDiceDot = dot;
  };
  diceBtn.addEventListener("click", function () {
    let newAdvice = {};
    getAdvice().then((advice) => (newAdvice = advice));
    const changeDotsInterval = setInterval(changeDots, 200);
    setTimeout(() => {
      clearInterval(changeDotsInterval);
      adviceElement.textContent = `"${newAdvice.advice}"`;
      numberAdvice.textContent = newAdvice.id;
    }, 1000);
  });
};
