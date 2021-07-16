/* eslint-disable import/prefer-default-export */

export interface GraphData {
  context?: string;
  businessPhones?: string[];
  displayName?: string;
  givenName?: string;
  id: string;
  jobTitle?: string;
  mail?: string;
  mobilePhone?: number;
  officeLocation?: string;
  preferredLanguage?: string;
  surname: string;
  userPrincipalName: string;
}

export interface LoginData {
  Success: boolean;
  ErrorMessage: string | null;
  SignFtg: string;
  FtgFtg: string;
  SessionID: string;
}
