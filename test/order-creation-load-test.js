import { check } from 'k6';
import http from 'k6/http';

export const options = {
    vus: 10,
    duration: '30m',
};

export default function () {
    const res = http.get('http://host.docker.internal:8080');
    check(res, {
        'is status 201': (r) => r.status === 201,
    });
}