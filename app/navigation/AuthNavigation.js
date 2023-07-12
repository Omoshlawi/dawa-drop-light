import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import routes from "./routes";

const { Navigator, Screen } = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.AUTH_WELCOME_SCREEN}
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name={routes.AUTH_LOGIN_SCREEN}
        component={Login}
        options={{ title: "Login" }}
      />
      <Screen
        name={routes.AUTH_REGISTER_SCREEN}
        component={Register}
        options={{ title: "Register" }}
      />
    </Navigator>
  );
};

export default AuthNavigation;
