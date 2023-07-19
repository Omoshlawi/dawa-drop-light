import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import { Appointments } from "../screens/orders";

const { Navigator, Screen } = createStackNavigator();

const OrdersNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.ORDERS_APPOINMENTS_SCREEN}
        component={Appointments}
        options={{ title: "Appointments" }}
      />
    </Navigator>
  );
};

export default OrdersNavigation;
