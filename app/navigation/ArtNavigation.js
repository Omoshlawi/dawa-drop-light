import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import {
  ARTModelForm,
  ARTModels,
  GroupLeadDetail,
  GroupLeadForm,
  GroupLeads,
} from "../screens/art";

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
      <Screen
        name={routes.ART_GROUP_LEADS_SCREEN}
        component={GroupLeads}
        options={{ title: "Managet ART Distribution Group Leads" }}
      />
      <Screen
        name={routes.ART_GROUP_LEAD_DETAIL_SCREEN}
        component={GroupLeadDetail}
        options={{ title: "" }}
      />
      <Screen
        name={routes.ART_GROUP_LEADS_FORM_SCREEN}
        component={GroupLeadForm}
        options={{ title: "" }}
      />
    </Navigator>
  );
};

export default ArtNavigation;
