import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import {
  Privileges,
  RoleDetail,
  RoleForm,
  Roles,
  PrivilegeForm,
  PrivilegeDetail,
} from "../screens/permisions";

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
      <Screen
        name={routes.PERMISIONS_PRIVILEGES_SCREEN}
        component={Privileges}
        options={{ title: "Manage Privileges" }}
      />
      <Screen
        name={routes.PERMISIONS_PRIVILEGE_DETAIL_SCREEN}
        component={PrivilegeDetail}
        options={{ headerShown: false }}
      />
      <Screen
        name={routes.PERMISIONS_PRIVILEGE_FORM_SCREEN}
        component={PrivilegeForm}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};

export default PermisionsNavigation;
