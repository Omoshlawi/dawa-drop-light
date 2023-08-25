import * as Yup from "yup";

const validationSchema = (methods = []) => {
  const schema = Yup.object().shape({
    deliveryAddress: Yup.object({
      latitude: Yup.number().label("Latitude"),
      longitude: Yup.number().label("Longitude"),
      address: Yup.string().label("Address"),
    }).label("Delivery address"),
    // deliveryTime: Yup.date().required().label("Delivery time"),
    phoneNumber: Yup.string().max(14).min(9).label("Phone number"),
    deliveryMethod: Yup.string()
      .required("You must specify how you want your drug delivered to you")
      .label("Delivery Method"),
    deliveryPerson: Yup.object()
      .when("deliveryMethod", {
        is: (value) => {
          const selectedMethod = methods.find(({ _id }) => _id === value);
          return selectedMethod?.blockOnTimeSlotFull === false;
        },
        then: Yup.object({
          fullName: Yup.string().required().label("Full name"),
          nationalId: Yup.number().required().label("National Id"),
          phoneNumber: Yup.string().label("Phone number"),
          pickUpTime: Yup.date().required().label("Pick up time"),
        })
          .label("Delivery person")
          .required(),
        otherwise: Yup.object({
          fullName: Yup.string().required().label("Full name"),
          nationalId: Yup.number().required().label("National Id"),
          phoneNumber: Yup.string().label("Phone number"),
          pickUpTime: Yup.date().required().label("Pick up time"),
        })
          .label("Delivery person")
          .nullable(),
      })
      .label("Delivery person"),

    courrierService: Yup.string()
      .when("deliveryMethod", {
        is: (value) => {
          const selectedMethod = methods.find(({ _id }) => _id === value);
          return selectedMethod?.blockOnTimeSlotFull === false;
        },
        then: Yup.string().label("Courrier service").required(),
        otherwise: Yup.string().label("Courrier service"),
      })
      .label("Courrier service"),
  });

  const validationSchema = Yup.object().shape({
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
      .nullable(),
    deliveryMethod: Yup.string()
      .required("You must specify how you want your drug delivered to you")
      .label("Delivery Method"),
    courrierService: Yup.string().label("Courrier service"),
  });
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
      .nullable(),
    deliveryMethod: Yup.string()
      .required("You must specify how you want your drug delivered to you")
      .label("Delivery Method"),
    // courrierService: Yup.string().when(([]))=>{}),
  });

  return validationSchema2;
};

export default validationSchema;
