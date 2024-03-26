import axios from 'axios';
import * as publicHolidaysService from '../../services/public-holidays.service';
import * as helpers from '../../helpers';

const PUBLIC_HOLIDAY = [
    {
        date: '2024-01-01',
        localName: 'localName',
        name: 'name',
        countryCode: 'countryCode',
        fixed: false,
        global: false,
        counties: null,
        launchYear: null,
        types: []
    }
];

const PUBLIC_HOLIDAY_SHORTENED = [
    {
        date: '2024-01-01',
        localName: 'localName',
        name: 'name'
    }
];

describe('public-holidays.service', () => {
    describe('test getListOfPublicHolidays', () => {
        it('should return list of public holidays', async () => {
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: PUBLIC_HOLIDAY }));
            jest.spyOn(helpers, "validateInput").mockReturnValue(true);
            const result = await publicHolidaysService.getListOfPublicHolidays(2024, 'GB');
    
            expect(result).toEqual(PUBLIC_HOLIDAY_SHORTENED);
            expect(axios.get).toHaveBeenCalledWith('https://date.nager.at/api/v3/PublicHolidays/2024/GB');
        });

        it('should return empty array if axios throws error', async () => {
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject({ data: PUBLIC_HOLIDAY }));
            jest.spyOn(helpers, "validateInput").mockReturnValue(false);
            const result = await publicHolidaysService.getListOfPublicHolidays(2023, 'USA');
        
            expect(result).toEqual([]);
            expect(axios.get).toHaveBeenCalledWith('https://date.nager.at/api/v3/PublicHolidays/2023/USA');
          });
    });

    describe('test checkIfTodayIsPublicHoliday', () => {
        it('should return true if today is a public holiday', async () => {
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 200 }));
            jest.spyOn(helpers, "validateInput").mockReturnValue(true);

            const result = await publicHolidaysService.checkIfTodayIsPublicHoliday('GB');
        
            expect(result).toBe(true);
            expect(axios.get).toHaveBeenCalledWith('https://date.nager.at/api/v3/IsTodayPublicHoliday/GB');
        });
      
        it('should return false if today is not a public holiday', async () => {
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 404 }));
            jest.spyOn(helpers, "validateInput").mockReturnValue(false);
        
            const result = await publicHolidaysService.checkIfTodayIsPublicHoliday('USA');
        
            expect(result).toBe(false);
            expect(axios.get).toHaveBeenCalledWith('https://date.nager.at/api/v3/IsTodayPublicHoliday/USA');
        });
      
        it('should return false if axios throws error', async () => {
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('Failed')));
            jest.spyOn(helpers, "validateInput").mockReturnValue(false);
        
            const result = await publicHolidaysService.checkIfTodayIsPublicHoliday('FR');
        
            expect(result).toBe(false);
            expect(axios.get).toHaveBeenCalledWith('https://date.nager.at/api/v3/IsTodayPublicHoliday/FR');
        });
    });

    describe('test getNextPublicHolidays', () => {
        it('should return list of next public holidays', async () => {
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: PUBLIC_HOLIDAY }));
            jest.spyOn(helpers, "validateInput").mockReturnValue(true);
            const result = await publicHolidaysService.getNextPublicHolidays('GB');
        
            expect(result).toEqual(PUBLIC_HOLIDAY_SHORTENED);
            expect(axios.get).toHaveBeenCalledWith('https://date.nager.at/api/v3/NextPublicHolidays/GB');
        });
      
        it('should return empty array if axios throws error', async () => {
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('Failed')));
            jest.spyOn(helpers, "validateInput").mockReturnValue(true);
      
            const result = await publicHolidaysService.getNextPublicHolidays('FR');
        
            expect(result).toEqual([]);
            expect(axios.get).toHaveBeenCalledWith('https://date.nager.at/api/v3/NextPublicHolidays/FR');
        });
      });

    afterEach(() => {
        jest.clearAllMocks();
    }) 
});