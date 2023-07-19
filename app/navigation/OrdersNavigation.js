import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import {
  Appointments,
  DeliveryModeForm,
  DeliveryModes,
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
    </Navigator>
  );
};

export default OrdersNavigation;
