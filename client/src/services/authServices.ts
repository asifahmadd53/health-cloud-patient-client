import apiInvoker from '../lib/apiInvoker';
import {END_POINTS} from '../lib/apiURL';

export const patientAuth = async (data: {phone: string}) => {
  const res = await apiInvoker(END_POINTS.auth.patientAuth,'POST', data);
  return res.data;
};

// export const verifyOtp = (payload: {phone: string; otp: string}) =>
//   apiInvoker(END_POINTS.auth.varifyOTP, 'POST', {
//     phone: payload.phone,
//     otp: payload.otp,
//   });
