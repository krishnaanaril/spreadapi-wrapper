import { SpreadApiConfig } from "./types";
import { SpreadApiBatchRequest, SpreadApiBatchResponse, SpreadApiResponse } from "./types/operations";

/**
 * SpreadClient is a TypeScript client for interacting with the Spread API.
 * It provides methods to perform CRUD operations on a spreadsheet.
 */
export class SpreadClient {
    private config: SpreadApiConfig;

    constructor(config: SpreadApiConfig) {
        this.config = config;
    }

    /**
     * Generic method for batch requests
     * @param requests Array of API requests
     * @returns Promise with batch responses
     */
    private async makeBatchRequest<T = any>(
        requests: SpreadApiBatchRequest<T>
    ): Promise<SpreadApiBatchResponse<T>|SpreadApiResponse<T>> {        
        try {
            const response = await fetch(this.config.sheetUrl, {
                method: 'POST',
                body: JSON.stringify(requests)
            });

            if (!response.ok) {
                console.log("Error response:", response);
                console.log("Request body:", JSON.stringify(requests, null, 2));
                throw new Error(`HTTP error! status: ${response.status}`);
            }            
            return await response.json();
        } catch (error: any) {
            throw new Error(`SpreadAPI batch request failed: ${error.message}`);
        }
    }

    /**
     * Insert multiple rows with type-safe payload
     * @param payloads Array of row data to insert
     * @returns Promise with batch response
     */
    async insertRows<T = any>(payloads: T[]): Promise<SpreadApiBatchResponse<T>> {
        const batchRequest: SpreadApiBatchRequest<T> = payloads.map(payload => ({
            method: 'POST',
            sheet: this.config.sheetName,
            key: this.config.accessKey,
            payload
        }));

        return this.makeBatchRequest(batchRequest) as Promise<SpreadApiBatchResponse<T>>;
    }

    
    /**
     * Retrieves a single row from the spreadsheet by its unique identifier.
     *
     * @typeParam T - The expected type of the row data.
     * @param id - The unique identifier of the row to retrieve.
     * @returns A promise that resolves to a `SpreadApiBatchResponse<T>` containing the row data.
     */
    async getRow<T = any>(id: number): Promise<SpreadApiResponse<T>> {
        const batchRequest: SpreadApiBatchRequest<T> = [{
            method: 'GET',
            sheet: this.config.sheetName,
            key: this.config.accessKey,
            id
        }];

        return this.makeBatchRequest(batchRequest) as Promise<SpreadApiResponse>;
    }

    /**
     * Fetch multiple rows with optional ordering, start_id, and limit
     * @param options Optional parameters: order (ASC/DESC), start_id, limit
     * @returns Promise with batch response
     */
    async getRows<T = any>(options?: {
        order?: 'ASC' | 'DESC',
        start_id?: number,
        limit?: number
    }): Promise<SpreadApiBatchResponse<T>> {
        const batchRequest: SpreadApiBatchRequest<T> = [{
            method: 'GET',
            sheet: this.config.sheetName,
            key: this.config.accessKey,
            ...(options?.order && { order: options.order }),
            ...(options?.start_id !== undefined && { start_id: options.start_id }),
            ...(options?.limit !== undefined && { limit: options.limit })
        }];

        return this.makeBatchRequest(batchRequest) as Promise<SpreadApiBatchResponse<T>>;
    }

    /**
     * Updates a row by its unique identifier with the provided payload.
     *
     * @typeParam T - The type of the payload to update the row with.
     * @param id - The unique identifier of the row to update.
     * @param payload - The data to update the row with.
     * @returns A promise that resolves to a `SpreadApiBatchResponse<T>` indicating the result of the update.
     */
    async updateRow<T = any>(id: number, payload: T): Promise<SpreadApiBatchResponse<T>> {
        const batchRequest: SpreadApiBatchRequest<T> = [{
            method: 'PUT',
            sheet: this.config.sheetName,
            key: this.config.accessKey,
            id,
            payload
        }];

        return this.makeBatchRequest(batchRequest) as Promise<SpreadApiBatchResponse<T>>;
    }

    /**
     * Deletes a row by its unique identifier.
     *
     * @param id - The unique identifier of the row to delete.
     * @returns A promise that resolves to a `SpreadApiResponse` indicating the result of the deletion.
     */
    async deleteRow(id: number): Promise<SpreadApiResponse> {
        const batchRequest: SpreadApiBatchRequest = [{
            method: 'DELETE',
            sheet: this.config.sheetName,
            key: this.config.accessKey,
            id
        }];

        return this.makeBatchRequest(batchRequest) as Promise<SpreadApiResponse>;
    }
}