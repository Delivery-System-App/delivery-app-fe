import React from "react";
import {View,Text,ImageBackground,Image, Button} from "react-native";
export default function RestaurantItem({restaurant}){
    console.log(restaurant);

    if (!restaurant) {
      return null;
    }
    const returnId=()=>{
      console.log(restaurant.id)
    }
    return (
      <View 
      key={restaurant.id}
      >
        <Image
          style={{width: 400, height: 400}}
          source={{ uri: restaurant.image.url }}
          
        ></Image>
          <Text>{restaurant.name}
          </Text>
          <Text>
              {restaurant.address}
          </Text>
        <Button title={"GetId"} onPress={returnId}></Button>
      </View>
    );
  }