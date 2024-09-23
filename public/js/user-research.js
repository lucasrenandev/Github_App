"use strict";

const input = document.querySelector(".input-container .input-field input");
const button = document.querySelector(".input-container .input-field button");
const reposBox = document.querySelector(".repos-container .repos-box");

const searchGithubUser = async () => {
    const inputValue = input.value;

    try {
        const profileURL = `http://localhost:3000/github.com/${inputValue}`;
        const profileResponse = await fetch(profileURL);
        const profileData = await profileResponse.json();
    
        const reposURL = `http://localhost:3000/github.com/${inputValue}/repos`;
        const reposResponse = await fetch(reposURL);
        const reposData = await reposResponse.json();

        if(reposData.length === 0) {
            emptyProfileText.style.display = "none";
            emptyReposText.style.display = "block";
        }
    
        leftSide.innerHTML = "";
        rightSide.innerHTML = "";
        reposBox.innerHTML = "";

        const leftSideItems = document.createElement("div");
        const rightSideItems = document.createElement("div");
        leftSideItems.classList.add("left-side-items");
        rightSideItems.classList.add("right-side-items");
        
        const nameCheck = profileData.name === null ? "Not found" : profileData.name;
        const companyCheck = profileData.company === null ? "Not found" : profileData.company;
        const locationCheck = profileData.location === null ? "Not found" : profileData.location;
    
        leftSideItems.innerHTML = 
        `
        <img src="${profileData.avatar_url}" alt="Github Avatar">
        <p class="login">${profileData.login}</p>
        <div class="line"></div>
        <div class="location-box">
            <i class="fa-solid fa-location-dot"></i>
            <span class="location">${locationCheck}</span>
        </div>
        `;

        rightSideItems.innerHTML = 
        `
        <h2 class="name">${nameCheck}</h2>
        <h3 class="company">${companyCheck}</h3>
        <div class="followers-box">
            <div>
                <p>Repositories</p>
                <span class="public-repo">${profileData.public_repos}</span>
            </div>
            <div>
                <p>Followers</p>
                <span class="followers">${profileData.followers}</span>
            </div>
            <div>
                <p>Following</p>
                <span class="following">${profileData.following}</span>
            </div>
        </div>
        `;

        reposData.map((item) => {
            const box = document.createElement("div");
            box.classList.add("box");

            const languageCheck = item.language === null ? "Not found" : item.language;
            const formattedDate = new Intl.DateTimeFormat().format(new Date(item.created_at));
            
            box.innerHTML = 
            `
            <div class="top">
                <a href="${item.html_url}" target="_blank">${item.name}</a>
                <i class="fa-solid fa-heart"></i>
            </div>
            <div class="bottom">
                <p class="language">${languageCheck}</p>
                <p>${formattedDate}</p>
            </div>
            `;

            reposBox.appendChild(box);
            emptyProfileText.style.display = "none";
            emptyReposText.style.display = "none";
        });

        leftSide.appendChild(leftSideItems);
        rightSide.appendChild(rightSideItems);    
        leftSide.style.display = "block";
        rightSide.style.display = "block";
        reposBox.style.display = "flex";
    } 
    catch {
        emptyProfileText.style.display = "block";
        emptyReposText.style.display = "block";
        leftSide.style.display = "none";
        rightSide.style.display = "none";
        reposBox.style.display = "none";
    }
}

input.addEventListener("search", searchGithubUser);
button.addEventListener("click", searchGithubUser);