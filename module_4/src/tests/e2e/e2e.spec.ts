import axios from 'axios';

const NAGER_DATE_API_URL = 'https://date.nager.at/api/v3';

describe('End-to-End Tests', () => {
  it('should get list of public holidays for a specific year and country', async () => {
    const year = 2024;
    const country = 'GB';

    const response = await axios.get(`${NAGER_DATE_API_URL}/PublicHolidays/${year}/${country}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  it('should check if today is a public holiday in a specific country', async () => {
    const country = 'GB';

    const response = await axios.get(`${NAGER_DATE_API_URL}/IsTodayPublicHoliday/${country}`);

    expect([200, 204]).toContain(response.status);
  });
});
