import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from '../../services/public-holidays.service';
import { validateInput, shortenPublicHoliday } from '../../helpers';
import { PublicHoliday, PublicHolidayShort } from '../../types';

jest.mock('../../helpers', () => ({
    ...jest.requireActual('../../helpers'),
    validateInput: jest.fn(),
    shortenPublicHoliday: jest.fn(),
}));

const mockPublicHolidays: PublicHoliday[] = [
    {
        date: "2024-01-01",
        localName: "New Year's Day",
        name: "New Year's Day",
        countryCode: "GB",
        fixed: false,
        global: false,
        counties: [
            "GB-NIR"
        ],
        launchYear: null,
        types: [
            "Public"
        ]
    },
    {
        date: "2024-01-01",
        localName: "New Year's Day",
        name: "New Year's Day",
        countryCode: "GB",
        fixed: false,
        global: false,
        counties: [
            "GB-ENG",
            "GB-WLS"
        ],
        launchYear: null,
        types: [
            "Public"
        ]
    },
    {
        date: "2024-01-01",
        localName: "New Year's Day",
        name: "New Year's Day",
        countryCode: "GB",
        fixed: false,
        global: false,
        counties: [
            "GB-SCT"
        ],
        launchYear: null,
        types: [
            "Public"
        ]
    },
    {
        date: "2024-01-02",
        localName: "2 January",
        name: "2 January",
        countryCode: "GB",
        fixed: false,
        global: false,
        counties: [
            "GB-SCT"
        ],
        launchYear: null,
        types: [
            "Public"
        ]
    },
    {
        date: "2024-03-17",
        localName: "Saint Patrick's Day",
        name: "Saint Patrick's Day",
        countryCode: "GB",
        fixed: false,
        global: false,
        counties: [
            "GB-NIR"
        ],
        launchYear: null,
        types: [
            "Public"
        ]
    },
    {
        date: "2024-03-29",
        localName: "Good Friday",
        name: "Good Friday",
        countryCode: "GB",
        fixed: false,
        global: true,
        counties: null,
        launchYear: null,
        types: [
            "Public"
        ]
    },
    {
        date: "2024-04-01",
        localName: "Easter Monday",
        name: "Easter Monday",
        countryCode: "GB",
        fixed: false,
        global: false,
        counties: [
            "GB-ENG",
            "GB-WLS",
            "GB-NIR"
        ],
        launchYear: null,
        types: [
            "Public"
        ]
    },
    {
        date: "2024-05-06",
        localName: "Early May Bank Holiday",
        name: "Early May Bank Holiday",
        countryCode: "GB",
        fixed: false,
        global: true,
        counties: null,
        launchYear: null,
        types: [
            "Public"
        ]
    },
    {
        date: "2024-05-27",
        localName: "Spring Bank Holiday",
        name: "Spring Bank Holiday",
        countryCode: "GB",
        fixed: false,
        global: true,
        counties: null,
        launchYear: null,
        types: [
            "Public"
        ]
    },
    {
        date: "2024-07-12",
        localName: "Battle of the Boyne",
        name: "Battle of the Boyne",
        "countryCode": "GB",
        fixed: false,
        global: false,
        counties: [
            "GB-NIR"
        ],
        launchYear: null,
        types: [
            "Public"
        ]
    },
    {
        date: "2024-08-05",
        localName: "Summer Bank Holiday",
        name: "Summer Bank Holiday",
        countryCode: "GB",
        fixed: false,
        global: false,
        counties: [
            "GB-SCT"
        ],
        launchYear: null,
        types: [
            "Public"
        ]
    },
    {
        date: "2024-08-26",
        localName: "Summer Bank Holiday",
        name: "Summer Bank Holiday",
        countryCode: "GB",
        fixed: false,
        global: false,
        counties: [
            "GB-ENG",
            "GB-WLS",
            "GB-NIR"
        ],
        launchYear: null,
        types: [
            "Public"
        ]
    },
    {
        date: "2024-11-30",
        localName: "Saint Andrew's Day",
        name: "Saint Andrew's Day",
        countryCode: "GB",
        fixed: false,
        global: false,
        counties: [
            "GB-SCT"
        ],
        launchYear: null,
        types: [
            "Public"
        ]
    },
    {
        date: "2024-12-25",
        localName: "Christmas Day",
        name: "Christmas Day",
        countryCode: "GB",
        fixed: false,
        global: true,
        counties: null,
        launchYear: null,
        types: [
            "Public"
        ]
    },
    {
        date: "2024-12-26",
        localName: "Boxing Day",
        name: "St. Stephen's Day",
        countryCode: "GB",
        fixed: false,
        global: true,
        counties: null,
        launchYear: null,
        types: [
            "Public"
        ]
    }
  ];

