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
  dim2: string;
  dim3: string;
  dim4: string;
  ftg: string;
  reqnr?: string;
  username?: string;
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

export interface RekvisionRowData {
  SessionId: string;
  RequisitionId?: string;
  ItemId: string;
  Quantity: string | number;
  Inventory?: boolean;
}
export interface RekvisionRowResponse {
  Success: boolean;
  ErrorMessage: string | null;
  SessionID: string;
}

export interface RequisitionNumber {
  sessionsId: string;
  reqnr: string;
}
export interface RequisitionList {
  Position: string;
  ItemId: string;
  Title: string;
  Quantity: number | string;
  RepairSelected: string;
}

export interface RequisionRadResponse {
  RequisitionId: string;
  RequisitionList: RequisitionList[];
  Success: boolean;
  ErrorMessage: string | null;
  SessionID: string;
}
