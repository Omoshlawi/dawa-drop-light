import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import {
  ARTGroupDetail,
  ARTGroupForm,
  ARTGroups,
  ARTModelForm,
  ARTModels,
  AddNewMemberToGroupForm,
  DistributionEventDetail,
  DistributionEventForm,
  DistributionEvents,
  GroupLeadDetail,
  GroupLeadForm,
  GroupLeads,
} from "../screens/art";
import { IconButton } from "react-native-paper";

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
        options={({ navigation, route }) => {
          const { artGroupLead, artModels, users } = route.params;
          return {
            headerRight: (props) => (
              <IconButton
                icon="square-edit-outline"
                {...props}
                onPress={() =>
                  navigation.navigate(routes.ART_NAVIGATION, {
                    screen: routes.ART_GROUP_LEADS_FORM_SCREEN,
                    params: { artModels, users, artGroupLead },
                  })
                }
              />
            ),
            title: "Group Lead Detail",
          };
        }}
      />
      <Screen
        name={routes.ART_GROUP_LEADS_FORM_SCREEN}
        component={GroupLeadForm}
        options={{ title: "" }}
      />
      <Screen
        name={routes.ART_GROUPS_FORM_SCREEN}
        component={ARTGroupForm}
        options={{ title: "" }}
      />
      <Screen
        name={routes.ART_GROUP_SCREEN}
        component={ARTGroups}
        options={{ title: "Manage ART Groups" }}
      />
      <Screen
        name={routes.ART_GROUP_DETAIL_SCREEN}
        component={ARTGroupDetail}
        options={{ title: "" }}
      />
      <Screen
        name={routes.ART_GROUP_ADD_NEW_MEMBER_FORM_SCREEN}
        component={AddNewMemberToGroupForm}
        options={{ title: "Add Paticipant" }}
      />
      <Screen
        name={routes.ART_DISTRIBUTION_EVENTS_SCREEN}
        component={DistributionEvents}
        options={{ title: "Distribution Events" }}
      />
      <Screen
        name={routes.ART_DISTRIBUTION_EVENTS_DETAIL_SCREEN}
        component={DistributionEventDetail}
        options={{ title: "" }}
      />
      <Screen
        name={routes.ART_DISTRIBUTION_EVENTS_FORM_SCREEN}
        component={DistributionEventForm}
        options={{ title: "" }}
      />
    </Navigator>
  );
};

export default ArtNavigation;
