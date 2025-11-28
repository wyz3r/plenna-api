import { AppError } from './AppError';

// Error 400 - Validación
export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, true);
  }
}

// Error 404 - No encontrado
export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, true);
  }
}

// Error 500 - Base de datos u otros problemas graves
export class DatabaseError extends AppError {
  constructor(message = 'Database error') {
    super(message, 500, true);
  }
}
