export function apiPostRequest(endpoint: string, body: any) {
    return fetch(`${import.meta.env.VITE_SERVER_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
}

export function apiGetRequest(endpoint: string) {
    return fetch(`${import.meta.env.VITE_SERVER_URL}/${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}