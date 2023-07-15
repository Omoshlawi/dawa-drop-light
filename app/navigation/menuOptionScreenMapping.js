import routes from "./routes";

const mapping = {
  Permisions: {
    route: routes.ACTION_NAVIGATION,
    screen: routes.ACTION_ROLES_SCREEN,
  },
};

const get = (link) => {
  let nav = mapping[link];
  if (!nav) {
    nav = {
      route: routes.USER_NAVIGATION,
      screen: routes.USER_DEFAULT_SCREEN,
    };
  }
  return nav;
};

exports.get = get;
