import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import { ChatDetail } from "../screens/chats";

const { Navigator, Screen } = createStackNavigator();

const ChatsNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.CHATS_CONVERSATION_SCREEN}
        component={ChatDetail}
        options={({ navigation, route }) => ({
          title: route.params.event.title,
        })}
      />
    </Navigator>
  );
};

export default ChatsNavigation;
