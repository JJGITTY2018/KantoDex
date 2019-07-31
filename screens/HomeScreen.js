import * as WebBrowser from "expo-web-browser";
import React, { Component } from "react";
import axios from "axios";

import {
  Dimensions,
  SafeAreaView,
  Image,
  Platform,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  List,
  View
} from "react-native";

import { ScrollView, FlatList } from "react-navigation";

// import { MonoText } from '../components/StyledText';



const numColumns = 3;

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
    let data = arrayObj

    for(let i = 0; i < data.length; i++){
      data[i]['sprites'] = this.getPokemonSpriteLink(i+1)
      data[i]['key'] = (i + 1)
      data[i]['name'] = data[i]['name'][0].toUpperCase() + data[i]['name'].slice(1)
    }
    this.setState({data})
    // console.log(this.state)
  }

  //function to render state on <Text></Text> //

  renderPokemon = ({item,index}) => {
    return(
      <View style = {styles.item}>
      <Text>
        {item.key}
      </Text>
        <Image 
        style={{ width: 88, height: 77 }}
        source = {{uri: item.sprites}}
        />
        <Text>
          {item.name}
        </Text>
        </View>
    )
  }

  componentDidMount = () => {
    this.getPokemonList();
  };

  render() {
    console.log(this.state)
    // const keyExtractor = this.state.pokeData.pokeIndex
    return (
      <SafeAreaView>
      <FlatList
        data = {this.state.data}
        renderItem = {this.renderPokemon}
        numColumns = {numColumns}
        style = {styles.container}
      
        />
      </SafeAreaView>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#FFF",
    // marginVertical: 20,
    marginTop: Dimensions.get('window').height * .038,
  },

  item: {
    // backgroundColor: '#4D243D',
    padding: 1,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },


});
