import React from "react";
import {View,Text,ImageBackground,Image} from "react-native";
export default function RestaurantItem({restaurant}){
    console.log(restaurant);

    if (!restaurant) {
      return null;
    }
  
    return (
      <View>
        <Image
          style={{width: 400, height: 400}}
          source={{ uri: restaurant.image.url }}

        ></Image>
          <Text styleName="md-gutter-bottom">{restaurant.name}
          </Text>
          <Text>
              {restaurant.address}
          </Text>
        
      </View>
    );
  }