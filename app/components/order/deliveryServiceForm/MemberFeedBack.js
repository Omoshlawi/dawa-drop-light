import { StyleSheet, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import { List, useTheme, Text, Surface } from "react-native-paper";
import { FormCheckBox } from "../../forms";

const MemberFeedBack = ({ event }) => {
  const { values } = useFormikContext();
  const { feedBacks, patientSubscribers, deliveryRequests } = event;
  const { colors, roundness } = useTheme();

  if (!values["member"]) return false;

  const feedBack = feedBacks.find(
    ({ user }) =>
      user ===
      patientSubscribers.find(({ _id }) => _id === values["member"])?.user
  );
  const deliveryRequest = deliveryRequests.find(
    ({ _id }) => _id === feedBack?.deliveryRequest
  );
  return (
    <View
      style={{
        margin: 10,
        padding: 10,
      }}
    >
      {!feedBack && (
        <Surface style={{ padding: 10, borderRadius: roundness }}>
          <Text>No feedback from the patient</Text>
        </Surface>
      )}
      {feedBack && (
        <>
          {feedBack.confirmedAttendance === true && (
            <Surface style={{ padding: 10, borderRadius: roundness }}>
              <Text>The patient confirmed attendance</Text>
            </Surface>
          )}

          {feedBack.confirmedAttendance === false && (
            <>
              <Text>Delivery Details</Text>
              <List.Item
                title={"Delivery address"}
                description={deliveryRequest?.deliveryAddress?.address}
                left={(props) => <List.Icon {...props} icon={"google-maps"} />}
              />
              <List.Item
                title={"Prefered delivery method"}
                description={deliveryRequest?.deliveryMethod?.name}
                left={(props) => <List.Icon {...props} icon={"cogs"} />}
              />
              {deliveryRequest?.courrierService && (
                <List.Item
                  title={"Prefered courrier service"}
                  description={deliveryRequest.courrierService.name}
                  left={(props) => <List.Icon {...props} icon={"truck-fast"} />}
                />
              )}
              <List.Item
                title={"Phone number"}
                description={deliveryRequest.phoneNumber}
                left={(props) => <List.Icon {...props} icon={"phone"} />}
              />
              {deliveryRequest?.deliveryPerson && (
                <>
                  <Text>Delivery person Detail</Text>
                  <List.Item
                    title={"Name"}
                    description={`${deliveryRequest.deliveryPerson.fullName}`}
                    left={(props) => <List.Icon {...props} icon={"account"} />}
                  />
                  <List.Item
                    title={"Phone number"}
                    description={`${deliveryRequest?.deliveryPerson?.phoneNumber}`}
                    left={(props) => <List.Icon {...props} icon={"phone"} />}
                  />
                  <List.Item
                    title={"National Id"}
                    description={`${deliveryRequest?.deliveryPerson?.nationalId}`}
                    left={(props) => (
                      <List.Icon {...props} icon={"identifier"} />
                    )}
                  />
                </>
              )}
            </>
          )}
          {feedBack.confirmedAttendance === false && (
            <FormCheckBox
              name="patientDeliveryPrefence"
              label="Deliver as per patients preferences ?"
            />
          )}
        </>
      )}
    </View>
  );
};

export default MemberFeedBack;

const styles = StyleSheet.create({});
