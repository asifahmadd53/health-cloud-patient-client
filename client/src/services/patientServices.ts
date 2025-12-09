import apiInvoker from '../lib/apiInvoker';
import { END_POINTS } from '../lib/apiURL';
import { DocumentKind } from '../utils/types/documents';
import { PatientProfileInput } from '../utils/types/PatientProfileInput';

export const createPatientProfile = async (data: PatientProfileInput) => {
  const res = await apiInvoker(
    END_POINTS.profile.createPatientProfile,
    'POST',
    data,
  );
  return res.data;
};


export const getPatientProfile = async () => {
  const res = await apiInvoker(
    END_POINTS.profile.getPatientProfile,
    'GET',
  );
  return res.data;
};

export const updatePatientProfile = async (data: any) => {
  const res = await apiInvoker(
    END_POINTS.profile.updatePatientProfile,
    'PATCH',
    data,
  );
  return res.data;
};