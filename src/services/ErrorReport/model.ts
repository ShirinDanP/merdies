export interface ObjectIdData {
  ObjektId: string;
  Benamning1: string;
}

export interface ErrorReportInfo {
  Id: string;
  Description: string;
}
export interface ErrorDataWithoutSessionId {
  TillUtfAvd: string;
  ObjektId: string;
  Beskrivning: string;
  Upptackt: string;
  Symtom: string;
  Bilaga: any;
}

export interface ErrorReportData extends ErrorDataWithoutSessionId {
  SessionsId: string;
}

export interface ErrorReportResponse {
  WorkOrderId: string;
  Success: boolean;
  ErrorMessage: string | null;
  SessionID: string;
}
