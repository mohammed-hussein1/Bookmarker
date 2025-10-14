var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var tableContent = document.getElementById("tableContent");
var boxModal = document.querySelector(".box-info");
var bookmarks = [];

if (localStorage.getItem("bookmarksList")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  for (var x = 0; x < bookmarks.length; x++) {
    displayBookmark(x);
  }
}

function displayBookmark(indexOfWebsite) {
  var userURL = bookmarks[indexOfWebsite].siteURL;
  var httpsRegex = /^https?:\/\//g;
  if (httpsRegex.test(userURL)) {
    validURL = userURL;
    fixedURL = validURL
      .split("")
      .splice(validURL.match(httpsRegex)[0].length)
      .join("");
  } else {
    var fixedURL = userURL;
    validURL = (`https://${userURL}`);
  }
  var newBookmark = `
              <tr>
                <td>${indexOfWebsite + 1}</td>
                <td>${bookmarks[indexOfWebsite].siteName}</td>              
                <td>
                  <button class="btn btn-visit" onclick="visitWebsite(${indexOfWebsite})">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button class="btn btn-delete" onclick="deleteBookmark(${indexOfWebsite})">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
            `;
  tableContent.innerHTML += newBookmark;
}

function clearInput() {
  siteName.value = "";
  siteURL.value = "";
}

function capitalize(str) {
  let strArr = str.split("");
  strArr[0] = strArr[0].toUpperCase();
  return strArr.join("");
}

// دالة جديدة للأزرار الثابتة
function handleSubmit() {
  if (
    siteName.classList.contains("is-valid") &&
    siteURL.classList.contains("is-valid")
  ) {
    var bookmark = {
      siteName: capitalize(siteName.value),
      siteURL: siteURL.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    displayBookmark(bookmarks.length - 1);
    clearInput();
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
  } else {
    boxModal.classList.remove("d-none");
  }
}

function deleteBookmark(index) {
  tableContent.innerHTML = "";
  bookmarks.splice(index, 1);
  for (var k = 0; k < bookmarks.length; k++) {
    displayBookmark(k);
  }
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}

function visitWebsite(index) {
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(bookmarks[index].siteURL)) {
    open(bookmarks[index].siteURL);
  } else {
    open(`https://${bookmarks[index].siteURL}`);
  }
}

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

function validateSiteName() {
  validate(siteName, nameRegex);
}

function validateSiteURL() {
  validate(siteURL, urlRegex);
}

function validate(element, regex) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

function closeModal() {
  boxModal.classList.add("d-none");
}