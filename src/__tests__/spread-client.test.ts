// Help me to write unit tests for the SpreadClient class.

import { SpreadClient } from '../spread-client';
import { SpreadApiConfig } from '../types';

describe('SpreadClient', () => {
    describe('insertRows', () => {
        it('should insert multiple rows successfully', async () => {
            const mockConfig: SpreadApiConfig = {
                sheetUrl: 'https://example.com/spreadsheet',
                sheetName: 'TestSheet',
                accessKey: 'test-key'
            };
            const client = new SpreadClient(mockConfig);
            const mockPayloads = [{ name: 'John Doe' }, { name: 'Jane Doe' }];

            // Mock the fetch response
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue({ success: true, data: mockPayloads })
            });

            const response = await client.insertRows(mockPayloads);
            expect(response).toEqual({ success: true, data: mockPayloads });
        });

        it('should throw an error on failed request', async () => {
            const mockConfig: SpreadApiConfig = {
                sheetUrl: 'https://example.com/spreadsheet',
                sheetName: 'TestSheet',
                accessKey: 'test-key'
            };
            const client = new SpreadClient(mockConfig);
            const mockPayloads = [{ name: 'John Doe' }];

            // Mock the fetch response to simulate an error
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
                status: 500
            });

            await expect(client.insertRows(mockPayloads)).rejects.toThrow('SpreadAPI batch request failed');
        });
    });

    describe('getRow', () => {
        it('should retrieve a single row successfully', async () => {
            const mockConfig: SpreadApiConfig = {
                sheetUrl: 'https://example.com/spreadsheet',
                sheetName: 'TestSheet',
                accessKey: 'test-key'
            };
            const client = new SpreadClient(mockConfig);
            const mockRow = { id: 1, name: 'John Doe' };

            // Mock the fetch response
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue({ success: true, data: mockRow })
            });

            const response = await client.getRow(1);
            expect(response).toEqual({ success: true, data: mockRow });
        });

        it('should throw an error on failed request', async () => {
            const mockConfig: SpreadApiConfig = {
                sheetUrl: 'https://example.com/spreadsheet',
                sheetName: 'TestSheet',
                accessKey: 'test-key'
            };
            const client = new SpreadClient(mockConfig);

            // Mock the fetch response to simulate an error
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
                status: 404
            });

            await expect(client.getRow(1)).rejects.toThrow('SpreadAPI batch request failed');
        });
    });

    describe('updateRow', () => {
        it('should update a row successfully', async () => {
            const mockConfig: SpreadApiConfig = {
                sheetUrl: 'https://example.com/spreadsheet',
                sheetName: 'TestSheet',
                accessKey: 'test-key'
            };
            const client = new SpreadClient(mockConfig);
            const mockRow = { id: 1, name: 'John Doe Updated' };

            // Mock the fetch response
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue({ success: true, data: mockRow })
            });

            const response = await client.updateRow(1, mockRow);
            expect(response).toEqual({ success: true, data: mockRow });
        });

        it('should throw an error on failed request', async () => {
            const mockConfig: SpreadApiConfig = {
                sheetUrl: 'https://example.com/spreadsheet',
                sheetName: 'TestSheet',
                accessKey: 'test-key'
            };
            const client = new SpreadClient(mockConfig);
            const mockRow = { id: 1, name: 'John Doe Updated' };

            // Mock the fetch response to simulate an error
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
                status: 400
            });

            await expect(client.updateRow(1, mockRow)).rejects.toThrow('SpreadAPI batch request failed');
        });
    });

    describe('deleteRow', () => {
        it('should delete a row successfully', async () => {
            const mockConfig: SpreadApiConfig = {
                sheetUrl: 'https://example.com/spreadsheet',
                sheetName: 'TestSheet',
                accessKey: 'test-key'
            };
            const client = new SpreadClient(mockConfig);

            // Mock the fetch response
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue({ success: true })
            });

            const response = await client.deleteRow(1);
            expect(response).toEqual({ success: true });
        });

        it('should throw an error on failed request', async () => {
            const mockConfig: SpreadApiConfig = {
                sheetUrl: 'https://example.com/spreadsheet',
                sheetName: 'TestSheet',
                accessKey: 'test-key'
            };
            const client = new SpreadClient(mockConfig);

            // Mock the fetch response to simulate an error
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
                status: 404
            });

            await expect(client.deleteRow(1)).rejects.toThrow('SpreadAPI batch request failed');
        });
    });
});