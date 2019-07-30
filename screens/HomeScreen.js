import * as WebBrowser from "expo-web-browser";
import React, { Component } from "react";
import axios from "axios";

import {
  SafeAreaView,
  Image,
  Platform,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  View
} from "react-native";

import { ScrollView, FlatList } from "react-navigation";

// import { MonoText } from '../components/StyledText';

export default class HomeScreen extends Component {
  state = {};

  getPokemonList = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?limit=151")
      .then(result => {
        let data = result.data.results;
        this.setToState(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getPokemonSpriteLink = num => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png`;
  };

  //Function to set the Pokemon Index, SpriteLink, and Name onto the React state //
  setToState = arrayObj => {
    let pokemonData = {};
    let inputRaw = arrayObj.map((el, i) => {
      pokemonData[i + 1] = {
        link: this.getPokemonSpriteLink(i + 1),
        name: el.name,
        index: i + 1
      };
    });
    this.setState({ pokemonData });
  };

  componentDidMount = () => {
    this.getPokemonList();
  };

  render() {
    return (
      <SafeAreaView>
      </SafeAreaView>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
