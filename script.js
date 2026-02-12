const movies = [
    { id: "tt6263850", i: "8cdWjvZQUmOZabaBSEm6768v6NG" },
    { id: "tt15239678", i: "pWy85e9Q3Z4r9tD4T3S1g5f4q5A" },
    { id: "tt3556926", i: "uKvVjHNqBPlVZjZSThO2F68Ck86" },
    { id: "tt31046101", i: "29SBy9p2A963Tia8pP2S0Y6v8p6" }
];

function init() {
    const row = document.getElementById('movie-row');
    if(row) {
        movies.forEach(m => {
            row.innerHTML += `
                <div class="card" onclick="openPlayer('movie', '${m.id}')">
                    <img src="https://image.tmdb.org/t/p/w500/${m.i}.jpg">
                </div>`;
        });
    }
}

function openPlayer(type, id) {
    const player = document.getElementById('player-ui');
    const frame = document.getElementById('video-frame');
    frame.src = `https://amped.su/embed/${type}/${id}`;
    player.style.display = 'block';
}

function closePlayer() {
    document.getElementById('player-ui').style.display = 'none';
    document.getElementById('video-frame').src = '';
}

window.onload = init;
