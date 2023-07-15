import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import { Roles } from "../screens/permisions";
import { Appointments } from "../screens/patients";

const { Navigator, Screen } = createStackNavigator();

const ActionsNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.ACTION_ROLES_SCREEN}
        component={Roles}
        options={{ headerShown: false }}
      />
      <Screen
        name={routes.ACTION_APPOINTMENTS_SCREEN}
        component={Appointments}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};

export default ActionsNavigation;
