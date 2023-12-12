import { ServerApp } from './../src/presentation/server-app';

describe('Test in app.ts', () => {
    test('Should call Server.run with values', async () => {
        
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;

        process.argv = ['node', 'app.ts', '-b', '5', '-l', '8', '-s', 'true', '-n', 'test-file', '-d', 'test-destination'];

        await import('../src/app');

        expect(serverRunMock).toHaveBeenCalledWith({
            base: 5,
            limit: 8,
            showTable: true,
            fileName: 'test-file',
            fileDestination: 'test-destination',
            });

    });
});