import {formatDateToApi, fetchRegisteredRacers, registerRacer, Racer} from './backend';

describe('formatDateToApi', () => {
    test('formats date with single digit day and month', () => {
        const date = new Date(2026, 0, 5); // January 5, 2026
        expect(formatDateToApi(date)).toBe('2026/01/05');
    });

    test('formats date with double digit day and month', () => {
        const date = new Date(2026, 11, 25); // December 25, 2026
        expect(formatDateToApi(date)).toBe('2026/12/25');
    });

    test('formats competition date correctly', () => {
        const date = new Date(2026, 4, 16); // May 16, 2026
        expect(formatDateToApi(date)).toBe('2026/05/16');
    });
});

describe('fetchRegisteredRacers', () => {
    const mockRacers = [
        {
            id: '1',
            created: '2026-01-01T10:00:00Z',
            payload: {
                firstname: 'Jan',
                lastname: 'Novák',
                email: 'jan@example.com',
                club: 'SK Běžci',
                born: '1990-05-15',
                gender: 'm',
                race: '42km',
            }
        }
    ];

    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('fetches and maps racers correctly', async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            status: 200,
            json: async () => mockRacers,
        });

        const racers = await fetchRegisteredRacers();

        expect(racers).toHaveLength(1);
        expect(racers[0].firstname).toBe('Jan');
        expect(racers[0].lastname).toBe('Novák');
        expect(racers[0].gender).toBe('m');
        expect(racers[0].race).toBe('42km');
    });

    test('throws error on non-200 status', async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            status: 500,
        });

        await expect(fetchRegisteredRacers()).rejects.toThrow('API ERROR');
    });

    test('throws error on invalid gender', async () => {
        const invalidRacers = [{
            ...mockRacers[0],
            payload: {...mockRacers[0].payload, gender: 'x'}
        }];

        (global.fetch as jest.Mock).mockResolvedValue({
            status: 200,
            json: async () => invalidRacers,
        });

        await expect(fetchRegisteredRacers()).rejects.toThrow('unknown gender type');
    });
});

describe('registerRacer', () => {
    const mockRacer: Racer = {
        firstname: 'Jana',
        lastname: 'Nováková',
        email: 'jana@example.com',
        club: 'SK Běžkyně',
        born: new Date(1995, 2, 10),
        gender: 'f',
        race: '14km',
    };

    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('registers racer successfully', async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            status: 204,
        });

        await expect(registerRacer(mockRacer)).resolves.toBeUndefined();

        expect(global.fetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                method: 'PUT',
                body: expect.stringContaining('"firstname":"Jana"'),
            })
        );
    });

    test('throws error on non-204 status', async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            status: 400,
        });

        await expect(registerRacer(mockRacer)).rejects.toThrow('API ERROR');
    });

    test('sends correctly formatted date', async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            status: 204,
        });

        await registerRacer(mockRacer);

        const callArgs = (global.fetch as jest.Mock).mock.calls[0][1];
        const body = JSON.parse(callArgs.body);
        expect(body.born).toBe('1995/03/10');
    });
});
