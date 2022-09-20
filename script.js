const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

// search by song or artist

async function searchSongs(term) {
  // fetch(`${apiURL}/suggest/${term}`)
  //  .then((res) => res.json())
  // .then((data) => console.log(data));

  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  console.log(data);
  showData(data);
}

//show song and astist in dom
function showData(data) {
  let output = "";

  //data.data.forEach((song) => {
  //  output += `
  // <li>
  // <span><strong> ${song.artist.name}</strong> - ${song.title}</span

  // <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}"> get lyrics </button>
  // </li>

  // `;
  // });

  //result.innerHTML = `
  //<ul class="songs"> ${output}</ul>
  //`;

  result.innerHTML = `
  <ul class="songs">
  ${data.data
    .map(
      (song) => `
  <li> 
  <span><strong> ${song.artist.name}</strong> - ${song.title}</span

  <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}"> get lyrics </button> 
  </li>
 
  `
    )
    .join("")}
  
  </ul>`;

  if (data.prev || data.next) {
    more.innerHTML = `
    ${
      data.prev
        ? `<button class="btn" onclick="getMoreSongs('${data.prev}')"> prev</button>`
        : ""
    }
    ${
      data.next
        ? `<button class="btn" onclick="getMoreSongs('${data.next}')> next</button>`
        : ""
    }
    `;
  } else {
    more.innerHTML = "";
  }
}

//get more songs

async function getMoreSongs(url) {
  const res = await fetch(url);
  const data = await res.json();

  showData(data);
}

// event listners

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert("please enter a search term");
  } else {
    searchSongs(searchTerm);
  }
});
