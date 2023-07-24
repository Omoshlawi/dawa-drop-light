import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import {
  Appointments,
  DeliveryModeForm,
  DeliveryModes,
  DeliveryTimeSlots,
  FeedBackForm,
  Orders,
  PatientOrderForm,
} from "../screens/orders";

const { Navigator, Screen } = createStackNavigator();

const OrdersNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.ORDERS_APPOINMENTS_SCREEN}
        component={Appointments}
        options={{ title: "Appointments" }}
      />
      <Screen
        name={routes.ORDERS_DELIVERY_MODES_SCREEN}
        component={DeliveryModes}
        options={{ title: "Manage Delivery Modes" }}
      />
      <Screen
        name={routes.ORDERS_DELIVERY_MODES_FORM_SCREEN}
        component={DeliveryModeForm}
        options={{ title: "" }}
      />
      <Screen
        name={routes.ORDERS_ORDERS_SCREEN}
        component={Orders}
        options={{ title: "Orders" }}
      />
      <Screen
        name={routes.ORDERS_PATIENT_ORDER_FORM_SCREEN}
        component={PatientOrderForm}
        options={{ title: "" }}
      />
      <Screen
        name={routes.ORDERS_DELIVERY_FEEDBACK_FORM_SCREEN}
        component={FeedBackForm}
        options={{ title: "" }}
      />
      <Screen
        name={routes.ORDERS_DELIVERY_TIMESLOTES_SCREEN}
        component={DeliveryTimeSlots}
        options={{ title: "Manage TimeSlots" }}
      />
      <Screen
        name={routes.ORDERS_DELIVERY_TIMESLOTES_FORM_SCREEN}
        component={DeliveryModeForm}
        options={{ title: "" }}
      />
    </Navigator>
  );
};

export default OrdersNavigation;
