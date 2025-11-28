import { createConsultationServices } from '../../../src/modules/consultations/consultations.service';
import { Consultation } from '../../../src/models/consultation.model';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { logger } from '../../../src/utils/logger';
import { DatabaseError } from '../../../src/utils/errors/errors';

jest.mock('../../../src/models/consultation.model');
jest.mock('../../../src/utils/logger');

describe('createConsultationServices', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a consultation and return it', async () => {
    const body = { reason: 'Dolor de cabeza' };
    const fakeConsultation = { id: '123', ...body };

    (Consultation.create as jest.Mock).mockResolvedValue(fakeConsultation);

    const result = await createConsultationServices(body);

    expect(Consultation.create).toHaveBeenCalledWith(body);
    expect(result).toEqual(fakeConsultation);
  });

  it('should log error and throw DatabaseError when creation fails', async () => {
    const body = { reason: 'Dolor de cabeza' };
    const error = new Error('error during the creation of consultation');

    (Consultation.create as jest.Mock).mockRejectedValue(error);

    await expect(createConsultationServices(body)).rejects.toThrow(DatabaseError);
  });
});
