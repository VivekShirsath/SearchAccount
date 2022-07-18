"use strict";

const searchbar = document.querySelector(".search-bar");
const button = document.querySelector(".btn");
const search = document.querySelector(".searchacc");
const gitinfo = document.querySelector(".git-info");
const list = document.querySelector(".List");
let value = "";

const renderData = function (data) {
  const html = `
    <div class="Git__data">
      <h3 class="Git__name">Name : ${data.name}</h3>
      <h4 class="Git__region">Region : ${data.location}</h4>
      <p class="Git__url">Url : ${data.url}</p>
    </div>
    `;

  gitinfo.insertAdjacentHTML("beforeend", html);
  gitinfo.style.opacity = 1;
};

const outputHtml = function (matches) {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
    <div class = "list">
      <ul>
        <li class = "list_items">${match.login}<li>
      </ul>
    </div>
    `
      )
      .join("");

    list.innerHTML = html;
  }
};

const renderError = function (msg) {
  gitinfo.insertAdjacentText("beforend", msg);
  gitinfo.style.opacity = 1;
};
const getData = async function (users) {
  const res = await fetch(`https://api.github.com/users/${users}`);
  const info = await res.json();
  renderData(info);
};

searchbar.addEventListener("input", function (e) {
  e.preventDefault();
  value = e.target.value;
});

button.addEventListener("click", function (e) {
  e.preventDefault();
  getData(value);
});

const searchStates = async (searchText) => {
  const res = await fetch(
    `https://api.github.com/search/users?q=${searchText}`
  );
  let users = await res.json();
  let matches;
  matches = users.items.filter((user) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return user.login.match(regex);
  });

  if (searchText.length == 0) {
    matches = [];
    list.innerHTML = "";
  }

  outputHtml(matches);
};

search.addEventListener("input", () => searchStates(search.value));
