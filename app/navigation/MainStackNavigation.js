import { createStackNavigator } from "@react-navigation/stack";
import { useUserContext } from "../context/hooks";
import AuthNavigation from "./AuthNavigation";
import BottomTabNavigation from "./BottomTabNavigation";
import routes from "./routes";
import UserNavigation from "./UserNavigation";
import ActionsNavigation from "./ActionsNavigation";
import PermisionsNavigation from "./PermisionsNavigation";

const { Navigator, Screen } = createStackNavigator();

const MainStackNavigation = () => {
  const { token } = useUserContext();
  const isLoggedIn = Boolean(token);
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Screen
            name={routes.BTAB_NAVIGATION}
            component={BottomTabNavigation}
          />
          <Screen name={routes.USER_NAVIGATION} component={UserNavigation} />
          <Screen
            name={routes.ACTION_NAVIGATION}
            component={ActionsNavigation}
          />
          <Screen
            name={routes.PERMISIONS_NAVIGATION}
            component={PermisionsNavigation}
          />
        </>
      ) : (
        <Screen name={routes.AUTH_NAVIGATION} component={AuthNavigation} />
      )}
    </Navigator>
  );
};

export default MainStackNavigation;
