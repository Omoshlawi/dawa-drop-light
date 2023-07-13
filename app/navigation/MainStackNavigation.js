import { createStackNavigator } from "@react-navigation/stack";
import { useUserContext } from "../context/hooks";
import AuthNavigation from "./AuthNavigation";
import BottomTabNavigation from "./BottomTabNavigation";
import routes from "./routes";
import UserNavigation from "./UserNavigation";

const { Navigator, Screen } = createStackNavigator();

const MainStackNavigation = () => {
  const { token } = useUserContext();
  const isLoggedIn = Boolean(token);
  return (
    <Navigator>
      {isLoggedIn ? (
        <>
          <Screen
            name={routes.BTAB_NAVIGATION}
            component={BottomTabNavigation}
            options={{ headerShown: false }}
          />
          <Screen
            name={routes.USER_NAVIGATION}
            component={UserNavigation}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Screen
          name={routes.AUTH_NAVIGATION}
          component={AuthNavigation}
          options={{ headerShown: false }}
        />
      )}
    </Navigator>
  );
};

export default MainStackNavigation;
