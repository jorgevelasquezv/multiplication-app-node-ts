

const runCommand = async (arg: string[]) => {
    process.argv = [...process.argv, ...arg];

    const { yarg } = await import('../../../src/config/plugins/args.plugins');
    return yarg;
};

describe('Test in arg.plugins.ts', () => {
    const originalProcessArgv = process.argv;

    beforeEach(() => {
        process.argv = originalProcessArgv;
        jest.resetModules();
    });

    test('Should return default values', async () => {
        const argv = await runCommand(['-b', '5']);

        expect(argv).toEqual(
            expect.objectContaining({
                b: 5,
                l: 10,
                s: false,
                n: 'multiplication-table',
                d: 'outputs',
            })
        );
    });

    test('Should return configuration with custom values', async () => {
        const argv = await runCommand([
            '-b',
            '5',
            '-l',
            '20',
            '-s',
            '-n',
            'custom-table-name',
            '-d',
            'custom-outputs',
        ]);

        expect(argv).toEqual(
            expect.objectContaining({
                b: 5,
                l: 20,
                s: true,
                n: 'custom-table-name',
                d: 'custom-outputs',
            })
        );
    });

    test('Should return error if base is less than 1', async () => {
        try {
            // const argv = await runCommand(['-b', '0']);
        } catch (error) {
            console.log({ error });
        }
    });
});
