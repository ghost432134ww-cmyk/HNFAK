/**
 * PREMIUM SİNEMA KEYFİ - SCRIPT.JS
 * Tasarımı bozmaz, sadece işlevselliği sağlar.
 */

// 1. Görsellerdeki Filmlerin Listesi
const movies = [
    { id: "tt7737786", t: "Greenland: Kıyamet", i: "8cdWjvZQUmOZabaBSEm6768v6NG", ty: "movie" },
    { id: "tt14539740", t: "Hizmetçi", i: "hUu9bTwhA7V13X6c12U533JkHhF", ty: "movie" },
    { id: "tt16432248", t: "Yıkım Ekibi", i: "pWy85e9Q3Z4r9tD4T3S1g5f4q5A", ty: "movie" },
    { id: "tt31046101", t: "Primat", i: "29SBy9p2A963Tia8pP2S0Y6v8p6", ty: "movie" },
    { id: "tt5884792", t: "Zootropolis 2", i: "vpnVM9B6NMmQpWeZvzLvDESb2QY", ty: "movie" },
    { id: "tt10366206", t: "John Wick 4", i: "vZloFAK7NmvMGKE7VkF5UHaz0I", ty: "movie" }
];

// 2. Sayfa Yüklendiğinde Kartları Oluştur
function init() {
    const movieRow = document.querySelector('.slider') || document.getElementById('movie-row');
    if (!movieRow) return;

    // Mevcut statik kartları temizle ve DB'den çek
    movieRow.innerHTML = ""; 

    movies.forEach(m => {
        const cardHTML = `
            <div class="card" onclick="openPlayer('${m.ty}', '${m.id}')">
                <img src="https://image.tmdb.org/t/p/w500/${m.i}.jpg" alt="${m.t}">
            </div>
        `;
        movieRow.innerHTML += cardHTML;
    });
}

// 3. Video Oynatıcı Motoru (Hemen İzle Butonu ve Kartlar İçin)
function openPlayer(type, id) {
    const playerUI = document.getElementById('player-ui') || document.getElementById('player');
    const iframe = document.getElementById('video-frame') || document.getElementById('ifr');

    if (playerUI && iframe) {
        // En stabil ve hızlı sunucu
        iframe.src = `https://vidsrc.pro/embed/${type}/${id}`;
        playerUI.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Sayfa kaymasını engelle
    }
}

// 4. Oynatıcıyı Kapatma
function closePlayer() {
    const playerUI = document.getElementById('player-ui') || document.getElementById('player');
    const iframe = document.getElementById('video-frame') || document.getElementById('ifr');

    if (playerUI && iframe) {
        playerUI.style.display = 'none';
        iframe.src = ''; // Videoyu durdur
        document.body.style.overflow = 'auto';
    }
}

// Başlat
window.onload = init;
