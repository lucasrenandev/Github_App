"use strict";

const getDataFromGithubRepos = async () => {
    const url = `http://localhost:3000/github.com/lucasrenandev/repos`;
    const response = await fetch(url);
    const data = await response.json();
    
    data.map((item) => {
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
    });
};

window.addEventListener("load", getDataFromGithubRepos);