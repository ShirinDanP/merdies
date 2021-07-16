export interface ObjectIdData {
  ObjektId: string;
  Benamning1: string;
}

export interface FalseReportInfo {
  Id: string;
  Description: string;
}
export interface FalseDataWithoutSessionId {
  TillUtfAvd: string;
  ObjektId: string;
  Beskrivning: string;
  Upptackt: string;
  Symtom: string;
  Bilaga: any;
}

export interface FalseReportData extends FalseDataWithoutSessionId {
  SessionsId: string;
}

export interface FalseReportResponse {
  WorkOrderId: string;
  Success: boolean;
  ErrorMessage: string | null;
  SessionID: string;
}
