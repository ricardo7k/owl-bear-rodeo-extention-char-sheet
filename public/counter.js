import OBR from "@owlbear-rodeo/sdk/lib/index.js";

export function setupCounter(element) {
  let counter = 0;
  const setCounter = (count) => {
    counter = count;
    console.info("count", counter)
    element.innerHTML = `count is ${counter}`;
    OBR.notification.show(`count is ${counter}`);
  };
  element.addEventListener("click", () => setCounter(counter + 1));
  setCounter(0);
}