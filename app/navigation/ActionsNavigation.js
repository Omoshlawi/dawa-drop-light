import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import { RoleForm, Roles } from "../screens/permisions";
import { Appointments } from "../screens/orders";

const { Navigator, Screen } = createStackNavigator();

const ActionsNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.ACTION_ROLES_SCREEN}
        component={Roles}
        options={{ title: "Roles and Privileges" }}
      />
      <Screen
        name={routes.ACTION_ROLE_FORM_SCREEN}
        component={RoleForm}
        options={{ title: "" }}
      />
      <Screen
        name={routes.ACTION_APPOINTMENTS_SCREEN}
        component={Appointments}
        options={{ title: "Appointments" }}
      />
    </Navigator>
  );
};

export default ActionsNavigation;
