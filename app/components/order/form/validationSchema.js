import * as Yup from "yup";

const validationSchema = (specific) => {
  const validationSchema2 = Yup.object().shape({
    deliveryAddress: Yup.object({
      latitude: Yup.number().label("Latitude"),
      longitude: Yup.number().label("Longitude"),
      address: Yup.string().label("Address"),
    }).label("Delivery address"),
    // deliveryTime: Yup.date().required().label("Delivery time"),
    phoneNumber: Yup.string().max(14).min(9).label("Phone number"),
    deliveryPerson: Yup.object({
      fullName: Yup.string().required().label("Full name"),
      nationalId: Yup.number().required().label("National Id"),
      phoneNumber: Yup.string().label("Phone number").required(),
      pickUpTime: Yup.date().required().label("Pick up time"),
    })
      .label("Delivery person")
      .when("deliveryMethod", ([value], schema) => {
        const require = value === "in-person" || specific === "yes";
        if (require) return schema.required();
        return schema;
      })
      .nullable(),
    deliveryMethod: Yup.string()
      .oneOf(["in-person", "in-parcel"])
      .required("You must specify how you want your drug delivered to you")
      .label("Delivery Method"),
    courrierService: Yup.string()
      .label("Courrier service")
      .when("deliveryMethod", ([value], schema) => {
        const require = value === "in-parcel";
        if (require) {
          return schema.required();
        }
        return schema;
      }),
    event: Yup.string()
      .label("Event")
      .when("appointment", ([value], schema) => {
        if (!value) {
          return schema.required();
        }
        return schema;
      }),
    appointment: Yup.string()
      .label("Appointment")
      .test(
        "appointmentRequired",
        "Appointment is required when Event is not provided",
        function (value) {
          const eventValue = this.resolve(Yup.ref("event")); // Get the value of the "event" field
          // If "event" is not provided, require "appointment"
          if (!eventValue) {
            return !!value;
          }
          // If "event" is provided, "appointment" is optional
          return true;
        }
      ),
    type: Yup.string().oneOf(["self", "other"]).default("self"),
    careReceiver: Yup.string()
      .label("Care receiver")
      .when("type", ([value], schema) => {
        const require = value === "other";
        if (require) {
          return schema.required();
        }
        return schema;
      }),
  });

  return validationSchema2;
};

export default validationSchema;
