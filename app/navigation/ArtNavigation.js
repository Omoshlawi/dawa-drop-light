import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import { ARTModelForm, ARTModels } from "../screens/art";

const { Navigator, Screen } = createStackNavigator();

const ArtNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.ART_MODELS_SCREEN}
        component={ARTModels}
        options={{ title: "Manage ART Models" }}
      />
      <Screen
        name={routes.ART_MODELS_FORM_SCREEN}
        component={ARTModelForm}
        options={{ title: "" }}
      />
    </Navigator>
  );
};

export default ArtNavigation;
