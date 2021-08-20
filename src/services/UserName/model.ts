export interface Info {
  Id: string;
  Description: string;
}

export interface LoginData {
  Success: boolean;
  ErrorMessage: string | null;
  SignFtg: string;
  FtgFtg: string;
  SessionID: string;
}
