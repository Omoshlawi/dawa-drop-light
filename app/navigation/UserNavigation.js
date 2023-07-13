import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import ChangePassword from "../screens/user/ChangePassword";

const { Navigator, Screen } = createStackNavigator();

const UserNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.USER_CHANGE_PWD_SCREEN}
        component={ChangePassword}
        options={{ headerTitle: "Change password" }}
      />
    </Navigator>
  );
};

export default UserNavigation;
