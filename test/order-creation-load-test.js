import { check } from 'k6';
import http from 'k6/http';

export const options = {
    vus: 140,
    duration: '5s',
};

export default function () {
    const res = http.get('http://host.docker.internal:8080');
    check(res, {
        'is status 201': (r) => r.status === 201,
    });
}