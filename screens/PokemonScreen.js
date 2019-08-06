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

export default class PokeDexInfo extends Component {
  state = {
    name: "",
    type: "",
    hp: "",
    height: "",
    weight: "",
    attack: "",
    speed: "",
    defence: "",
    specialDefence: "",
    specialAttack: "",
  };


  pokemonTypeArray = (array) => {
    let y = []
    let count = 0
    for (slot of array){
      y.push(array[count].type.name)
      count = count + 1
    }
    this.setState({'type': y })
  }
  
  getPokemonStats = () => {
    //Props passed on to PokeMonScreen by renderPokemon()
    //get Pokemon URL and Render Pokemon Information

    const item = this.props.navigation.getParam('item')
    this.setState({ index: item.key })
    this.setState({ name: item.name })
    this.setState({ sprites: item.sprites })

    //item.url from Pokemon and call axios then render state with pokemon info
    axios.get(item.url).then((result) => {
      this.setState({ height: result.data.height })
      this.setState({ weight: result.data.weight })
      this.setState({ speed: result.data.stats[0].base_stat })
      this.setState({ specialDefence: result.data.stats[1].base_stat })
      this.setState({ specialAttack: result.data.stats[2].base_stat })
      this.setState({ defence: result.data.stats[3].base_stat })
      this.setState({ attack: result.data.stats[4].base_stat })
      this.setState({ hp: result.data.stats[5].base_stat })
      this.pokemonTypeArray(result.data.types)
      return result
    }).then((result) => {
      this.getPokemonSpecies(this.state.index)
    }).catch((err) => {

    });
  }

  //helper function to get ENG text from PokeDex - Loop Tru Array and find if languages in ENG.
  getEngTEXT = (array) => {
    let textArr = []
    let x = array.map((el)=> {
      // console.log(!textArr.includes(el.flavor_text))
      el.language.name === "en" && !textArr.includes(el.flavor_text) ?  textArr.push(el.flavor_text) : null
    })
    this.setState({pokemonDescription: textArr})
  }

  //use on GetPokemonStats HP/ ATK / SPEED / ETC BASE STATS.
  getPokemonSpecies = (index) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${index}/`)
    .then((result) => {
      this.setState({evolutionTreeURL: result.data.evolution_chain.url})
      this.getEngTEXT(result.data.flavor_text_entries)
    }).then(() => {
      this.getPokemonEvolutionTree(this.state.evolutionTreeURL)
    }).catch((err) => {
      
    })
  }


  getPokemonEvolutionTree = (url) => {
  axios.get(url).then((result) => {
    // console.log(result.data.chain.species.name)
    // console.log(result.data.chain.evolves_to[0].species.name)
    // console.log(result.data.chain.evolves_to[0].evolves_to[0].species.name)
    }

  )
}
 
getEvolutions = (data) {
  let list = []
  list.push(data.chain.species.name)

  let evolveTo = data.chain.evolves_to

  while (evolveTo.length !== 0) {

    for (let i = 0; i <= evolveTo.length; i++) {
      if (evolveTo[i] !== undefined) {
        list.push(evolveTo[i].species.name)
        if (evolveTo.length - 1 === i) {
          evolveTo = evolveTo[i].evolves_to
        }
      }
    }
  }
  return list

}

  componentDidMount = () => {
    this.getPokemonStats()
   

  };

  render() {
    
    return (
      <SafeAreaView>
      <View>
        <Text>Hello World!</Text>
      </View>
      </SafeAreaView>
    );
  }
}

PokeDexInfo.navigationOptions = {
  title: "Pokemon"
};


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#FFF",
    // marginVertical: 20,
    // marginTop: Dimensions.get('window').height * .038,
  },

  item: {
    padding: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#424242',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    // height: Dimensions.get('window').width / numColumns, // approximate a square
  },


});
