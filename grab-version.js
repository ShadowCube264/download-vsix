//Attempt to get latest version from page HTML
let label = document.querySelector("#version");
if (label) {
    let versionLabel = label.nextElementSibling;
    if (versionLabel) {
        versionLabel.textContent
    } else {
        null;
        console.error("Could not find version ID");
    }
} else {
    null;
    console.error("Could not find version ID");
}