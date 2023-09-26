import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { CardTitle } from "../../components/common";
import { Button, FAB } from "react-native-paper";
import { Dialog } from "../../components/dialog";
import moment from "moment/moment";
import routes from "../../navigation/routes";

const DispenseDetail = ({ route, navigation }) => {
  const order = route.params;
  return (
    <View style={{ paddingVertical: 10 }}>
      <ScrollView style={styles.screen}>
        <CardTitle text="Order id" subText={order._id} icon="cart" />
        {order.patient.length > 0 && (
          <CardTitle
            text={"Ordered for ?"}
            subText={`${order.patient[0].firstName} ${order.patient[0].lastName}`}
            icon="account"
          />
        )}
        <CardTitle
          text={"Date Ordered"}
          subText={moment(order.created).format("dddd Do MMMM yyy hh:mm")}
          icon="clock"
        />

        <CardTitle
          text={"Phone number"}
          subText={order.phoneNumber}
          icon="phone"
        />
        {order.appointment && (
          <CardTitle
            text={`${order.appointment.appointment_type} Appointment`}
            subText={`${moment(order.appointment.appointment_date).format(
              "Do ddd MMM yyyy"
            )}`}
            icon="calendar"
          />
        )}
        <CardTitle
          text={"Delivery Preference"}
          subText={
            order.deliveryMethoD === "in-person" ? "In Person" : "In Parcel"
          }
          icon="truck-fast"
        />
        {order.deliveryPerson && (
          <>
            <CardTitle
              text={"Who will deliver the drugs?"}
              subText={`${order.deliveryPerson.fullName} (${order.deliveryPerson.phoneNumber})`}
              icon="account"
            />
            <CardTitle
              text={"Pick up time?"}
              subText={`${moment(order.deliveryPerson.pickUpTime).format(
                "HH:mm"
              )} hrs`}
              icon="account"
            />
          </>
        )}
        <CardTitle
          text={"Adress"}
          subText={`${order.deliveryAddress.address}`}
          icon="google-maps"
        />

        {order.courrierService && (
          <CardTitle
            text={"Courrier service"}
            subText={order.courrierService.name}
            icon="bicycle"
          />
        )}
      </ScrollView>
      <Button
        mode="contained"
        style={{ margin: 10 }}
        onPress={() => {
          navigation.navigate(routes.ART_NAVIGATION, {
            screen: routes.ART_DISTRIBUTION_EVENTS_SERVICE_FORM_SCREEN,
            params: { order },
          });
        }}
      >
        Initiate Delivery
      </Button>
    </View>
  );
};

export default DispenseDetail;

const styles = StyleSheet.create({});
