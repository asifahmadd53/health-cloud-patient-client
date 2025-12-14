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

type FileAsset = {
  uri: string;
  name: string;
  type: string;
};

export const uploadDocument = (file: FileAsset, kind: DocumentKind) => {
  const formData = new FormData();

  formData.append('document', {
    uri: file.uri,
    type: file.type || 'image/jpeg',
    name: file.name || `doc-${Date.now()}.jpg`,
  } as any);

  formData.append('documentType', kind);

  return apiInvoker(
    END_POINTS.documents.uploadPatientDocument,
    'POST',
    formData,
    {headers: {'Content-Type': 'multipart/form-data'}},
  );
};

export type MakeAppointmentPayload = {
  doctorId: string;
  appointmentDate: string; 
  appointmentTime: string;
  paymentType: 'ONLINE' | 'OFFLINE';
};

export const getDoctorAvailableSlots = async (
  doctorId: string,
  date: string,
) => {
  const res = await apiInvoker(
    `${END_POINTS.appointment.getDoctorAvailableSlots}?doctorId=${doctorId}&date=${date}`,
    'GET',
  );

  return res.data;
};


export const makeAppointment = async (data: MakeAppointmentPayload) => {
  const res = await apiInvoker(
    END_POINTS.appointment.makeAppointment,
    'POST',
    data,
  );
  return res.data;
};

