import apiInvoker from "../lib/apiInvoker";
import { END_POINTS } from "../lib/apiURL";


export const getAllDoctors = () => {
  return apiInvoker(END_POINTS.getDoctors.getAllDoctors, 'GET');
};
