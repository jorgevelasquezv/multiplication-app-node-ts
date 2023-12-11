import fs from 'fs';
import path from 'path';
import { yarg } from './config/plugins/args.plugins';


const {b: base, l: limit, s: showTable} = yarg;

// const base = 5;
// const limit = 10;

const multiplication = (base: number, limit: number) => {
    let message = `====================================\n           Tabla del ${base}\n====================================\n`;
    for (let i = 1; i <= limit; i++) {
        message += `${base} * ${i} = ${base * i}\n`;
    }
    return message;
};

const result = multiplication(base, limit);
if (showTable) console.log(result);

const folderPath = path.join(__dirname, '../outputs');

if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
}

fs.writeFileSync(
    path.join(`${folderPath}/tabla-${base}.txt`),
    result
);
