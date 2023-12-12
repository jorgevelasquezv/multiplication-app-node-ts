import fs from 'fs';

import { CreateTable } from '../../src/domain/use-cases/create-table.use-case';
import { SaveFile } from '../../src/domain/use-cases/save-file.use-case';
import { ServerApp } from './../../src/presentation/server-app';

describe('Test in Server App', () => {
    const options = {
        base: 1,
        limit: 10,
        showTable: true,
        fileName: 'test-destination',
        fileDestination: 'test-destination',
    };

    test('Should create server instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });

    test('Should run server with options', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

        ServerApp.run(options);

        expect(consoleSpy).toHaveBeenCalledWith('Server running...');
        expect(consoleSpy).toHaveBeenLastCalledWith('File saved!');

        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit,
        });

        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName,
        });

        const customOutPutPathExist = fs.existsSync(options.fileDestination);
        if (customOutPutPathExist)
            fs.rmdirSync(options.fileDestination, { recursive: true });
    });

    test('Should run server with values custom', () => {
        const fileContent = '1 * 2 = 2';

        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue(fileContent);
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log = logMock;
        console.error = logErrorMock;

        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server running...');
        expect(createMock).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit,
        });
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent,
            fileDestination: options.fileDestination,
            fileName: options.fileName,
        });
        expect(logMock).toHaveBeenCalledWith('File saved!');
        expect(logErrorMock).not.toHaveBeenCalledWith();
    });

    test('Should run server with values save file false', () => {
        const fileContent = '1 * 2 = 2';

        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue(fileContent);
        const saveFileMock = jest.fn().mockReturnValue(false);

        console.log = logMock;
        console.error = logErrorMock;

        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server running...');
        expect(createMock).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit,
        });
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent,
            fileDestination: options.fileDestination,
            fileName: options.fileName,
        });

        expect(logErrorMock).toHaveBeenCalledWith('File not saved!');
    });
});
