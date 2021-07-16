export interface WorkOrderNumber {
  Aonr: string;
}

export interface Info {
  Id: string;
  Description: string;
}

export interface RekvisionData {
  sessionsId: string;
  aonr: string;
  objektId: string;
  dim0: string;
  dim1: string;
  dmi2: string;
  dim3: string;
  dim4: string;
  ftg: string;
  reqnr?: string;
}

export interface RekvisionResponse {
  WorkOrderId: string;
  ObjectId: string;
  Code0: string;
  Code1: string;
  Code2: string;
  Code3: string;
  Code4: string;
  Ftg: string;
  RequisitionId: string;
  Success: boolean;
  ErrorMessage: string | null;
  SessionID: string;
}
