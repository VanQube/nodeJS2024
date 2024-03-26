import * as helpers from '../../helpers';

const PUBLIC_HOLIDAY = {
    date: '2024-01-01',
    localName: 'localName',
    name: 'name',
    countryCode: 'countryCode',
    fixed: false,
    global: false,
    counties: null,
    launchYear: null,
    types: []
};

const PUBLIC_HOLIDAY_SHORTENED = {
    date: '2024-01-01',
    localName: 'localName',
    name: 'name'
};


describe('helpers', () => {
    it('should check input validity with invalid country', () => {
        expect(() => helpers.validateInput({country: 'USA'})).toThrowError('Country provided is not supported, received: USA');
    });

    it('should check input validity with valid country', () => {
        expect(() => helpers.validateInput({country: 'GB'})).not.toThrowError('Country provided is not supported, received: GB');
    });

    it('should check input validity with invalid year', () => {
        expect(() => helpers.validateInput({year: 2023})).toThrowError('Year provided not the current, received: 2023');
    });

    it('should check input validity with invalid year', () => {
        expect(() => helpers.validateInput({year: 2024})).not.toThrowError('Year provided not the current, received: 2024');
    });

    it('should return a shortened public holiday object', () => {
        expect(helpers.shortenPublicHoliday(PUBLIC_HOLIDAY)).toEqual(PUBLIC_HOLIDAY_SHORTENED);
      });
});