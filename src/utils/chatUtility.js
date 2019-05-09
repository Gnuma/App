export const getSubjectIndex = (subjectID, state) => {
  for (let i = 0; i < state.orderedData.length; i++) {
    if (state.orderedData[i].subjectID === subjectID) return i;
  }
  return -1;
};

export const getItemIndex = (itemID, state) => {
  for (let i = 0; i < state.orderedData.length; i++) {
    if (state.orderedData[i].itemID === itemID) return i;
  }
  return -1;
};

export const getChatIndex = (chatID, item) => {
  for (let i = 0; i < item.chats.length; i++) {
    if (item.chats[i] === chatID) return i;
  }
  return -1;
};

export const highlightItem = (array, index) =>
  array.splice(index, 1).concat(array);

export const createOffert = (user, price) => ({
  creator: user,
  createdAt: new Date(),
  value: price,
  status: "pending"
});
