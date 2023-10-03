import { createStackNavigator } from "@react-navigation/stack";
import { useUserContext } from "../context/hooks";
import AuthNavigation from "./AuthNavigation";
import BottomTabNavigation from "./BottomTabNavigation";
import routes from "./routes";
import UserNavigation from "./UserNavigation";
import TreatmentSurportNavigation from "./TreatmentSurportNavigation";
import PermisionsNavigation from "./PermisionsNavigation";
import OrdersNavigation from "./OrdersNavigation";
import ArtNavigation from "./ArtNavigation";
import ChatsNavigation from "./ChatsNavigation";

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
            name={routes.TREATMENT_SURPORT_NAVIGATION}
            component={TreatmentSurportNavigation}
          />
          <Screen
            name={routes.PERMISIONS_NAVIGATION}
            component={PermisionsNavigation}
          />
          <Screen
            name={routes.ORDERS_NAVIGATION}
            component={OrdersNavigation}
          />
          <Screen name={routes.CHATS_NAVIGATION} component={ChatsNavigation} />
          <Screen name={routes.ART_NAVIGATION} component={ArtNavigation} />
        </>
      ) : (
        <Screen name={routes.AUTH_NAVIGATION} component={AuthNavigation} />
      )}
    </Navigator>
  );
};

export default MainStackNavigation;
