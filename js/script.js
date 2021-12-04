//Profile Information//
const overview = document.querySelector(".overview");
//Github profile name//
const username = "jmcclung3509";

const getInfo = async function () {
    const res = await fetch (`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(data);
    displayUserInfo(data);
}
getInfo();

const displayUserInfo = function (data) {
    const userDiv = document.createElement("div");
    userDiv.classList.add(".user-info");
    userDiv.innerHTML = `
    <figure>
        <img alt = "user avatar" src = ${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p></strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong> Number of public repos</strong> ${data.public_repos}</p>
    </div>
    `
    overview.append(userDiv);
};