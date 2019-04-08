import uuid from "uuid";

const myID = 1;
const toUserID = uuid.v4();
export const single = {
  id: uuid.v4(),
  UserTO: {
    id: toUserID,
    username: "Pino",
    lastVisit: new Date(2019, 2, 4, 12, 0)
  },
  status: {
    [toUserID]: "pending",
    [myID]: "sent"
  },
  item: {
    itemID: uuid.v4(),
    book: {
      title: "Matematica Colore",
      authors: "Massimo Massimi"
    }
  },
  messages: [
    {
      id: uuid.v4(),
      content: "Messsaggio 1",
      timestamp: new Date(2019, 2, 4, 12, 0),
      author: toUserID
    },
    {
      id: uuid.v4(),
      content: "Messsaggio 2",
      timestamp: new Date(2019, 2, 4, 11, 0),
      author: myID
    },
    {
      id: uuid.v4(),
      content: "Messsaggio 3",
      timestamp: new Date(2019, 2, 4, 10, 0),
      author: toUserID
    },
    {
      id: uuid.v4(),
      content: "Messsaggio 4",
      timestamp: new Date(2019, 2, 4, 9, 0),
      author: toUserID
    },
    {
      id: uuid.v4(),
      content: "Messsaggio 5",
      timestamp: new Date(2019, 2, 4, 8, 0),
      author: toUserID
    },
    {
      id: uuid.v4(),
      content: "Messsaggio 6",
      timestamp: new Date(2019, 2, 4, 7, 0),
      author: myID
    },
    {
      id: uuid.v4(),
      content: "Messsaggio 6",
      timestamp: new Date(2019, 2, 4, 6, 0),
      author: myID
    }
  ]
};

/*
  	User1: {UserID, username, lastVisit}
	User2 ^,
	Status, //”pending”,“progress”,”scambio”, “feedback”, “completed”
	Item: {
	ItemID,
	Img,
	condition,
	Book: {bookTitle,bookAuthor},
	Price,
	Seller: {SellerID, username, level, office, ...}
},
//soluzione array
messages: [ //ordinata per data
	0: {MsgID, UserID, timestamp, content},
	1: {MsgID, UserID, timestamp, content},
	...
],
//soluzione object
messages: {
	[MsgID]: {UserID, timestamp, content},
	[MsgID]: {UserID, timestamp, content},
	...
},

  */
