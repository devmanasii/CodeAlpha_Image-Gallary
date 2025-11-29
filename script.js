/* ------------------ LIGHTBOX ------------------ */
const gallery = document.querySelectorAll(".gallery .image img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
let index = 0;

gallery.forEach((img, i) => {
  img.onclick = () => {
    index = i;
    showImage();
  }
});

function showImage() {
  lightbox.style.display = "flex";
  lightboxImg.src = gallery[index].src;
}

document.querySelector(".close").onclick = () => lightbox.style.display = "none";

document.querySelector(".next").onclick = () => {
  index = (index + 1) % gallery.length;
  showImage();
};

document.querySelector(".prev").onclick = () => {
  index = (index - 1 + gallery.length) % gallery.length;
  showImage();
};

/* ------------------ FILTERS ------------------ */
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelector(".active").classList.remove("active");
    btn.classList.add("active");

    let category = btn.dataset.category;

    document.querySelectorAll(".image").forEach(card => {
      card.style.display =
        category === "all" || card.classList.contains(category)
          ? "block"
          : "none";
    });
  };
});

/* ------------------ SEARCH FILTER ------------------ */
document.getElementById("searchBox").addEventListener("keyup", function () {
  let value = this.value.toLowerCase();

  document.querySelectorAll(".image").forEach(img => {
    let title = img.dataset.title.toLowerCase();
    img.style.display = title.includes(value) ? "block" : "none";
  });
});

/* ------------------ THEME TOGGLE ------------------ */
const themeButton = document.getElementById("themeToggle");

themeButton.onclick = () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light"))
    themeButton.textContent = "☀️";
  else
    themeButton.textContent = "🌙";
};

/* ------------------ IMAGE UPLOAD ------------------ */
document.getElementById("uploadInput").addEventListener("change", function () {
  let file = this.files[0];
  let reader = new FileReader();

  reader.onload = () => {
    let div = document.createElement("div");
    div.className = "image custom";
    div.dataset.title = file.name;

    div.innerHTML = `<img src="${reader.result}">`;
    document.getElementById("gallery").appendChild(div);

    // Refresh click event for lightbox
    div.querySelector("img").onclick = () => {
      lightboxImg.src = reader.result;
      lightbox.style.display = "flex";
    };
  };

  reader.readAsDataURL(file);
});
