let author;
let package;

//If link matches, open a download link
async function onButtonClick(tab) {
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

      //Get latest version from API
      const versionRequest = await fetch("https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery?api-version=3.0-preview.1", {
        method: "POST",
        body: JSON.stringify({
          filters:[{
            pageNumber:1,
            pageSize:1,
            criteria:[{
              filterType: 7, //Filter by name
              value: `${author}.${package}`
            }]
          }],
          assetTypes: [], //Shouldn't be needed
          flags: 1 //Include version info
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (versionRequest.ok) {
        const requestJson = await versionRequest.json();
        console.log(requestJson);
        const versions = requestJson.results[0].extensions[0].versions;
        const latestVersion = versions[0].version;
        openDownload(latestVersion);
      }
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