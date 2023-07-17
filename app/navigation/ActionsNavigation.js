import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import { RoleDetail, RoleForm, Roles } from "../screens/permisions";
import { Appointments } from "../screens/orders";

const { Navigator, Screen } = createStackNavigator();

const ActionsNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.ACTION_APPOINTMENTS_SCREEN}
        component={Appointments}
        options={{ title: "Appointments" }}
      />
    </Navigator>
  );
};

export default ActionsNavigation;
