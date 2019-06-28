import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GreyBar } from "../components/StatusBars";
import ItemHeader from "../components/Item/ItemHeader";
import MainItemPreview from "../components/Item/MainItemPreview";
import Button from "../components/Button";
import { Header2, Header3 } from "../components/Text";
import colors from "../styles/colors";

export class PreviewItem extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    condition: PropTypes.string,
    description: PropTypes.string,
    image_ad: PropTypes.object,
    price: PropTypes.string,
    seller: PropTypes.object
  };

  goBack = () => {
    this.props.navigation.goBack(null);
  };

  publish = () => {};

  render() {
    const { book, image_ad: image_ad_object, ...rest } = this.props;
    let image_ad = [];
    for (let i = 0; i < 5; i++) {
      if (image_ad_object[i]) image_ad.push(image_ad_object[i]);
      else break;
    }
    const data = { book, image_ad, ...rest };
    return (
      <View style={{ flex: 1 }}>
        <GreyBar />
        <ItemHeader
          handleGoBack={this.goBack}
          title={book.title}
          authors={book.author}
        />
        <View style={{ flex: 1 }}>
          <MainItemPreview data={data} />
        </View>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 30,
            backgroundColor: colors.white
          }}
        >
          <Button style={styles.publishButton}>
            <Header3 color={"white"}>Pubblica Inserzione</Header3>
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  book: state.sell.book,
  condition: state.sell.conditions,
  description: state.sell.description,
  image_ad: state.sell.previews,
  price: state.sell.price,
  seller: {
    _id: state.auth.id,
    classM: state.auth.gnumaUser.classM,
    user: {
      username: state.auth.username
    }
  }
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviewItem);

const styles = StyleSheet.create({
  publishButton: {
    backgroundColor: colors.secondary,
    elevation: 1,
    flexDirection: "row",
    padding: 8,
    justifyContent: "center",
    borderRadius: 6
  }
});
