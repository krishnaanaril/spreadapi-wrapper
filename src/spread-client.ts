import { SpreadApiConfig } from "./types";
import { SpreadApiBatchRequest, SpreadApiBatchResponse } from "./types/operations";

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
    ): Promise<SpreadApiBatchResponse<T>> {
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

        return this.makeBatchRequest(batchRequest);
    }
}