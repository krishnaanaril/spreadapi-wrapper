// types/index.ts

/**
 * Configuration options for connecting to a Spread API instance.
 *
 * @property sheetUrl - The URL of the spreadsheet to connect to.
 * @property sheetName - The name of the specific sheet within the spreadsheet.
 * @property accessKey - The access key required for authentication.
 */
export interface SpreadApiConfig {
  sheetUrl: string;
  sheetName: string;  
  accessKey: string;
}