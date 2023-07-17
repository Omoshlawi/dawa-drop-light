import routes from "./routes";

const mapping = {
  Roles: {
    route: routes.PERMISIONS_NAVIGATION,
    screen: routes.PERMISION_ROLES_SCREEN,
  },
  Appointments: {
    screen: routes.ACTION_APPOINTMENTS_SCREEN,
    route: routes.ACTION_NAVIGATION,
  },
};

export const get = (link) => {
  let nav = mapping[link];
  if (!nav) {
    nav = {
      route: routes.USER_NAVIGATION,
      screen: routes.USER_DEFAULT_SCREEN,
    };
  }
  return nav;
};
