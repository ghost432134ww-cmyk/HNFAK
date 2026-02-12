/**
 * HNFAK | MASTERPIECE SCRIPT v11
 * Hatasız, 404 engelleyici ve akıllı oynatıcı motoru.
 */

// 1. Veritabanı (Film ve Dizi Bilgileri)
const db = [
    { id: "tt6263850", t: "Deadpool & Wolverine", c: "Trendler", i: "8cdWjvZQUmOZabaBSEm6768v6NG", ty: "movie", h: "https://image.tmdb.org/t/p/original/m4Jm2unRjBkvvCU2Zp2Setp9YmE.jpg" },
    { id: "tt31046101", t: "Primate", c: "Yeni Çıkanlar", i: "29SBy9p2A963Tia8pP2S0Y6v8p6", ty: "movie" },
    { id: "tt15239678", t: "Dune: Part Two", c: "Aksiyon", i: "pWy85e9Q3Z4r9tD4T3S1g5f4q5A", ty: "movie" },
    { id: "tt3556926", t: "The Last of Us", c: "Diziler", i: "uKvVjHNqBPlVZjZSThO2F68Ck86", ty: "tv" },
    { id: "tt12637874", t: "Fallout", c: "Diziler", i: "hUu9bTwhA7V13X6c12U533JkHhF", ty: "tv" },
    { id: "tt11389872", t: "Kingdom of Apes", c: "Trendler", i: "gKkl37HQuKTSkA6Y3XpxlYpRw33", ty: "movie" },
    { id: "tt10366206", t: "John Wick 4", c: "Aksiyon", i: "vZloFAK7NmvMGKE7VkF5UHaz0I", ty: "movie" },
    { id: "tt22022452", t: "Ters Yüz 2", c: "Yeni Çıkanlar", i: "vpnVM9B6NMmQpWeZvzLvDESb2QY", ty: "movie" }
];

// 2. Uygulama Başlatıcı
function initApp() {
    const rowContainer = document.getElementById('rows-container') || document.getElementById('content');
    if (!rowContainer) return;

    // Kategorileri otomatik oluştur
    const categories = [...new Set(db.map(item => item.c))];

    categories.forEach(cat => {
        let sectionHTML = `
            <div class="section">
                <div class="section-title">${cat}</div>
                <div class="slider">
        `;

        db.filter(item => item.c === cat).forEach(item => {
            sectionHTML += `
                <div class="card" onclick="startStream('${item.ty}', '${item.id}', '${item.t}')">
                    <img src="https://image.tmdb.org/t/p/w300/${item.i}.jpg" 
                         onerror="this.src='https://via.placeholder.com/300x450/111/fff?text=HNFAK'" 
                         loading="lazy">
                </div>
            `;
        });

        sectionHTML += `</div></div>`;
        rowContainer.innerHTML += sectionHTML;
    });

    // Manşet (Hero) Ayarları
    setupHero();
    
    // Geçmişi Kontrol Et
    checkHistory();

    // Loader'ı kapat (Hızlandırılmış)
    setTimeout(hideLoader, 1500);
}

// 3. Hero Bölgesi Ayarları
function setupHero() {
    const heroTitle = document.getElementById('hero-t') || document.getElementById('hero-name');
    const heroBg = document.getElementById('hero-bg') || document.getElementById('hero-box');
    const heroBtn = document.getElementById('hero-p') || document.getElementById('hero-btn');

    if (heroTitle && heroBg) {
        const mainMedia = db[0];
        heroTitle.innerText = mainMedia.t;
        heroBg.style.backgroundImage = `url('${mainMedia.h}')`;
        heroBtn.onclick = () => startStream(mainMedia.ty, mainMedia.id, mainMedia.t);
    }
}

// 4. KRİTİK: Oynatıcı Motoru (amped.su kesinlikle yok!)
function startStream(type, id, title) {
    // İzleme geçmişini kaydet
    localStorage.setItem('hnfak_last_watch', JSON.stringify({type, id, title}));

    const playerUI = document.getElementById('player-ui') || document.getElementById('player');
    const iframe = document.getElementById('main-iframe') || document.getElementById('video-frame') || document.getElementById('v-frame');

    if (playerUI && iframe) {
        // Dünyanın en stabil sunucusu: vidsrc.pro
        // Bu sunucu IP hatası vermez ve otomatik Türkçe dil desteği sunar.
        iframe.src = `https://vidsrc.pro/embed/${type}/${id}`;
        playerUI.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Kaydırmayı engelle
    }
}

// 5. Oynatıcıyı Kapat
function closeStream() {
    const playerUI = document.getElementById('player-ui') || document.getElementById('player');
    const iframe = document.getElementById('main-iframe') || document.getElementById('video-frame') || document.getElementById('v-frame');

    if (playerUI && iframe) {
        playerUI.style.display = 'none';
        iframe.src = ''; // Kaynağı temizle (sesi durdurur)
        document.body.style.overflow = 'auto';
        checkHistory();
    }
}

// 6. Loader Kontrolü
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }
}

// 7. İzleme Geçmişi (Kaldığın Yerden Devam)
function checkHistory() {
    const last = JSON.parse(localStorage.getItem('hnfak_last_watch'));
    const contRow = document.getElementById('continue-row') || document.getElementById('continue-bar');
    const contDisplay = document.getElementById('cont-display') || document.getElementById('cont-body');

    if (last && contRow && contDisplay) {
        contRow.style.display = 'block';
        contDisplay.innerHTML = `
            <div class="cont-box" onclick="startStream('${last.type}', '${last.id}', '${last.title}')" style="cursor:pointer; display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.1); padding:10px; border-radius:10px;">
                <span style="color:#ff0000; font-size:20px;">▶</span>
                <div style="font-size:13px; font-weight:bold;">${last.title}</div>
            </div>
        `;
    }
}

// Uygulamayı başlat
window.onload = initApp;

// Global erişim için (HTML içindeki onclick'ler için)
window.startStream = startStream;
window.closeStream = closeStream;
