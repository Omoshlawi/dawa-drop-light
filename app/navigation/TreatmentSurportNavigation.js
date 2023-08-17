import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import { RoleDetail, RoleForm, Roles } from "../screens/permisions";
import {
  AcceptInvitation,
  CareGiverForm,
  CareReceiversForm,
  MyTreatmentSurport,
  ProvidorTreatmentSurportForm,
  TreatmentSurportDetail,
  TreatmentSurporters,
} from "../screens/tsurport";

const { Navigator, Screen } = createStackNavigator();

const TreatmentSurportNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.TREATMENT_SURPORT_SCREEN}
        component={TreatmentSurporters}
        options={{ title: "Manage Treatment surport" }}
      />
      <Screen
        name={routes.TREATMENT_SURPORT_PROVIDOR_FORM_SCREEN}
        component={ProvidorTreatmentSurportForm}
        options={{ title: "" }}
      />
      <Screen
        name={routes.TREATMENT_SURPORT_MY_SURPORTERS_FORM_SCREEN}
        component={MyTreatmentSurport}
        options={{ title: "Care givers/Care receivers" }}
      />
      <Screen
        name={routes.TREATMENT_SURPORT_CAREGIVER_FORM_SCREEN}
        component={CareGiverForm}
        options={{ title: "" }}
      />
      <Screen
        name={routes.TREATMENT_SURPORT_CARERECEIVER_FORM_SCREEN}
        component={CareReceiversForm}
        options={{ title: "" }}
      />
      <Screen
        name={routes.TREATMENT_SURPORT_DETAIL_SCREEN}
        component={TreatmentSurportDetail}
        options={{ title: "" }}
      />
      <Screen
        name={routes.TREATMENT_SURPORT_ACCEPT_INVITE_SCREEN}
        component={AcceptInvitation}
        options={{ title: "" }}
      />
    </Navigator>
  );
};

export default TreatmentSurportNavigation;
