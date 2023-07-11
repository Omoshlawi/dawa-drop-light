import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import routes from "./routes";

const Stack = createStackNavigator();

const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const AuthNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.WELCOME_SCREEN}
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};

export default AuthNavigation;
