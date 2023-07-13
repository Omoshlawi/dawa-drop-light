import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import ChangePassword from "../screens/user/ChangePassword";
import ProfileUpdate from "../screens/user/ProfileUpdate";

const { Navigator, Screen } = createStackNavigator();

const UserNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.USER_CHANGE_PWD_SCREEN}
        component={ChangePassword}
        options={{ headerTitle: "Change password" }}
      />
      <Screen
        name={routes.USER_CHANGE_PROFILE_UPDATE_SCREEN}
        component={ProfileUpdate}
        options={{ headerTitle: "" }}
      />
    </Navigator>
  );
};

export default UserNavigation;
