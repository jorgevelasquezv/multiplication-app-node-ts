import fs from 'fs';
import { SaveFile } from './../../../src/domain/use-cases/save-file.use-case';

describe('Test in save-file.use-case.ts', () => {
    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name',
    };

    afterEach(() => {
        const outPutPathExist = fs.existsSync('outputs');
        if (outPutPathExist) fs.rmdirSync('outputs', { recursive: true });
        
        const customOutPutPathExist = fs.existsSync('custom-outputs');
        if (customOutPutPathExist) fs.rmdirSync('custom-outputs', { recursive: true });
    });

    test('should save file', () => {
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const customOptions = { fileContent: 'Hello world!' };
        const wasCreated = saveFile.execute(customOptions);

        expect(saveFile).toBeInstanceOf(SaveFile);
        expect(wasCreated).toBeTruthy();

        const fileExist = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        expect(fileExist).toBeTruthy();
        expect(fileContent).toBe(customOptions.fileContent);
    });

    test('should save file in custom destination', () => {
        const saveFile = new SaveFile();

        const pathName = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;
        const wasCreated = saveFile.execute(customOptions);

        expect(saveFile).toBeInstanceOf(SaveFile);
        expect(wasCreated).toBeTruthy();

        const fileExist = fs.existsSync(pathName);
        const fileContent = fs.readFileSync(pathName, 'utf-8');

        expect(fileExist).toBeTruthy();
        expect(fileContent).toBe(customOptions.fileContent);

        fs.rmdirSync('custom-outputs', { recursive: true });
    });

    test('should return false if directory could not be created', () => {
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
            throw new Error('Error creating directory');
        });

        const result = saveFile.execute(customOptions);

        expect(result).toBeFalsy();

        mkdirSpy.mockRestore();
    });

    test('Should return false if file could not be created', () => {
        const saveFile = new SaveFile();
        const writeFileSyncSpy = jest
            .spyOn(fs, 'writeFileSync')
            .mockImplementation(() => {
                throw new Error('Error creating file');
            });

        const result = saveFile.execute(customOptions);

        expect(result).toBeFalsy();
        writeFileSyncSpy.mockRestore();
    });
});
