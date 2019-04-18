import uuid from "uuid";

export const myID = 1;

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
const item4Chat1ID = uuid.v4();
const item4Chat1UserToID = uuid.v4();
const item5ID = uuid.v4();

export const newSellerMsg = {
  msg: {
    _id: uuid.v4(),
    text: "Messsaggio 0",
    createdAt: new Date(2019, 3, 10, 16, 0),
    user: {
      _id: item3Chat1UserToID
    },
    isRead: false
  },
  chat: item3Chat1ID,
  item: item3ID
};

export const sellerChatList = {
  [item1ID]: {
    _id: item1ID,
    book: {
      title: "Matematica Colore",
      authors: "Massimo Massimi"
    },
    price: 14,
    conditions: 0,
    newsCount: 1,
    chats: {
      [item1Chat1ID]: {
        _id: item1Chat1ID,
        UserTO: {
          _id: item1Chat1UserToID,
          username: "Giancarlo",
          lastVisit: new Date(2019, 2, 4, 12, 0)
        },
        hasNews: true,
        status: "progress",
        messages: [
          {
            _id: uuid.v4(),
            text: "Messsaggio 1",
            createdAt: new Date(2019, 2, 4, 12, 0),
            isRead: false,
            user: {
              _id: item1Chat1UserToID
            }
          },
          {
            _id: uuid.v4(),
            text: "Messsaggio 2",
            createdAt: new Date(2019, 2, 4, 11, 0),
            user: {
              _id: myID
            },
            isRead: true
          },
          {
            _id: uuid.v4(),
            text: "Messsaggio 3",
            createdAt: new Date(2019, 2, 4, 10, 0),
            user: {
              _id: item1Chat1UserToID
            },
            isRead: true
          }
        ]
      },
      [item1Chat2ID]: {
        _id: item1Chat2ID,
        UserTO: {
          _id: item1Chat2UserToID,
          username: "Marco",
          lastVisit: new Date(2019, 2, 4, 12, 0)
        },
        hasNews: false,
        status: "progress",
        messages: [
          {
            _id: uuid.v4(),
            text: "Messsaggio 1",
            createdAt: new Date(2019, 2, 4, 11, 30),
            user: {
              _id: item1Chat2UserToID
            },
            isRead: true
          },
          {
            _id: uuid.v4(),
            text: "Messsaggio 2",
            createdAt: new Date(2019, 2, 4, 11, 0),
            user: {
              _id: myID
            },
            isRead: true
          },
          {
            _id: uuid.v4(),
            text: "Messsaggio 3",
            createdAt: new Date(2019, 2, 4, 10, 0),
            user: {
              _id: item1Chat2UserToID
            },
            isRead: true
          }
        ]
      }
    }
  },

  [item2ID]: {
    _id: item2ID,
    book: {
      title: "Italiano Carrarar",
      authors: "Massimo AAAA"
    },
    price: 20,
    conditions: 1,
    newsCount: 1,
    chats: {
      [item2Chat1ID]: {
        _id: item2Chat1ID,
        UserTO: {
          _id: item2Chat1UserToID,
          username: "Marco",
          lastVisit: new Date(2019, 2, 4, 12, 0)
        },
        hasNews: true,
        status: "progress",
        messages: [
          {
            _id: uuid.v4(),
            text: "Messsaggio 1",
            createdAt: new Date(2019, 2, 4, 11, 30),
            user: {
              _id: item2Chat1UserToID
            },
            isRead: false
          },
          {
            _id: uuid.v4(),
            text: "Messsaggio 2",
            createdAt: new Date(2019, 2, 4, 11, 0),
            user: {
              _id: myID
            },
            isRead: true
          },
          {
            _id: uuid.v4(),
            text: "Messsaggio 3",
            createdAt: new Date(2019, 2, 4, 10, 0),
            user: {
              _id: item2Chat1UserToID
            },
            isRead: true
          }
        ]
      }
    }
  },

  [item3ID]: {
    _id: item3ID,
    book: {
      title: "Tre Carrarar",
      authors: "Massimo AAAA"
    },
    price: 10,
    conditions: 1,
    newsCount: 0,
    chats: {
      [item3Chat1ID]: {
        _id: item3Chat1ID,
        UserTO: {
          _id: item3Chat1UserToID,
          username: "Marco",
          lastVisit: new Date(2019, 2, 4, 12, 0)
        },
        hasNews: false,
        status: "progress",
        messages: []
      }
    }
  },
  [item4ID]: {
    _id: item4ID,
    book: {
      title: "Quatt Carrarar",
      authors: "Massimo AAAA"
    },
    price: 12,
    conditions: 1,
    newsCount: 1,
    chats: {
      [item4Chat1ID]: {
        _id: item4Chat1ID,
        UserTO: {
          _id: item4Chat1UserToID,
          username: "Geronimo",
          lastVisit: new Date(2019, 2, 4, 12, 0)
        },
        hasNews: true,
        status: "pending",
        messages: [
          {
            _id: uuid.v4(),
            text:
              "Sono molto interessato a matematica verde, il prezzo è trattabile?",
            createdAt: new Date(2019, 2, 4, 11, 30),
            user: {
              _id: item4Chat1UserToID
            },
            isRead: false
          },
          {
            _id: uuid.v4(),
            text: "Ciao Bob",
            createdAt: new Date(2019, 2, 4, 11, 0),
            user: {
              _id: item4Chat1UserToID
            },
            isRead: false
          }
        ]
      }
    }
  },
  [item5ID]: {
    _id: item5ID,
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
  _id: item1Chat1ID,
  UserTO: {
    _id: item1Chat1UserToID,
    username: "Giancarlo",
    lastVisit: new Date(2019, 2, 4, 12, 0)
  },
  hasNews: true,
  status: "progress",
  messages: [
    {
      _id: uuid.v4(),
      text: "Messsaggio 1",
      createdAt: new Date(2019, 2, 4, 12, 0),
      author: item1Chat1UserToID,
      isRead: false,
      user: {
        _id: item1Chat1UserToID
      }
    },
    {
      _id: uuid.v4(),
      text: "Messsaggio 2",
      createdAt: new Date(2019, 2, 4, 11, 0),
      author: myID,
      isRead: true,
      user: {
        _id: myID
      }
    },
    {
      _id: uuid.v4(),
      text: "Messsaggio 3",
      createdAt: new Date(2019, 2, 4, 10, 0),
      author: item1Chat1UserToID,
      isRead: true,
      user: {
        _id: item1Chat1UserToID
      }
    }
  ]
};

const subject1ID = uuid.v4();
const subject1Chat1ID = uuid.v4();
const subject1Chat1UserToID = uuid.v4();
const subject1Chat2ID = uuid.v4();
const subject1Chat2UserToID = uuid.v4();
const subject1Chat3ID = uuid.v4();
const subject1Chat3UserToID = uuid.v4();
const subject2ID = uuid.v4();
const subject2Chat1ID = uuid.v4();
const subject2Chat1UserToID = uuid.v4();
const subject3ID = uuid.v4();
const subject3Chat1ID = uuid.v4();
const subject3Chat1UserToID = uuid.v4();
const subject4ID = uuid.v4();
const subject4Chat1ID = uuid.v4();
const subject4Chat1UserToID = uuid.v4();
const subject5ID = uuid.v4();

export const buyerChatList = {
  [subject1ID]: {
    _id: subject1ID,
    title: "Matematica",
    newsCount: 2,
    chats: {
      [subject1Chat1ID]: {
        _id: subject1Chat1ID,
        item: {
          _id: item5ID,
          book: {
            title: "Casd Carrarar",
            authors: "Massimo AAAA"
          },
          price: 16,
          conditions: 2,
          newsCount: 0
        },
        UserTO: {
          _id: subject1Chat1UserToID,
          username: "Geronimo",
          lastVisit: new Date(2019, 2, 4, 12, 0)
        },
        hasNews: true,
        status: "progress",
        messages: [
          {
            _id: uuid.v4(),
            text: "Ciao certo capo!",
            createdAt: new Date(2019, 2, 4, 11, 30),
            user: {
              _id: subject1Chat1UserToID
            },
            isRead: false
          },
          {
            _id: uuid.v4(),
            text: "Ero interessato al tuo libro",
            createdAt: new Date(2019, 2, 4, 10, 30),
            user: {
              _id: myID
            },
            isRead: true
          },
          {
            _id: uuid.v4(),
            text: "Ciao capo!",
            createdAt: new Date(2019, 2, 4, 9, 30),
            user: {
              _id: myID
            },
            isRead: true
          }
        ]
      },
      [subject1Chat2ID]: {
        _id: subject1Chat2ID,
        item: {
          _id: item5ID,
          book: {
            title: "Casd Carrarar",
            authors: "Massimo AAAA"
          },
          price: 16,
          conditions: 2,
          newsCount: 0
        },
        UserTO: {
          _id: subject1Chat2UserToID,
          username: "Tristino",
          lastVisit: new Date(2019, 2, 4, 12, 0)
        },
        hasNews: true,
        status: "progress",
        messages: [
          {
            _id: uuid.v4(),
            text: "Ciao certo capo! ARARFHNASDFHHFUHSdf",
            createdAt: new Date(2019, 2, 4, 11, 30),
            user: {
              _id: subject1Chat2UserToID
            },
            isRead: false
          },
          {
            _id: uuid.v4(),
            text: "Ero interessato al tuo libro",
            createdAt: new Date(2019, 2, 4, 10, 30),
            user: {
              _id: myID
            },
            isRead: true
          },
          {
            _id: uuid.v4(),
            text: "Ciao capo!",
            createdAt: new Date(2019, 2, 4, 9, 30),
            user: {
              _id: myID
            },
            isRead: true
          }
        ]
      },
      [subject1Chat3ID]: {
        _id: subject1Chat3ID,
        item: {
          _id: item5ID,
          book: {
            title: "Casd Carrarar",
            authors: "Massimo AAAA"
          },
          price: 16,
          conditions: 2,
          newsCount: 0
        },
        UserTO: {
          _id: subject1Chat3UserToID,
          username: "NonRispondo",
          lastVisit: new Date(2019, 2, 4, 12, 0)
        },
        hasNews: false,
        status: "progress",
        messages: [
          {
            _id: uuid.v4(),
            text: "Ero interessato al tuo libro",
            createdAt: new Date(2019, 2, 4, 10, 30),
            user: {
              _id: myID
            },
            isRead: true
          },
          {
            _id: uuid.v4(),
            text: "Ciao capo!",
            createdAt: new Date(2019, 2, 4, 9, 30),
            user: {
              _id: myID
            },
            isRead: true
          }
        ]
      }
    }
  },
  [subject2ID]: {
    _id: subject2ID,

    title: "Italiano",
    newsCount: 1,
    chats: {
      [subject2Chat1ID]: {
        _id: subject2Chat1ID,
        item: {
          _id: item5ID,
          book: {
            title: "Casd Carrarar",
            authors: "Massimo AAAA"
          },
          price: 16,
          conditions: 2,
          newsCount: 0
        },
        UserTO: {
          _id: subject2Chat1UserToID,
          username: "CapoCapo",
          lastVisit: new Date(2019, 2, 4, 12, 0)
        },
        hasNews: true,
        status: "progress",
        messages: [
          {
            _id: uuid.v4(),
            text: "Io no",
            createdAt: new Date(2019, 2, 4, 12, 30),
            user: {
              _id: subject2Chat1UserToID
            },
            isRead: false
          },
          {
            _id: uuid.v4(),
            text: "Ero interessato",
            createdAt: new Date(2019, 2, 4, 10, 30),
            user: {
              _id: myID
            },
            isRead: true
          },
          {
            _id: uuid.v4(),
            text: "Al tuo libro",
            createdAt: new Date(2019, 2, 4, 9, 30),
            user: {
              _id: myID
            },
            isRead: true
          }
        ]
      }
    }
  },
  [subject3ID]: {
    _id: subject3ID,
    title: "Inglese",
    newsCount: 0,
    chats: {
      [subject3Chat1ID]: {
        _id: subject3Chat1ID,
        item: {
          _id: item5ID,
          book: {
            title: "Casd Carrarar",
            authors: "Massimo AAAA"
          },
          price: 16,
          conditions: 2,
          newsCount: 0
        },
        UserTO: {
          _id: subject3Chat1UserToID,
          username: "CapoCapo",
          lastVisit: new Date(2019, 2, 4, 12, 0)
        },
        hasNews: false,
        status: "local",
        messages: []
      }
    }
  },
  [subject4ID]: {
    _id: subject4ID,
    title: "Quarta Materia",
    newsCount: 0,
    chats: {}
  }
};
