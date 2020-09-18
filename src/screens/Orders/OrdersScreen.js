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
import { Alert } from "react-native";
import { getBookingDetailOfUser, cancelBooking } from "../../redux/actions";
import { Card } from "react-native-paper";
import Loader from "../../../utils/loader";
import { notify } from "./../../../utils/notify";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";

const OrdersScreen = ({ navigation }) => {
  const [show, setShow] = useState("");
  const [orders, setOrders] = useState([]);
  const [filteredValue, setFilteredValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(Math.random());
  let bookingList = useState();
  const dispatch = useDispatch();

  const getOrders = async () => {
    try {
      setLoading(true);
      dispatch(getBookingDetailOfUser()).then((res) => {
        if (res.status == 200) {
          if (res.data) {
            setOrders(res.data.data);
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
    getOrders();
    setShow("active");
    applyFilter("deliveryStatus", "Pending");
  }, [render]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getOrders();
      setShow("active");
      applyFilter("deliveryStatus", "Pending");
    });
    return unsubscribe;
  }, []);
  const CancelBookings = (bookId) => {
    dispatch(cancelBooking([bookId], { deliveryStatus: "cancelled" })).then(
      (res) => {
        console.log(res);
        notify("order cancelled!!");
        setRender(Math.random());
      }
    );
  };
  const alertFucntion = (bookId) =>
    Alert.alert(
      "Cancel Order",
      "You are about to cancel this order",
      [
        {
          text: "Back",
          onPress: () => console.log("Back Pressed"),
          style: "cancel",
        },
        { text: "Cancel", onPress: () => CancelBookings(bookId) },
      ],
      { cancelable: false }
    );
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
        <Card key={index} style={{ marginVertical: 10, borderRadius: 8 }}>
          <CardItem
            bordered
            header
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                textShadowRadius: 10,
                textShadowColor: "#667EEA",
              }}
            >
              {booking.restaurantName.toUpperCase()}
            </Text>
            <Text style={{ fontSize: 12 }}>
              {moment(booking.createdAt).format("MMM Do YY")}
            </Text>
          </CardItem>
          {dishes.map((dish) => {
            return (
              <CardItem key={dish.dishId} bordered>
                <Text style={{ fontSize: 11 }}>
                  {dish.name} x {dish.quantity} = {dish.quantity * dish.price}
                </Text>
              </CardItem>
            );
          })}

          <CardItem
            header
            bordered
            style={{
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <Text>Total Amount:{booking.totalAmount}</Text>
            {moment(booking.createdAt).fromNow().split(" ")[1] === "minutes" &&
              Number(moment(booking.createdAt).fromNow()[0]) <= 15 &&
              show !== "cancelled" && (
                <TouchableOpacity
                  style={{
                    padding: 5,
                    marginLeft: 5,
                    backgroundColor: "lightgray",
                    borderRadius: 10,
                  }}
                  onPress={() => alertFucntion(booking.bookId)}
                >
                  <Text style={{ color: "red" }}>cancel</Text>
                </TouchableOpacity>
              )}
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
            applyFilter("deliveryStatus", "cancelled");
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
