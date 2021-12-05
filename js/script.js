//Profile Information//
const overview = document.querySelector(".overview");
//Github profile name//
const username = "jmcclung3509";
// List where repos will be displayed//
const reposList = document.querySelector(".repo-list");
//Section with class of "repos" where all repo info appears//
const allRepos = document.querySelector(".repos");
//Where individual repo data will appear//
const indivRepoData = document.querySelector(".repo-data");

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

reposList.addEventListener ("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepoInfo(repoName);
    }
});

const specificRepoInfo = async function (repoName) {
    const fetchSpecific = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchSpecific.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];
    for (let language in languageData) {
        languages.push(language);

    console.log(languages);
    }

    displaySpecificRepoInfo(repoInfo, languages);
};

const displaySpecificRepoInfo = function (repoInfo, languages) {
    indivRepoData.innerHTML = "";
    const div = document.createElement ("div");
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
            <p>Description: ${repoInfo.description}</p>
            <p>Default Branch: ${repoInfo.default_branch}</p>
            <p>Languages: ${languages.join(",")}</p>
            <a class = "visit" href="${repoInfo.html_url}" target = "_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    indivRepoData.append(div);
    indivRepoData.classList.remove("hide");
    allRepos.classList.add("hide");
};