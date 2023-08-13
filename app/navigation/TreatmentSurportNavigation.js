import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import { RoleDetail, RoleForm, Roles } from "../screens/permisions";
import { ProvidorTreatmentSurportForm, TreatmentSurporters } from "../screens/tsurport";

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
    </Navigator>
  );
};

export default TreatmentSurportNavigation;
