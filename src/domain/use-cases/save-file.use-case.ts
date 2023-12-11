import fs from 'fs';
import path from 'path';

export interface SaveFileUseCase {
    execute: (options: Options) => boolean;
}

export interface Options {
    fileContent: string;
    fileDestination?: string;
    fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
    constructor() {}

    execute({
        fileContent,
        fileDestination = 'outputs',
        fileName = 'table',
    }: Options): boolean {
        try {
            fs.mkdirSync(fileDestination, { recursive: true });

            fs.writeFileSync(
                path.join(`${fileDestination}/${fileName}.txt`),
                fileContent
            );

            console.log(`File saved in ${fileDestination}/${fileName}.txt`);
            
            return true;
        } catch (error) {
            console.log(error);
            
            return false;
        }
    }
}
