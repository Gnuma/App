import uuid from "uuid";

export const myID = 1;
const toUserID = uuid.v4();

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

const item1ID = uuid.v4();
const item1Chat1ID = uuid.v4();
const item1Chat1UserToID = uuid.v4();
const item1Chat2ID = uuid.v4();
const item1Chat2UserToID = uuid.v4();
const item2ID = uuid.v4();
const item2Chat1ID = uuid.v4();
const item2Chat1UserToID = uuid.v4();
const item3ID = uuid.v4();
const item3Chat1ID = uuid.v4();
const item3Chat1UserToID = uuid.v4();
const item4ID = uuid.v4();
const item5ID = uuid.v4();

export const newSellerMsg = {
  msg: {
    id: uuid.v4(),
    content: "Messsaggio 0",
    timestamp: new Date(2019, 3, 10, 16, 0),
    author: item3Chat1UserToID,
    isRead: false
  },
  chat: item3Chat1ID,
  item: item3ID
};

export const sellerChatList = {
  [item1ID]: {
    id: item1ID,
    book: {
      title: "Matematica Colore",
      authors: "Massimo Massimi"
    },
    price: 14,
    conditions: 0,
    newsCount: 2,
    chats: {
      [item1Chat1ID]: {
        id: item1Chat1ID,
        UserTO: {
          id: item1Chat1UserToID,
          username: "Giancarlo",
          lastVisit: new Date(2019, 2, 4, 12, 0)
        },
        hasNews: true,
        status: null,
        messages: [
          {
            id: uuid.v4(),
            content: "Messsaggio 1",
            timestamp: new Date(2019, 2, 4, 12, 0),
            author: item1Chat1UserToID,
            isRead: false
          },
          {
            id: uuid.v4(),
            content: "Messsaggio 2",
            timestamp: new Date(2019, 2, 4, 11, 0),
            author: myID,
            isRead: true
          },
          {
            id: uuid.v4(),
            content: "Messsaggio 3",
            timestamp: new Date(2019, 2, 4, 10, 0),
            author: item1Chat1UserToID,
            isRead: true
          }
        ]
      },
      [item1Chat2ID]: {
        id: item1Chat2ID,
        UserTO: {
          id: item1Chat2UserToID,
          username: "Marco",
          lastVisit: new Date(2019, 2, 4, 12, 0)
        },
        hasNews: true,
        status: null,
        messages: [
          {
            id: uuid.v4(),
            content: "Messsaggio 1",
            timestamp: new Date(2019, 2, 4, 11, 30),
            author: item1Chat2UserToID,
            isRead: false
          },
          {
            id: uuid.v4(),
            content: "Messsaggio 2",
            timestamp: new Date(2019, 2, 4, 11, 0),
            author: myID,
            isRead: false
          },
          {
            id: uuid.v4(),
            content: "Messsaggio 3",
            timestamp: new Date(2019, 2, 4, 10, 0),
            author: item1Chat2UserToID,
            isRead: true
          }
        ]
      }
    }
  },

  [item2ID]: {
    id: item2ID,
    book: {
      title: "Italiano Carrarar",
      authors: "Massimo AAAA"
    },
    price: 20,
    conditions: 1,
    newsCount: 1,
    chats: {
      [item2Chat1ID]: {
        id: item2Chat1ID,
        UserTO: {
          id: item2Chat1UserToID,
          username: "Marco",
          lastVisit: new Date(2019, 2, 4, 12, 0)
        },
        hasNews: true,
        status: null,
        messages: [
          {
            id: uuid.v4(),
            content: "Messsaggio 1",
            timestamp: new Date(2019, 2, 4, 11, 30),
            author: item2Chat1UserToID,
            isRead: false
          },
          {
            id: uuid.v4(),
            content: "Messsaggio 2",
            timestamp: new Date(2019, 2, 4, 11, 0),
            author: myID,
            isRead: true
          },
          {
            id: uuid.v4(),
            content: "Messsaggio 3",
            timestamp: new Date(2019, 2, 4, 10, 0),
            author: item2Chat1UserToID,
            isRead: true
          }
        ]
      }
    }
  },

  [item3ID]: {
    id: item3ID,
    book: {
      title: "Tre Carrarar",
      authors: "Massimo AAAA"
    },
    price: 10,
    conditions: 1,
    newsCount: 0,
    chats: {
      [item3Chat1ID]: {
        id: item3Chat1ID,
        UserTO: {
          id: item3Chat1UserToID,
          username: "Marco",
          lastVisit: new Date(2019, 2, 4, 12, 0)
        },
        hasNews: false,
        status: null,
        messages: []
      }
    }
  },
  [item4ID]: {
    id: item4ID,
    book: {
      title: "Quatt Carrarar",
      authors: "Massimo AAAA"
    },
    price: 12,
    conditions: 1,
    newsCount: 0,
    chats: {}
  },
  [item5ID]: {
    id: item5ID,
    book: {
      title: "Casd Carrarar",
      authors: "Massimo AAAA"
    },
    price: 16,
    conditions: 2,
    newsCount: 0,
    chats: {}
  }
};

export const single = {
  id: item1Chat1ID,
  UserTO: {
    id: item1Chat1UserToID,
    username: "Giancarlo",
    lastVisit: new Date(2019, 2, 4, 12, 0)
  },
  hasNews: true,
  status: null,
  messages: [
    {
      _id: uuid.v4(),
      text: "Messsaggio 1",
      timestamp: new Date(2019, 2, 4, 12, 0),
      author: item1Chat1UserToID,
      isRead: false,
      user: {
        _id: item1Chat1UserToID
      }
    },
    {
      _id: uuid.v4(),
      text: "Messsaggio 2",
      timestamp: new Date(2019, 2, 4, 11, 0),
      author: myID,
      isRead: true,
      user: {
        _id: myID
      }
    },
    {
      _id: uuid.v4(),
      text: "Messsaggio 3",
      timestamp: new Date(2019, 2, 4, 10, 0),
      author: item1Chat1UserToID,
      isRead: true,
      user: {
        _id: item1Chat1UserToID
      }
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
