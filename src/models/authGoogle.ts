export async function authGoogle() {
    const response = await fetch('http://127.0.0.1:3001/auth/request-google-oauth-screen', {
        method: "POST"
    });
    const data = await response.json();
    navigate(data.url);
}

function navigate(url: string) {
    window.location.href = url;
}