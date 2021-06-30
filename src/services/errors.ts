import HttpStatus from 'http-status';

/* eslint-disable import/prefer-default-export */

export enum Errors {
  SERVICE_NOT_AVAILABLE = HttpStatus.INTERNAL_SERVER_ERROR,
  SERVICE_NOT_FOUND = HttpStatus.NOT_FOUND,
  SESSION_TIMED_OUT = HttpStatus.FORBIDDEN,
  FORBIDDEN = HttpStatus.FORBIDDEN,
  SERVICE_NO_LONGER_POSSIBLE = HttpStatus.NO_CONTENT,
  TOO_SOON_TO_GET_SERVICE = HttpStatus.CONFLICT,
  BAD_REQUEST = HttpStatus.BAD_REQUEST,
  GONE = HttpStatus.GONE,
  ALREADY_REPORTED = HttpStatus.ALREADY_REPORTED,
}

interface ErrorPayload {
  [key: string]: string;
}

export interface ErrorResponse {
  status: number;
  data: ErrorPayload;
}
