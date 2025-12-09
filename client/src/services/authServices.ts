import apiInvoker from '../lib/apiInvoker';
import {END_POINTS} from '../lib/apiURL';

export const patientAuth = async (data: {patientNumber: string}) => {
  const res = await apiInvoker(END_POINTS.auth.patientAuth, 'POST', data);
  return res.data;
};


export const verifyOtp = (payload: {patientNumber: string; otp: string}) =>
  apiInvoker(END_POINTS.auth.varifyOTP, 'POST', {
    patientNumber: payload.patientNumber,
    otp: payload.otp,
  });


