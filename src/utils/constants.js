import colors from "../styles/colors";

export const ___BOOK_IMG_RATIO___ = 4 / 3;
export const ChatType = {
  sales: "sales",
  shopping: "shopping"
};
export const AutoStart = {
  logged: "logged",
  anonymous: "anonymous",
  firstTime: "firstTime",
  busy: "busy"
};

export const LEVEL_DATA = {
  1: 100,
  2: 200,
  3: 400,
  4: 800,
  5: 1600
};

export const CONDITIONS_DATA = {
  0: {
    text: "Ottimo",
    percentage: 270,
    color: colors.secondary
  },
  1: {
    text: "Buono",
    percentage: 180,
    color: colors.lightYellow
  },
  2: {
    text: "Usurato",
    percentage: 90,
    color: colors.red
  },
  3: {
    text: "ERROR",
    percentage: 45,
    color: colors.red
  }
};
