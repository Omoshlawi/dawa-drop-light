import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import {
  ChangePassword,
  CreateProfileScreen,
  DefaultScreen,
  ProfileUpdate,
} from "../screens/user";

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
      <Screen
        name={routes.USER_DEFAULT_SCREEN}
        component={DefaultScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name={routes.USER_CREATE_PROFILE_SCREEN}
        component={CreateProfileScreen}
        options={{ title: "Create profile" }}
      />
    </Navigator>
  );
};

export default UserNavigation;
