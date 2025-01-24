import { Tema } from "../types";
export type ComprasAction = { type: "Cambio-tema" };

export type ComprasState = {
  tema: Tema;
};

export const ComprasReducer = (
  state: ComprasState = { tema: "light" },
  action: ComprasAction
): ComprasState => {
  if (action.type === "Cambio-tema") {
    return { tema: state.tema === "light" ? "dark" : "light" };
  }
  return state;
};
