import { TicketService } from "../../services/TicketService";
import { GET_ALL_TICKETS } from "./types/TicketType";

export const getAllTicketsAction = (requestParams) => {
  return async (dispatch) => {
    try {
      const result = await TicketService.getAllTickets(requestParams);
      dispatch({
        type: GET_ALL_TICKETS,
        value: result,
      });
    } catch (error) {
      console.log("error>>", error);
    }
  };
};
