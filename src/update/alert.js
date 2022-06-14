
export const loadRoutes = async () => {
  const load = await fetch("https://raw.githubusercontent.com/JuanDAC/hbmt-extention/main/manifest.json");
  const { version } = await load.json();
  if (version !== VERSION) {
    const $container = document.querySelector("#layout-bars");
    const $alert = document.createElement("DIV");
    $alert.setAttribute("id", "viewing_as_permission_group");
    $alert.className = "group-staff";
    const $alertTextConatainer = document.createElement("DIV");
    const $alertLinkContainer = document.createElement("DIV");
    const $iconDownload = document.createElement("I");
    $iconDownload.setAttribute("aria-hidden", "true")
    $iconDownload.classList.add("fa", "fa-download")
    const $TextAler = document.createTextNode("You have an extension update pending");
    $alertTextConatainer.appendChild($iconDownload);
    $alertTextConatainer.appendChild($TextAler);
    const $enabled = document.createTextNode("Update enabled:&nbsp;");
    const $enabledFinally = document.createTextNode("&nbsp;|&nbsp;");
    const $downloadLink = document.createElement("A");
    $downloadLink.setAttribute("href", "https://github.com/JuanDAC/hbmt-extention/raw/main/HolbertonSchool.zip");
    $alertLinkContainer.appendChild($enabled);
    $alertLinkContainer.appendChild($downloadLink);
    $alertLinkContainer.appendChild($enabledFinally);
    $container.appendChild($alert);
    setTimeout(() => $alert.remove(), 10000)
  }
  $alertLinkContainer.appendChild($downloadLink);
};
