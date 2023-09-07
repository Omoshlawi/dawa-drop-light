import * as Yup from "yup";

const validateDeliveryForm = (event) => {
  const validationSchemer = Yup.object().shape({
    member: Yup.string().label("Member").required(),
    services: Yup.array().default([]).label("Ëxtra services"),
    deliveryType: Yup.string()
      .label("Delivery type")
      .oneOf(["self", "courrier", "delegate"])
      .required()
      .when("member", ([value], schema) => {
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
  });
  return validationSchemer;
};

export default validateDeliveryForm;
