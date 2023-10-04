import * as Yup from "yup";

const validateDeliveryForm = (event) => {
  const validationSchemer = Yup.object().shape({
    order: Yup.string().label("Order"),
    event: Yup.string().label("Distribution Event"),
    member: Yup.string()
      .label("Member")
      .when("order", ([value], schema) => {
        if (!value) {
          return schema.required();
        }
        return schema;
      }),
    services: Yup.array().default([]).label("Extra services"),
    deliveryType: Yup.string()
      .label("Delivery type")
      .oneOf(["self", "courrier", "delegate"])
      .required()
      .when("member", ([value], schema) => {
        if (!event)
          return schema.oneOf([
            "self",
            "courrier",
            "delegate",
            "patient-preferred",
          ]);
        const { feedBacks, patientSubscribers, deliveryRequests } = event;
        const feedBack = feedBacks.find(
          ({ user }) =>
            user === patientSubscribers.find(({ _id }) => _id === value)?.user
        );
        const deliveryRequest = deliveryRequests.find(
          ({ _id }) => _id === feedBack?.deliveryRequest
        );
        if (feedBack?.confirmedAttendance === false) {
          return schema.oneOf([
            "self",
            "courrier",
            "delegate",
            "patient-preferred",
          ]);
        }
        return schema;
      }),
    courrierService: Yup.string()
      .label("Courrier service")
      .when("deliveryType", ([value], schema) => {
        if (value === "courrier") {
          return schema.required();
        }
        return schema;
      }),
    deliveryPerson: Yup.object({
      fullName: Yup.string().required().label("Full name"),
      nationalId: Yup.number().required().label("National Id"),
      phoneNumber: Yup.string().label("Phone number").required(),
      pickUpTime: Yup.date().required().label("Pick up time"),
    })
      .label("Delivery person")
      .when("deliveryType", ([value], schema) => {
        const require = ["courrier", "delegate"].includes(value);
        if (require) return schema.required();
        return schema;
      })
      .nullable(),
    deliveryAddress: Yup.object({
      latitude: Yup.number().label("Latitude"),
      longitude: Yup.number().label("Longitude"),
      address: Yup.string().label("Address"),
    })
      .label("Delivery address")
      .when("member", ([member], schema) => {
        // If patient requested homedelivery either through?
        // 1.EventFeedback delivery request
        const {
          feedBacks,
          patientSubscribers,
          deliveryRequests: eventBasedDeliveryRequest,
        } = event || {};
        const feedBack = (feedBacks || []).find(
          ({ user }) =>
            user === patientSubscribers.find(({ _id }) => _id === member)?.user
        );
        /*const eventDeliveryRequest = (eventBasedDeliveryRequest || []).find(
          ({ _id }) => _id === feedBack?.deliveryRequest
        );*/
        const eventDeliveryRequest = feedBack?.confirmedAttendance === false;

        // 2.Through fasttrack delivery request
        const fastTrackDeliveryRequest = Boolean(event) === false; // If event is notprovided then there was fasttrack order

        // Did user request home delivery
        const userRequestedDelivery =
          eventDeliveryRequest || fastTrackDeliveryRequest;

        // yes Requested
        if (userRequestedDelivery) {
          return schema.nullable(); // Delivery location is optional
        }
        // No notprovided
        return schema.required();
      }),
  });
  return validationSchemer;
};

export default validateDeliveryForm;
