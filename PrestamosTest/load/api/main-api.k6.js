import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: Number(__ENV.K6_VUS || 10),
  duration: __ENV.K6_DURATION || '30s',
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<1000']
  }
};

const baseUrl = __ENV.API_BASE_URL || 'http://localhost:3000/api';
const username = __ENV.K6_USER || 'admin';
const password = __ENV.K6_PASSWORD || 'admin123';

export default function () {
  const login = http.post(`${baseUrl}/auth/login`, JSON.stringify({ usuario: username, password }), {
    headers: { 'Content-Type': 'application/json' }
  });

  check(login, {
    'login status is 200': (res) => res.status === 200,
    'login returns token': (res) => Boolean(res.json('token'))
  });

  const token = login.json('token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const responses = http.batch([
    ['GET', `${baseUrl}/equipment?page=1&limit=10`, null, { headers }],
    ['GET', `${baseUrl}/loans/active?page=1&limit=10`, null, { headers }],
    ['GET', `${baseUrl}/loans/history?page=1&limit=10`, null, { headers }],
    ['GET', `${baseUrl}/dashboard/summary`, null, { headers }],
    ['GET', `${baseUrl}/reports/equipment/status?page=1&limit=10`, null, { headers }]
  ]);

  responses.forEach((response) => {
    check(response, {
      'endpoint is successful or authorized': (res) => [200, 403].includes(res.status)
    });
  });

  sleep(1);
}
