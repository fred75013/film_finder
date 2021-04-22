const searchBtn = document.querySelector(".btn");
const searchBar = document.querySelector("#site-search");
const cardFilm = document.querySelector("#card-film");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let searching = searchBar.value.split(" ").join("+");

  const url = `http://www.omdbapi.com/?s=${searching}&page2&apikey=[yourkey]`;

  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      cardFilm.innerHTML = "";
      filmbInfo(response.Search);
    })

    .catch((error) => console.error("error:", error));

  const filmbInfo = (response) => {
    let arrFilm = response;
    arrFilm.forEach((element) => {
      const poster = element.Poster;
      const title = element.Title;
      const year = element.Year;
      cardFilm.innerHTML += `
    <div class="align-card-film">
      <div>
        <img src="${poster}" alt="affiche du film" class="img-card-film">
      </div>
      <div class="card-film-r"> 
        <h3>${title}</h3>
        <p>date de sortie : ${year}</p>
        <button class="read-more" onclick="OpenModal('${title}')">Read More</button>
    
      </div>
    </div>`;
    });

    let items = document.querySelectorAll(".align-card-film");

    let observer = new IntersectionObserver(
      function (observable) {
        observable.forEach((observable) => {
          if (observable.intersectionRatio > 0.5) {
            observable.target.classList.remove("not-visible");
          }
        });
      },
      {
        threshold: [0.5],
      }
    );
    items.forEach((item) => {
      item.classList.add("not-visible");
      observer.observe(item);
    });
  };
});

const OpenModal = (data) => {
  const urlByTitle = `http://www.omdbapi.com/?t=${data}&apikey=[yourkey]`;
  fetch(urlByTitle)
    .then((response) => response.json())
    .then((response) => {
      modalInfos(response);
    })
    .catch((error) => console.error("error:", error));

  let modal = document.getElementById("myModal");
  modal.style.display = "block";

  let span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  const modalFilm = document.querySelector(".description-modal");
  const modalInfos = (response) => {
    const title = response.Title;
    const description = response.Plot;
    const released = response.Released;
    const poster = response.Poster;
    modalFilm.innerHTML = `
    <div>
      <img src="${poster}" alt="" class="img-modal">
    </div>
    <div class="modal-r">
      <h3>${title}</h3>
      <p>Date de sorti : ${released}</p>
      <p>Synopsys:</p>
      <p>${description}</p>
    </div>
    `;
  };
};