const expectedShortenedHolidays: PublicHolidayShort[] = [
    {
      date: '2024-01-01',
      name: "New Year's Day",
      localName: "New Year's Day"
    },
    {
      date: '2024-01-01',
      name: "New Year's Day",
      localName: "New Year's Day"
    },
    {
      date: '2024-01-01',
      name: "New Year's Day",
      localName: "New Year's Day"
    },
    { date: '2024-01-02', name: '2 January', localName: '2 January' },
    {
      date: '2024-03-17',
      name: "Saint Patrick's Day",
      localName: "Saint Patrick's Day"
    },
    { date: '2024-03-29', name: 'Good Friday', localName: 'Good Friday' },
    {
      date: '2024-04-01',
      name: 'Easter Monday',
      localName: 'Easter Monday'
    },
    {
      date: '2024-05-06',
      name: 'Early May Bank Holiday',
      localName: 'Early May Bank Holiday'
    },
    {
      date: '2024-05-27',
      name: 'Spring Bank Holiday',
      localName: 'Spring Bank Holiday'
    },
    {
      date: '2024-07-12',
      name: 'Battle of the Boyne',
      localName: 'Battle of the Boyne'
    },
    {
      date: '2024-08-05',
      name: 'Summer Bank Holiday',
      localName: 'Summer Bank Holiday'
    },
    {
      date: '2024-08-26',
      name: 'Summer Bank Holiday',
      localName: 'Summer Bank Holiday'
    },
    {
      date: '2024-11-30',
      name: "Saint Andrew's Day",
      localName: "Saint Andrew's Day"
    },
    {
      date: '2024-12-25',
      name: 'Christmas Day',
      localName: 'Christmas Day'
    },
    {
      date: '2024-12-26',
      name: "St. Stephen's Day",
      localName: 'Boxing Day'
    }
];

describe('getListOfPublicHolidays', () => {
    it('should return list of public holidays for a specific year and country', async () => {
        const year = 2024;
        const country = 'GB';

        (shortenPublicHoliday as jest.MockedFunction<typeof shortenPublicHoliday>).mockImplementation((holiday) => ({
            date: holiday.date,
            name: holiday.name,
            localName: holiday.localName,
        }));

        const result = await getListOfPublicHolidays(year, country);

        expect(validateInput).toHaveBeenCalledWith({ year, country });
        expect(shortenPublicHoliday).toHaveBeenCalledTimes(mockPublicHolidays.length);
        expect(result).toEqual(expectedShortenedHolidays);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});

describe('checkIfTodayIsPublicHoliday', () => {
    it('should return true if today is a public holiday in GB or false if its not', async () => {
        const country = 'GB';

        await checkIfTodayIsPublicHoliday(country);

        expect(validateInput).toHaveBeenCalledWith({ country });
    });
});

describe('getNextPublicHolidays', () => {
    it('should return list of next public holidays for a specific country', async () => {
        const country = 'GB';

        (shortenPublicHoliday as jest.MockedFunction<typeof shortenPublicHoliday>).mockImplementation((holiday) => ({
            date: holiday.date,
            name: holiday.name,
            localName: holiday.localName,
        }));

        await getNextPublicHolidays(country);

        expect(validateInput).toHaveBeenCalledWith({ country });
        expect(shortenPublicHoliday).toHaveBeenCalledTimes(mockPublicHolidays.length);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
