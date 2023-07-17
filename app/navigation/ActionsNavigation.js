import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import { RoleDetail, RoleForm, Roles } from "../screens/permisions";
import { Appointments } from "../screens/orders";

const { Navigator, Screen } = createStackNavigator();

const ActionsNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.PERMISION_ROLES_SCREEN}
        component={Roles}
        options={{ title: "Roles and Privileges" }}
      />
      <Screen
        name={routes.PERMISIONS_ROLE_FORM_SCREEN}
        component={RoleForm}
        options={{ title: "" }}
      />
      <Screen
        name={routes.ACTION_APPOINTMENTS_SCREEN}
        component={Appointments}
        options={{ title: "Appointments" }}
      />
      <Screen
        name={routes.PERMISIONS_ROLE_DETAIL_SCREEN}
        component={RoleDetail}
        // options={({ route }) => ({ title: `${route.params.name} role` })}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};

export default ActionsNavigation;
