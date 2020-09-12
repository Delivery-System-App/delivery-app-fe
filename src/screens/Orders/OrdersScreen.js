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
import { getBookingDetailOfUser } from "../../redux/actions";
import { Card } from "react-native-paper";
import Loader from "../../../utils/loader";

const OrdersScreen = ({ navigation }) => {
  const [show, setShow] = useState("");
  const [orders, setOrders] = useState([]);
  const [filteredValue, setFilteredValue] = useState([]);
  const [loading, setLoading] = useState(false);
  let bookingList = useState();
  const dispatch = useDispatch();
  const getOrders = async () => {
    try {
      setLoading(true);
      dispatch(getBookingDetailOfUser()).then((res) => {
        if (res.status == 200) {
          if (res.data) {
            setOrders(res.data.data);
            console.log(res.data.data);
          }
        }
        setLoading(false);
      });
    } catch (err) {
      console.log("err", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getOrders();
      setShow("active");
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

  useEffect(() => {
    setShow("active");
    applyFilter("deliveryStatus", "Pending");
  }, [orders]);

  if (filteredValue.length > 0) {
    bookingList = filteredValue.map((booking, index) => {
      let dishes = booking.dish.map((dish) => {
        return dish;
      });
      return (
        <Card key={index} style={{ marginVertical: 10 }}>
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

  return loading ? (
    <Loader />
  ) : (
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
