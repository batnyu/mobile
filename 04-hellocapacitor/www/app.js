const url = "https://devfest-nantes-2018-api.cleverapps.io/blog";
const urlImages = "https://devfest2018.gdgnantes.com";
const myList = document.getElementById("ion-list");

fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    for (var i = 0; i < data.length; i++) {
      const itemElement = createItem(urlImages, data[i]);
      myList.appendChild(itemElement);
    }
  })
  .then(function() {
    addCachedItems();
  });

async function addCachedItems() {
  const keysCache = await keys();
  for (let i = keysCache.keys.length - 1; i >= 0; i--) {
    const itemCache = await getObject(keysCache.keys[i]);
    const itemElement = createItem("", itemCache);

    myList.prepend(itemElement);
  }
}

function createItem(preUrl, item) {
  const listItem = document.createElement("ion-card");
  const img = document.createElement("img");

  if (item.image) {
    if (!item.image.base64String) {
      img.setAttribute("src", preUrl + item.image);
    } else {
      img.setAttribute(
        "src",
        `data:image/${item.image.format};base64,${item.image.base64String}`
      );
    }
  }

  listItem.appendChild(img);

  const title = document.createElement("div");
  title.setAttribute("class", "title");
  title.innerText = item.title;
  listItem.appendChild(title);

  const brief = document.createElement("div");
  brief.setAttribute("class", "brief");
  brief.innerText = item.brief;
  listItem.appendChild(brief);

  return listItem;
}

const { CameraResultType } = capacitorExports;
const { Camera } = Plugins;

async function takePicture() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Base64
  });
  // image.webPath will contain a path that can be set as an image src.
  // You can access the original file using image.path, which can be
  // passed to the Filesystem API to read the raw data of the image,
  // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  // var imageUrl = image;
  // Can be set to the src of an image now
  // console.log("image", image);
  presentModal(image);
}

const cameraBtn = document.getElementById("camera");
cameraBtn.onclick = function(event) {
  takePicture();
};

customElements.define(
  "modal-page",
  class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
<ion-header>
  <ion-toolbar>
    <ion-title>Création d'un article privé</ion-title>
    <ion-buttons slot="primary">
      <ion-button onClick="dismissModal()">
        <ion-icon slot="icon-only" name="close"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content class="ion-padding">
  <ion-item>
  <ion-label color="primary" position="floating">Titre <ion-text color="danger">*</ion-text></ion-label>
  <ion-input name="title" id="titleValue" required></ion-input>
  </ion-item>
  <ion-item>
  <ion-label color="primary" position="floating">Description</ion-label>
  <ion-input name="description" id="descriptionValue"></ion-input>
  </ion-item>
  <ion-button expand="block" onclick="save()">Enregistrer</ion-button>

</ion-content>`;
    }
  }
);

function save() {
  const titleElement = document.getElementById("titleValue");
  const descriptionElement = document.getElementById("descriptionValue");
  const modalElement = document.querySelector("ion-modal");

  const item = {
    image: modalElement.componentProps.image,
    title: titleElement.value,
    brief: descriptionElement.value
  };

  if (item.title) {
    const itemElement = createItem("", item);

    myList.prepend(itemElement);
    // Save in cache
    setObject(item);
    dismissModal();
  } else {
    alert("Veuillez remplir le champ Titre");
  }
}

let modalElement;

function presentModal(image) {
  // create the modal with the `modal-page` component
  modalElement = document.createElement("ion-modal");
  modalElement.component = "modal-page";
  modalElement.componentProps = {
    image
  };

  // present the modal
  document.body.appendChild(modalElement);
  return modalElement.present();
}

async function dismissModal() {
  await modalElement.dismiss({
    dismissed: true
  });
}
