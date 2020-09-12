import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Segment,
  Content,
  Text,
  Image,
  CardItem,
} from "native-base";
import { useDispatch } from "react-redux";
import { filter, getBookingDetailOfUser } from "../../redux/actions";
import { View } from "react-native-animatable";
import { Card } from "react-native-paper";

const OrdersScreen = ({ navigation }) => {
  const [show, setShow] = useState("active");
  const [orders, setOrders] = useState([]);
  const [filteredValue, setFilteredValue] = useState([]);
  let bookingList = useState();
  const dispatch = useDispatch();
  const getOrders = async () => {
    try {
      console.log("im calleddd2");

      await dispatch(getBookingDetailOfUser()).then((res) => {
        if (res.status == 200) {
          if (res.data) {
            setOrders(res.data.data);
            console.log(res.data.data);
          }
        }
      });
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setShow("active");
      getOrders();
      applyFilter("deliveryStatus", "Pending");
    });
    return unsubscribe;
  }, []);

  const applyFilter = (name, status) => {
    setFilteredValue(
      orders.filter((booking) => {
        return booking[name] === status;
      })
    );
  };

  if (filteredValue.length > 0) {
    bookingList = filteredValue.map((booking) => {
      let dishes = booking.dish.map((dish) => {
        return dish;
      });
      return (
        <Card key={booking.boodId} style={{ marginVertical: 10 }}>
          <CardItem header>
            <Text>{booking.restaurantName.toUpperCase()}</Text>
          </CardItem>
          {dishes.map((dish) => {
            return (
              <CardItem key={dish.dishId}>
                <Text>
                  {dish.name} x {dish.quantity} = {dish.quantity * dish.price}
                </Text>
              </CardItem>
            );
          })}
          <CardItem header>
            <Text>Total Amount:{booking.totalAmount}</Text>
          </CardItem>
        </Card>
      );
    });
  }

  return (
    <Container>
      <Header hasSegment>
        <Body style={{ alignItems: "center" }}>
          <Title>ORDERS</Title>
        </Body>
      </Header>
      <Segment>
        <Button
          first
          onPress={() => {
            setShow("active");
            applyFilter("deliveryStatus", "Pending");
          }}
          active={show === "active" ? true : false}
        >
          <Text>ACTIVE</Text>
        </Button>
        <Button
          onPress={() => {
            setShow("delivered");
            applyFilter("deliveryStatus", "Delivered");
          }}
          active={show === "delivered" ? true : false}
        >
          <Text>DELIVERED</Text>
        </Button>
        <Button
          last
          onPress={() => {
            setShow("cancelled");
            applyFilter("cancelStatus", "Cancelled");
          }}
          active={show === "cancelled" ? true : false}
        >
          <Text>CANCELLED</Text>
        </Button>
      </Segment>
      <Content padder style={{ backgroundColor: "#667EEA" }}>
        {filteredValue.length > 0 ? (
          bookingList
        ) : (
          <Text>No orders to display!!</Text>
        )}
      </Content>
    </Container>
  );
};

export default OrdersScreen;
