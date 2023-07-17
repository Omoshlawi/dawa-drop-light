import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import { RoleDetail, RoleForm, Roles } from "../screens/permisions";

const { Navigator, Screen } = createStackNavigator();

const PermisionsNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.PERMISION_ROLES_SCREEN}
        component={Roles}
        options={{ title: "Manage Roles" }}
      />
      <Screen
        name={routes.PERMISIONS_ROLE_FORM_SCREEN}
        component={RoleForm}
        options={{ title: "" }}
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

export default PermisionsNavigation;
