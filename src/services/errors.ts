import HttpStatus from "http-status";

/* eslint-disable import/prefer-default-export */

export enum Errors {
  INTERNAL_SERVER_ERROR = HttpStatus.INTERNAL_SERVER_ERROR,
}

interface ErrorPayload {
  [key: string]: string;
}

export interface ErrorResponse {
  status: number;
  data: ErrorPayload;
}

interface Account {
  environment: string;
  homeAccountId: string;
  localAccountId: string;
  name: string;
  tenantId: string;
  username: string;
}

export interface TokenResponse {
  accessToken: string;
  account: Account;
  expiresOn: Date;
  extExpiresOn: Date;
  familyId?: string | null;
  fromCache: boolean;
  idToken: string;
  idTokenClaims: any;
  scopes: string[];
  state: string;
  tenantId: string;
  tokenType: string;
  uniqueId: string;
}
