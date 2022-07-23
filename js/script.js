
const overview = document.querySelector(".overview");

const username = "jmcclung3509";

const reposList = document.querySelector(".repo-list");

const allRepos = document.querySelector(".repos");

const indivRepoData = document.querySelector(".repo-data");

const viewReposButton = document.querySelector(".view-repos");

const filterInput = document.querySelector(".filter-repos");

const getInfo = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(data);
    displayUserInfo(data);
}
getInfo();

const displayUserInfo = function (data) {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user-info");
    userDiv.innerHTML = `
    <figure>
        <img alt = "user avatar" src = ${data.avatar_url} />
    </figure>
    <div class="userdiv-paragraph">
        <p><strong>Name: </strong> <span class = "user-span">${data.name}</span></p>
        <p><strong>Bio: </strong> <span class = "user-span">${data.bio}</span></p>
        <p><strong>Location: </strong> <span class = "user-span">${data.location}</span></p>
        <p><strong> Number of public repos: </strong><span class = "user-span"> ${data.public_repos}</span></p>
    </div>
    `
    overview.append(userDiv);
    getRepos();
};

const getRepos = async function () {
    const fetchRepo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepo.json();
    console.log(repoData);
    displayRepoInfo(repoData);
};

const displayRepoInfo = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `
        <h3> ${repo.name}</h3>`
        reposList.append(li);
    }
};

reposList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepoInfo(repoName);
    }
});

const specificRepoInfo = async function (repoName) {
    const fetchSpecific = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchSpecific.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
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
    const div = document.createElement("div");
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
            <p>Description: ${repoInfo.description}</p>
            <p>Default Branch: ${repoInfo.default_branch}</p>
            <p>Languages: ${languages.join(",")}</p>
            <a class = "visit" href="${repoInfo.html_url}" target = "_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`

    indivRepoData.append(div);
    indivRepoData.classList.remove("hide");
    allRepos.classList.add("hide");
    viewReposButton.classList.remove("hide")
};

viewReposButton.addEventListener("click", function () {
    allRepos.classList.remove("hide");
    indivRepoData.classList.remove("hide");
    viewReposButton.addEventListener.add("hide");
})

filterInput.addEventListener("input", function (e) {
    const inputValue = e.target.value;
    console.log(inputValue);
    const repos = document.querySelectorAll("repo");
    const lowerInputValue = inputValue.toLowerCase();

    for (const repo of repos) {
        const lowerRepo = repo.innerText.toLowerCase();
        if (lowerRepo.includes(lowerInputValue)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});
