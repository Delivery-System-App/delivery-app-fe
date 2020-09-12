import React, { Component, useEffect, useState } from "react";
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
} from "native-base";
import { useIsFocused } from "@react-navigation/native";
const OrdersScreen = () => {
  const [show, setShow] = useState("active");

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
          }}
          active={show === "active" ? true : false}
        >
          <Text>ACTIVE</Text>
        </Button>
        <Button
          onPress={() => {
            setShow("delivered");
          }}
          active={show === "delivered" ? true : false}
        >
          <Text>DELIVERED</Text>
        </Button>
        <Button
          last
          onPress={() => {
            setShow("cancelled");
          }}
          active={show === "cancelled" ? true : false}
        >
          <Text>CANCELLED</Text>
        </Button>
      </Segment>
      <Content padder>
        <Text>Orders to be displayed</Text>
      </Content>
    </Container>
  );
};

export default OrdersScreen;
