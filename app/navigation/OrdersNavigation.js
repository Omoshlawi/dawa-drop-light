import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import {
  Appointments,
  DeliveryMethod,
  DeliveryMethodForm,
  DeliveryModeForm,
  DeliveryModes,
  DeliveryTimeSlotForm,
  DeliveryTimeSlots,
  FeedBackForm,
  OrderDetail,
  Orders,
  PatientOrderForm,
  ProvidorDeliveryRequests,
  ProvidorDeliveryTasks,
} from "../screens/orders";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { TouchableOpacity } from "react-native";

const { Navigator, Screen } = createStackNavigator();

const OrdersNavigation = () => {
  const { colors } = useTheme();
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
        component={DeliveryTimeSlotForm}
        options={{ title: "" }}
      />
      <Screen
        name={routes.ORDERS_DELIVERY_METHODSS_SCREEN}
        component={DeliveryMethod}
        options={{ title: "Manage Delivery methods" }}
      />
      <Screen
        name={routes.ORDERS_DELIVERY_METHOD_FORM_SCREEN}
        component={DeliveryMethodForm}
        options={{ title: "" }}
      />
      <Screen
        name={routes.ORDERS_ORDER_DETAIL_SCREEN}
        component={OrderDetail}
        options={({ navigation, route }) => ({
          title: "",
          headerRight: ({}) => {
            return (
              <TouchableOpacity
                style={{ paddingRight: 10 }}
                onPress={() => {
                  navigation.navigate(routes.ORDERS_NAVIGATION, {
                    screen: routes.ORDERS_PATIENT_ORDER_FORM_SCREEN,
                    params: route.params,
                  });
                }}
              >
                <MaterialCommunityIcons
                  name="square-edit-outline"
                  size={30}
                  color={colors.primary}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <Screen
        name={routes.ORDERS_PROVIDOR_DELIVERY_REQUESTS_SCREEN}
        component={ProvidorDeliveryRequests}
        options={{ title: "Delivery Requests" }}
      />
      <Screen
        name={routes.ORDERS_PROVIDOR_DELIVERY_HISTORY_SCREEN}
        component={ProvidorDeliveryTasks}
        options={{ title: "Delivery History" }}
      />
    </Navigator>
  );
};

export default OrdersNavigation;
