let author;
let package;

//If link matches, open a download link
function onButtonClick(tab) {
  let url = URL.parse(tab.url);
  let path = url.hostname + url.pathname;

  //Check for valid URL - though it should be filtered by manifest anyway
  if (path == "marketplace.visualstudio.com/items") {
    //Check for a valid query
    let params = url.searchParams;
    if (params.has("itemName"))
    {
      [author, package] = params.get("itemName").split(".");
      prompt("sometext","defaultText");
      //Get latest version from page HTML
      browser.tabs.executeScript({file: "/grab-version.js"}).then(openDownload);
    }
  }
}

function openDownload(version) {
  if (version) {
    //Construct download URL
    var downloadPath = "https://marketplace.visualstudio.com/_apis/public/gallery/publishers/" + author + "/vsextensions/" + package + "/" + version + "/vspackage";
    browser.tabs.create({
      "url": downloadPath
    });
  }
}

//Listen for button click
browser.pageAction.onClicked.addListener(onButtonClick);