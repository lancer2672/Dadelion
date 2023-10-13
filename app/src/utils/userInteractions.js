export const onDoublePress = (date) => {
  const time = new Date().getTime();
  const delta = time - this.lastPress;

  const DOUBLE_PRESS_DELAY = 400;
  if (delta < DOUBLE_PRESS_DELAY) {
    // Success double press
  }
  this.lastPress = time;
};
