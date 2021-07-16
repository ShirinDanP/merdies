export interface Articles {
  Id: string;
}

export interface ArticleInfo {
  ItemId: string;
  Title?: string;
  RepairSelected?: string;
  Dimension?: string;
  StoreLocation?: string;
  Balance?: number;
  Unit?: string;
  InventoryDate?: string;
  Success?: boolean;
  ErrorMessage?: string | null;
  SessionID?: string;
}

export interface InventoryData {
  SessionId: string;
  ItemId: string;
  Quantity: number;
}

export interface InventoryResponse {
  Success: boolean;
  ErrorMessage: string | null;
  SessionID: string;
}

