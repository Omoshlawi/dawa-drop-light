import routes from "./routes";

const mapping = {
  Roles: {
    route: routes.PERMISIONS_NAVIGATION,
    screen: routes.PERMISION_ROLES_SCREEN,
  },
  Privileges: {
    route: routes.PERMISIONS_NAVIGATION,
    screen: routes.PERMISIONS_PRIVILEGES_SCREEN,
  },
  MenuOption: {
    route: routes.PERMISIONS_NAVIGATION,
    screen: routes.PERMISIONS_MENU_OPTIONS_SCREEN,
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
