export type PaymentType = 'onSpot' | 'online';

export interface Slot {
  _id: string;
  slotTime: string;
}

export interface Doctor {
  _id: string;
}
