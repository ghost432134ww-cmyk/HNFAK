/**
 * PREMIUM SİNEMA KEYFİ - ANA MOTOR
 * Orijinal tasarım, hatasız oynatıcı.
 */

// 1. Film ve Dizi Veritabanı
const movies = [
    { id: "tt6263850", i: "8cdWjvZQUmOZabaBSEm6768v6NG", ty: "movie" }, // Deadpool & Wolverine
    { id: "tt15239678", i: "pWy85e9Q3Z4r9tD4T3S1g5f4q5A", ty: "movie" }, // Dune 2
    { id: "tt3556926", i: "uKvVjHNqBPlVZjZSThO2F68Ck86", ty: "tv" },    // The Last of Us
    { id: "tt31046101", i: "29SBy9p2A963Tia8pP2S0Y6v8p6", ty: "movie" }, // Primate
    { id: "tt12637874", i: "hUu9bTwhA7V13X6c12U533JkHhF", ty: "tv" },    // Fallout
    { id: "tt11389872", i: "gKkl37HQuKTSkA6Y3XpxlYpRw33", ty: "movie" }  // Apes
];

// 2. Uygulamayı Başlat
function init() {
    const movieRow = document.getElementById('movie-row');
    if (!movieRow) return;

    movies.forEach(m => {
        const type = m.ty ? m.ty : 'movie';
        const cardHTML = `
            <div class="card" onclick="openPlayer('${type}', '${m.id}')">
                <img src="https://image.tmdb.org/t/p/w500/${m.i}.jpg" loading="lazy">
            </div>
        `;
        movieRow.innerHTML += cardHTML;
    });
}

// 3. Orijinal Oynatıcı Fonksiyonu (Hatasız Versiyon)
function openPlayer(type, id) {
    const player = document.getElementById('player-ui');
    const frame = document.getElementById('video-frame');

    if (player && frame) {
        // ARTIK AMPED.SU YOK! Sadece vidsrc.pro
        // Bu link bilgisayarda açılan linkin aynısıdır.
        frame.src = `https://vidsrc.pro/embed/${type}/${id}`;
        player.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// 4. Oynatıcıyı Kapat
function closePlayer() {
    const player = document.getElementById('player-ui');
    const frame = document.getElementById('video-frame');

    if (player && frame) {
        player.style.display = 'none';
        frame.src = ''; // Sesi ve videoyu durdur
        document.body.style.overflow = 'auto';
    }
}

// Sayfa yüklendiğinde çalıştır
window.onload = init;
