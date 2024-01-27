export async function auth() {
    const response = await fetch('http://127.0.0.1:3001/request', {
        method: "POST"
    });
    const data = await response.json();
    navigate(data.url);
}

function navigate(url: string) {
    window.location.href = url;
}