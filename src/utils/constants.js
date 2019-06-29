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

export const ChatStatus = {
  LOCAL: 0,
  PENDING: 1,
  PROGRESS: 2,
  EXCHANGE: 3,
  FEEDBACK: 4,
  COMPLETED: 5,
  REJECTED: 6
};

export const OfficeTypes = {
  UNIVERSITY: "university",
  SCHOOL: "school"
};

export const SellType = {
  NEW: "NEW",
  MODIFY: "MODIFY"
};

export const OffertStatus = {
  PENDING: 0,
  ACCEPTED: 1,
  REJECTED: 2
};

export const OffertType = {
  CREATE: "CREATE",
  EDIT: "EDIT",
  DECIDE: "DECIDE",
  ACCEPTED: "ACCEPTED",
  PAY: "PAY",
  WAITPAYMENT: "WAITPAYMENT"
};
