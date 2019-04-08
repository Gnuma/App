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
      content: "Messsaggio 7",
      timestamp: new Date(2019, 2, 4, 7, 0),
      author: myID
    },
    {
      id: uuid.v4(),
      content: "Messsaggio 8",
      timestamp: new Date(2019, 2, 4, 6, 0),
      author: myID
    }
  ]
};

const chat1ID = uuid.v4();
const toUser1ID = uuid.v4();
const chat2ID = uuid.v4();
const toUser2ID = uuid.v4();
const chat3ID = uuid.v4();
const toUser3ID = uuid.v4();

export const buyerChatList = {
  [chat1ID]: {
    id: chat1ID,
    UserTO: {
      id: toUser1ID,
      username: "Giancarlo",
      lastVisit: new Date(2019, 2, 4, 12, 0)
    },
    status: null,
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
        author: toUser1ID
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
        author: toUser1ID
      }
    ]
  },

  [chat2ID]: {
    id: chat2ID,
    UserTO: {
      id: toUser2ID,
      username: "Marco",
      lastVisit: new Date(2019, 2, 4, 12, 0)
    },
    status: null,
    item: {
      itemID: uuid.v4(),
      book: {
        title: "Italiano Carrarar",
        authors: "Massimo AAAA"
      }
    },
    messages: [
      {
        id: uuid.v4(),
        content: "Messsaggio 1",
        timestamp: new Date(2019, 2, 4, 11, 30),
        author: toUser2ID
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
        author: toUser2ID
      }
    ]
  },

  [chat3ID]: {
    id: chat3ID,
    UserTO: {
      id: toUser3ID,
      username: "Marco Carco",
      lastVisit: new Date(2019, 2, 4, 12, 0)
    },
    status: null,
    item: {
      itemID: uuid.v4(),
      book: {
        title: "dfgdfg asdas",
        authors: "Massimo sdfghdfgdfgdfgdfgfghndgh"
      }
    },
    messages: [
      {
        id: uuid.v4(),
        content: "Messsaggio 1",
        timestamp: new Date(2019, 2, 4, 12, 0),
        author: toUser3ID
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
        author: toUser3ID
      },
      {
        id: uuid.v4(),
        content: "Messsaggio 4",
        timestamp: new Date(2019, 2, 4, 9, 0),
        author: toUser3ID
      },
      {
        id: uuid.v4(),
        content: "Messsaggio 5",
        timestamp: new Date(2019, 2, 4, 8, 0),
        author: toUser3ID
      },
      {
        id: uuid.v4(),
        content: "Messsaggio 7",
        timestamp: new Date(2019, 2, 4, 7, 0),
        author: myID
      },
      {
        id: uuid.v4(),
        content: "Messsaggio 8",
        timestamp: new Date(2019, 2, 4, 6, 0),
        author: myID
      }
    ]
  }
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
