import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import BasicHeader from "../components/BasicHeader";
import { Header3, Header2, Header1 } from "../components/Text";
import FullButton from "../components/FullButton";
import { ListMultiItem } from "../components/ListItem/ListMultiItem";
import { ChatType } from "../utils/constants";
import Card from "../components/Card";
import PriceInput from "../components/Sell/PriceInput";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../styles/colors";
import Button from "../components/Button";

const CreateOffert = ({ item, price, setPrice, setPriceRef, focusPrice }) => {
  return (
    <View style={{ flex: 1 }}>
      <OffertInfo item={item}>
        <Card>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Header3
              color="primary"
              numberOfLines={1}
              style={{ flex: 1, marginRight: 5 }}
            >
              Scegli il prezzo
            </Header3>
            <Button
              style={{ borderRadius: 13, padding: 4 }}
              onPress={focusPrice}
            >
              <Icon
                name="edit"
                size={22}
                style={{
                  color: colors.black
                }}
              />
            </Button>
          </View>
          <PriceInput
            onChangeText={setPrice}
            value={price}
            containerStyle={{ marginVertical: 5, alignSelf: "center" }}
            onFocus={() => setPrice("")}
          />
        </Card>
      </OffertInfo>
      <DecisionBox>
        <FullButton
          value="Fai una offerta"
          icon="tags"
          style={{ marginBottom: 6 }}
          contentStyle={{ flex: 1, textAlign: "center" }}
        />
      </DecisionBox>
    </View>
  );
};

const DecideOffert = ({ item, offert }) => {
  console.log(item, offert);
  return (
    <View style={{ flex: 1 }}>
      <OffertInfo item={item}>
        <Card>
          <Header2 color="secondary">Offerta</Header2>
          <Header1 color="primary">EUR {offert.value}</Header1>
        </Card>
      </OffertInfo>
      <DecisionBox>
        <FullButton
          value="Rifiuta"
          icon="times"
          style={{ marginVertical: 4 }}
          contentStyle={{ flex: 1, textAlign: "center" }}
          color={"darkRed"}
        />
        <FullButton
          value="Accetta"
          icon="check"
          style={{ marginBottom: 6 }}
          contentStyle={{ flex: 1, textAlign: "center" }}
        />
      </DecisionBox>
    </View>
  );
};

const EditOffert = ({item, offert}) => {
  return (
    <View style={{ flex: 1 }}>
      <OffertInfo item={item}>
        <Card>
          <Header2 color="secondary">Offerta</Header2>
          <Header1 color="primary">EUR {offert.value}</Header1>
        </Card>
      </OffertInfo>
      <DecisionBox>
        <FullButton
          value="Rifiuta"
          icon="times"
          style={{ marginVertical: 4 }}
          contentStyle={{ flex: 1, textAlign: "center" }}
          color={"darkRed"}
        />
        <FullButton
          value="Accetta"
          icon="check"
          style={{ marginBottom: 6 }}
          contentStyle={{ flex: 1, textAlign: "center" }}
        />
      </DecisionBox>
    </View>
  );
}

const OffertInfo = ({ item, children }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <ListMultiItem data={item} isSingle={false} pk={item._id} />
      <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 5 }}>
        {children}
      </View>
    </ScrollView>
  );
};

const DecisionBox = ({ children }) => {
  return <View style={{ margin: 10 }}>{children}</View>;
};

export class BookOffert extends Component {
  constructor(props) {
    super(props);
    this.type = props.navigation.getParam("type", null);
    const objectID = props.navigation.getParam("objectID", null);
    const chatID = props.navigation.getParam("chatID", null);
    this.state = {
      objectID,
      chatID,
      price:
        this.type == ChatType.sales
          ? props.salesData[objectID].price.toString()
          : props.shoppingData[objectID].chats[chatID].item.price.toString()
    };
  }

  offertExists;

  componentDidUpdate(prevProps){
    const { offert } = this.getData();

    if(this.offertExists!=null && offert && !this.offertExists){
      this.offertExists = true;
    } else if(this.offertExists!=null && !offert && this.offertExists){
      this.offertExists = false;
    }
  }

  static propTypes = {
    //type: PropTypes.string,
  };

  setPrice = price => this.setState({ price });

  setPriceRef = ref => {
    this.priceInput = ref;
    console.log(ref);
  };

  focusPrice = () => this.priceInput.focus();

  getData = () => {
    const { objectID, chatID } = this.state;

    if (this.type == ChatType.sales) {
      const { chats, newsCount, offert, ...item } = this.props.salesData[
        objectID
      ];
      return {
        item: {
          ...item,
          seller: mockData.item.seller //TEST
        },
        //offert
        offert: mockData.offert //mock
      };
    } else {
      const { UserTO, item, offert } = this.props.shoppingData[objectID].chats[
        chatID
      ];
      return {
        item: {
          ...item,
          seller: mockData.item.seller //TEST
        },
        /*item: {
          ...item,
          seller: UserTO
        },*/
        //offert
        offert: mockData.offert //mock
      };
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <BasicHeader title="Fai una offerta" />
        {this.renderContent()}
      </View>
    );
  }

  renderContent = () => {
    const data = this.getData();
    console.log(data);
    let type;
    if(!!data.offert){
      type="Create";
      return (
        <CreateOffert
          {...data}
          price={this.state.price}
          setPrice={this.setPrice}
          setPriceRef={this.setPriceRef}
          focusPrice={this.focusPrice}
        />
      );
      } else if(data.offert.creator.pk == this.props.user){
      type="Edit";
    } else {
      type = "Decide";
      return <DecideOffert {...data} />;
    }
  };
}

const mapStateToProps = state => ({
  salesData: state.sales.data,
  shoppingData: state.shopping.data
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookOffert);

const mockData = {
  item: {
    pk: 1,
    book: {
      isbn: 1,
      title: "Matematica Verde 1",
      author: "Massimo Bergamini",
      subject: {
        title: "matematica",
        _id: 1
      }
    },
    price: 15,
    condition: 1,
    image_ad: ["AAA"],
    seller: {
      id: 1,
      user: {
        username: "Federico"
      },
      classM: {
        office: {
          id: 1,
          name: "I.I.S.S. J. Von Neumann",
          address: "via Pollenza 156, Roma",
          cap: "00156",
          type: "SP"
        }
      }
    }
  },
  offert: {
    creator: {
      pk: 1,
      username: "Alberto"
    },
    createdAt: "06/05/2019-12:02:14",
    value: 15,
    status: "pending"
  }
};
