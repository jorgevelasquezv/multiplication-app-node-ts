import { CreateTable } from './../../../src/domain/use-cases/create-table.use-case';

describe('Test in create-table.use-case.ts', () => {

    test('should create table with default values', () => {
        const createTable = new CreateTable();
        const table = createTable.execute({ base: 10 });
        const rows = table.split('\n').length;

        expect(createTable).toBeInstanceOf(CreateTable);

        expect(table).toContain('10 * 1 = 10');
        expect(table).toContain('10 * 10 = 100');
        expect(rows).toBe(10);
    });

    test('should create table with custom values', () => {
        const createTable = new CreateTable();
        const options = { base: 10, limit: 5 };
        const table = createTable.execute(options);
        const rows = table.split('\n').length;

        expect(table).toContain('10 * 1 = 10');
        expect(table).toContain('10 * 5 = 50');
        expect(rows).toBe(options.limit);
    });


});