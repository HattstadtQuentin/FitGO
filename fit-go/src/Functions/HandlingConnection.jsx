const address = "https://fit-go.herokuapp.com"
const headers = { 'Content-Type': 'application/json' }

export async function connect(email) {
    let user = [];
    let url = new URL(address + '/user_email');
    url.searchParams.append("email",email);

    const response = await fetch(url,{
        method: 'GET',
        headers: headers
    });
    user = await response.json();

    return user.data[0];
}

export async function register(email, mdp) {
    let res = null;
    let url = new URL(address + '/user');

    const response = await fetch(url,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ email: email, mdp: mdp})
    });
    res = await response.json();

    return res;
}