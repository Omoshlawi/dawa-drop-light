import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import routes from "./routes";
import LoginScreen from "../screens/auth/LoginScreen";
import Register from "../screens/auth/Register";

const Stack = createStackNavigator();

const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

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
        component={LoginScreen}
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
