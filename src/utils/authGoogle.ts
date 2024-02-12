export async function authGoogle() {

    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/request-google-oauth-screen`,
        {method: "POST"}
    );
    const data = await response.json();
    navigate(data.url);
}

function navigate(url: string) {
    window.location.href = url;
}