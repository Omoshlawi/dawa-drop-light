import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import { Roles } from "../screens/permisions";

const { Navigator, Screen } = createStackNavigator();

const ActionsNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.ACTION_ROLES_SCREEN}
        component={Roles}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};

export default ActionsNavigation;
