"use strict";

const leftSide = document.querySelector(".profile-container .left-side");
const rightSide = document.querySelector(".profile-container .right-side");
const emptyProfileText = document.querySelector(".profile-container .empty-profile-text");
const emptyReposText = document.querySelector(".repos-container .empty-repos-text");

emptyProfileText.textContent = "No user profile found!";
emptyReposText.textContent = "No user repository found!";

const getProfileDataFromGithub = async () => {
    const url = `http://localhost:3000/github.com/lucasrenandev`;
    const response = await fetch(url);
    const data = await response.json();
    
    const leftSideItems = document.createElement("div");
    const rightSideItems = document.createElement("div");
    leftSideItems.classList.add("left-side-items");
    rightSideItems.classList.add("right-side-items");

    leftSideItems.innerHTML = 
    `
    <img src="${data.avatar_url}" alt="Avatar Github">
    <p class="login">${data.login}</p>
    <div class="line"></div>
    <div class="location-box">
        <i class="fa-solid fa-location-dot"></i>
        <span class="location">${data.location}</span>
    </div>
    `;

    rightSideItems.innerHTML = 
    `
    <h2 class="name">${data.name}</h2>
    <h3 class="company">${data.company}</h3>
    <div class="followers-box">
        <div>
            <p>Repositories</p>
            <span class="public-repo">${data.public_repos}</span>
        </div>
        <div>
            <p>Followers</p>
            <span class="followers">${data.followers}</span>
        </div>
        <div>
            <p>Following</p>
            <span class="following">${data.following}</span>
        </div>
    </div>
    `;

    leftSide.appendChild(leftSideItems);
    rightSide.appendChild(rightSideItems);
}

window.addEventListener("load", getProfileDataFromGithub);