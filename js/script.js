//Profile Information//
const overview = document.querySelector(".overview");
//Github profile name//
const username = "jmcclung3509";
// List where repos will be displayed//
const reposList = document.querySelector(".repo-list");

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
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong> Number of public repos</strong> ${data.public_repos}</p>
    </div>
    `
    overview.append(userDiv);
    getRepos();
};

const getRepos = async function () {
    const fetchRepo = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepo.json();
    console.log(repoData);
    displayRepoInfo(repoData);
};

const displayRepoInfo = function (repos) {
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add ("repo");
        li.innerHTML = `
        <h3> ${repo.name}</h3>`
        reposList.append(li);
    }


};