var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");
var siteList = [];

if (localStorage.getItem("sites") !== null) {
  siteList = JSON.parse(localStorage.getItem("sites"));
  displaysiteList();
}

function addSite() {
  if (validInputs()) {
    var website = {
      name: siteNameInput.value.replace(/^\s+|\s+$/g, ""),
      url: siteURLInput.value.replace(/^\s+|\s+$/g, "")
    };
    siteList.push(website);
    clearInputs();
    setItemInlocalStorage();
    displaysiteList();
  }
}

function clearInputs() {
  siteNameInput.value = "";
  siteURLInput.value = "";
  siteNameInput.classList.remove("is-valid","is-invalid");
  siteURLInput.classList.remove("is-valid","is-invalid");
}

function setItemInlocalStorage() {
  localStorage.setItem("sites", JSON.stringify(siteList));
}

function displaysiteList() {
  var table = "";
  for (var i = 0; i < siteList.length; i++) {
    table += `
    <tr>
      <td>${i + 1}</td>
      <td>${siteList[i].name}</td>
      <td>
        <a href="${siteList[i].url}" target="_blank">
          <button class="btn-success">Visit</button>
        </a>
      </td>
      <td>
        <button class="btn-danger" onclick="deleteSite(${i})">Delete</button>
      </td>
    </tr>`;
  }
  document.getElementById("bodyTable").innerHTML = table;
}

function deleteSite(index) {
  siteList.splice(index, 1);
  setItemInlocalStorage();
  displaysiteList();
}

function validInputs() {
  var regexName = /^[a-zA-Z0-9]{3,}$/;
  var regexURL = /^(https?:\/\/|www\.)[a-z0-9\-\.]+\.[a-z]{2,}(\S*)?$/;
  var nameValue = siteNameInput.value.replace(/^\s+|\s+$/g, "");
  var urlValue = siteURLInput.value.replace(/^\s+|\s+$/g, "");
  var validName = regexName.test(nameValue);
  var validURL = regexURL.test(urlValue);

  siteNameInput.classList.remove("is-valid","is-invalid");
  if (nameValue !== "") validName ? siteNameInput.classList.add("is-valid") : siteNameInput.classList.add("is-invalid");

  siteURLInput.classList.remove("is-valid","is-invalid");
  if (urlValue !== "") validURL ? siteURLInput.classList.add("is-valid") : siteURLInput.classList.add("is-invalid");

  return validName && validURL;
}