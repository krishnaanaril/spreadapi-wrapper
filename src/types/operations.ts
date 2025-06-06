// types/operations.ts
export interface SpreadApiRequest<T = any> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  sheet: string;
  key: string;
  payload?: T;
  id?: number | string; // For operations that target specific rows
}

export interface SpreadApiBatchRequest<T = any> extends Array<SpreadApiRequest<T>> {}

export interface SpreadApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SpreadApiBatchResponse<T = any> extends Array<SpreadApiResponse<T>> {}