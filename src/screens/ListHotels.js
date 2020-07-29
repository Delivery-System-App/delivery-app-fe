import React,{ useState } from 'react';
import {Screen,NavigationBar,ListView, View,ScrollView, Button} from 'react-native';
import {SearchBar,ListItem} from 'react-native-elements';
import tailwind from "tailwind-rn";
import {RestaurantItem} from '../components';
export default function ListHotels(){
    const [state, setState] = useState({
        search:'',
        restaurants:[
            {
              "name": "Gaspar Brasserie",
              "id":"1",
              "address": "185 Sutter St, San Francisco, CA 94109",
              "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" },
            },
            {
              "name": "Chalk Point Kitchen",
              "id":"2",
              "address": "527 Broome St, New York, NY 10013",
              "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-2.jpg" },
            },
            {
              "name": "Kyoto Amber Upper East",
              "id":"3",
              "address": "225 Mulberry St, New York, NY 10012",
              "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg" },
            },
            {
              "name": "Sushi Academy",
              "id":"4",
              "address": "1900 Warner Ave. Unit A Santa Ana, CA",
              "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-4.jpg" },
            },
            {
              "name": "Sushibo",
              "id":"5",
              "address": "35 Sipes Key, New York, NY 10012",
              "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-5.jpg" },
            },
            {
              "name": "Mastergrill",
              "id":"6",
              "address": "550 Upton Rue, San Francisco, CA 94109",
              "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-6.jpg" },
            }
          ],
    });
    function filterResults(property, srch) {
      return state.restaurants.filter(
          (restaurants) =>
              restaurants[property].toLowerCase().indexOf(srch.toLowerCase()) !== -1
      );
  }
    const handleSearch=()=>{
      const currentSearch = state.search;
        let currentMatches = [];
        currentMatches = currentMatches.concat(
            filterResults("name", currentSearch)
        );
        console.log(currentMatches)
    }
    
    console.log(state.restaurants);
    
      return (
        
        <View>
          <SearchBar
        placeholder="Type Here..."
        onChangeText={(search)=>setState({...state,search})}
        value={state.search}
      />
      <Button title={"Apply"} onPress={handleSearch}></Button>
      <ScrollView>
      {
    state.restaurants.map((l, i) => (
      <ListItem
        key={i}
        leftAvatar={{ source: { uri: l.image.url } }}
        title={l.name}
        subtitle={l.address}
        bottomDivider
      />
    ))
  }
                </ScrollView>
        </View>
      );
    }
  