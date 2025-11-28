export interface IMedicalProfile {
  bloodType?: string;
  allergies?: string[];
  chronicDiseases?: string[];
}

export interface IPatient {
  name: string;
  lastName: string;
  age: number;
  gender: string;
  phone?: string;
  email?: string;
  medicalProfile?: IMedicalProfile;

  createdAt?: Date;
  updatedAt?: Date;
}
