export interface SlotDate {
  date: string;
  slots?: { dateTime: string }[];
}

export interface Doctor {
  idDoctor: string;
  slotdates: SlotDate[];
}
