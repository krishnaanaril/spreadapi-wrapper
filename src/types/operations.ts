// types/operations.ts
export interface SpreadApiRequest<T = any> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  sheet: string;
  key: string;
  payload?: T;
  id?: number | string; // For operations that target specific rows
}

export interface SpreadApiBatchRequest<T = any> extends Array<SpreadApiRequest<T>> {}

export interface ErrorInfo {
    code: string;
    details?: any; // Optional, can include more specific error details
  }


export interface SpreadApiResponse<T = any> {
  status: number;
  data?: T;
  error?: ErrorInfo;
}

export interface SpreadApiBatchResponse<T = any> extends Array<SpreadApiResponse<T>> {}