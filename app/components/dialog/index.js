export { default as Dialog } from "./Dialog";
export { default as AlertDialog } from "./AlertDialog";
export { default as OrderConfirmation } from "./OrderConfirmation";
export const getDialogIcon = (icon) => {
  if (icon === "success") return require("./assets/check.png");
  if (icon === "error") return require("./assets/error.png");
};
