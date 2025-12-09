import apiInvoker from "../lib/apiInvoker";
import { END_POINTS } from "../lib/apiURL";


export const getAllDoctors = () => {
  return apiInvoker(END_POINTS.getDoctors.getAllDoctors, 'GET');
};


export const getDoctorById = (id: string) => {
  if (!id || typeof id !== 'string') {
    console.warn('[getDoctorById] empty id – aborting');
    return Promise.reject('Invalid doctor id');
  }
  const url = END_POINTS.getDoctors.getDoctorById.replace(':id', id);
  console.log('[getDoctorById] final URL:', url); // visual check
  return apiInvoker(url, 'GET');
};