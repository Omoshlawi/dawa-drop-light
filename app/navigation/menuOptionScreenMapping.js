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
  UserRoles: {
    route: routes.PERMISIONS_NAVIGATION,
    screen: routes.PERMISIONS_USER_ROLES_SCREEN,
  },
  Appointments: {
    route: routes.ORDERS_NAVIGATION,
    screen: routes.ORDERS_APPOINMENTS_SCREEN,
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
