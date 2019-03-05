import uuid from "uuid";

export const mockChatLink = {
  buyer: {
    id: 1,
    name: "Federico"
  },
  seller: {
    id: 2,
    name: "Alice"
  },
  status: "active"
};

export const mockMessages = [
  {
    _id: "A",
    createdAt: new Date(Date.UTC(2019, 3, 4, 12, 0)),
    text: "Ciao Primo",
    user: {
      _id: 1,
      name: "Federico"
    }
  },
  {
    _id: "B",
    createdAt: new Date(Date.UTC(2019, 3, 4, 12, 30)),
    text: "Ciao Secondo",
    user: {
      _id: 2,
      name: "Alice"
    }
  },
  {
    _id: "C",
    createdAt: new Date(Date.UTC(2019, 3, 4, 13, 0)),
    text: "Ciao Terzo",
    user: {
      _id: 2,
      name: "Alice"
    }
  },
  {
    _id: "D",
    createdAt: new Date(Date.UTC(2019, 3, 2, 13, 30)),
    text: "Ciao Quarto",
    user: {
      _id: 1,
      name: "Federico"
    }
  },
  {
    _id: "F",
    createdAt: new Date(Date.UTC(2019, 3, 2, 14, 30)),
    text: "Ciao Quinto",
    user: {
      _id: 1,
      name: "Federico"
    }
  },
  {
    _id: uuid.v4(),
    createdAt: new Date(Date.UTC(2019, 3, 1, 15, 30)),
    text: "Ciao Sesto",
    user: {
      _id: 1,
      name: "Federico"
    }
  }
];

export const chats = [
  {
    id: "1",
    status: 2,
    img: "",
    price: 15,
    conditions: 1,
    seller: {
      name: "Federico",
      fbPoints: 8,
      office: {
        id: 1,
        name: "I.I.S.S. J. Von Neumann",
        address: "via Pollenza 156, Roma",
        type: "Tecnico"
      }
    },
    book: {
      title: "Matematica Verde 3",
      authors: "Massimiliano Bergamini, Anna Tritone e Graziella Banzoni",
      isbn: "9788804705161",
      subject: "Matematica",
      year: 3
    },
    description:
      "Libro Matematica Verde 3 venduto praticamente nuovo giusto qualche ammaccatura contattatemi per informazioni e prezzo."
  },
  {
    id: "2",
    status: 2,
    img: "",
    price: 20,
    conditions: 2,
    seller: {
      name: "Marco",
      fbPoints: 23,
      office: {
        id: 1,
        name: "I.I.S.S. J. Von Neumann",
        address: "via Pollenza 156, Roma",
        type: "Tecnico"
      }
    },
    book: {
      title: "Matematica Verde 3",
      authors: "Massimiliano Bergamini, Anna Tritone e Graziella Banzoni",
      isbn: "9788804705161",
      subject: "Matematica",
      year: 3
    },
    description:
      "Libro Matematica Verde 3 venduto praticamente nuovo giusto qualche ammaccatura contattatemi per informazioni e prezzo."
  },
  {
    id: "3",
    status: 0,
    img: "",
    price: 18,
    conditions: 3,
    seller: {
      name: "Livia",
      fbPoints: 18,
      office: {
        id: 1,
        name: "I.I.S.S. J. Von Neumann",
        address: "via Pollenza 156, Roma",
        type: "Tecnico"
      }
    },
    book: {
      title: "Matematica Verde 3",
      authors: "Massimiliano Bergamini, Anna Tritone e Graziella Banzoni",
      isbn: "9788804705161",
      subject: "Matematica",
      year: 3
    },
    description:
      "Libro Matematica Verde 3 venduto praticamente nuovo giusto qualche ammaccatura contattatemi per informazioni e prezzo."
  }
];

export const mockChat = [
  {
    _id: 1,
    text:
      "It uses the same design as React, letting you compose a rich mobile UI from declarative components https://facebook.github.io/react-native/",
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: "Developer"
    }
  },
  {
    _id: 2,
    text: "React Native lets you build mobile apps using only JavaScript",
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: "Developer"
    }
  },
  {
    _id: 3,
    text: "This is a system message.",
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    system: true
  }
];

export const oldMockChat = [
  {
    _id: 4,
    text:
      "It uses the same design as React, letting you compose a rich mobile UI from declarative components https://facebook.github.io/react-native/",
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: "Developer"
    }
  },
  {
    _id: 5,
    text: "React Native lets you build mobile apps using only JavaScript",
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: "Developer"
    }
  },
  {
    _id: 6,
    text: "This is a system message.",
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    system: true
  }
];
