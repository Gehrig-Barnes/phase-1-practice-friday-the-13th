function handleFetch() {
  fetch("http://localhost:3000/movies")
    .then((r) => r.json())
    .then((data) => renderMovies(data));
}

handleFetch();

const movieList = document.querySelector("#movie-list");

const title = document.querySelector("#title");
const poster = document.querySelector("#detail-image");
const yearReleased = document.querySelector("#year-released");
const description = document.querySelector("#description");
const button = document.querySelector("#watched");
const amount = document.querySelector("#amount");

let movieId;
button.addEventListener("click", () => {
  fetch(`http://localhost:3000/movies/${movieId}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      watched: button.textContent === "watched" ? false : true,
    }),
  })
    .then((r) => r.json())
    .then((obj) => {
      button.textContent = obj.watched ? "watched" : "unwatched";
      handleFetch();
    });
});

function renderMovies(movies) {
  while (movieList.firstChild) {
    movieList.removeChild(movieList.firstChild);
  }
  movies.forEach((movie) => {
    const image = document.createElement("img");
    image.src = movie.image;
    image.addEventListener("click", () => {
      title.textContent = movie.title;
      poster.src = movie.image;
      yearReleased.textContent = movie.release_year;
      description.textContent = movie.description;
      amount.textContent = movie.blood_amount;
      button.textContent = movie.watched ? "watched" : "unwatched";
      movieId = movie.id;
    });
    movieList.append(image);
  });
}

function updateBloodForm() {
  const form = document.querySelector("#blood-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/movies/${movieId}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        blood_amount:
          parseInt(amount.textContent) +
          parseInt(e.target["blood-amount"].value),
      }),
    })
      .then((r) => r.json())
      .then((obj) => {
        amount.textContent = obj.blood_amount;
        handleFetch();
      });
  });
}

updateBloodForm();
