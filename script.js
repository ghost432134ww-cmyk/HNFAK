const TMDB_API = 'c4c468367090c8c779814353144fe7f7';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const HERO_PATH = 'https://image.tmdb.org/t/p/original';

const app = {
    async fetchPopular() {
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API}&language=tr-TR`);
        const data = await res.json();
        this.setHero(data.results[0]);
        this.render(data.results);
    },

    async fetchByCategory(genreId) {
        const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API}&with_genres=${genreId}&language=tr-TR`);
        const data = await res.json();
        this.render(data.results);
        window.scrollTo({ top: 450, behavior: 'smooth' });
    },

    async search() {
        const q = document.getElementById('searchInput').value;
        if(!q) return;
        const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API}&query=${q}&language=tr-TR`);
        const data = await res.json();
        this.render(data.results);
    },

    setHero(movie) {
        const hero = document.getElementById('heroSection');
        hero.style.backgroundImage = `url(${HERO_PATH + movie.backdrop_path})`;
        document.getElementById('heroTitle').innerText = movie.title;
        document.getElementById('heroDesc').innerText = movie.overview.slice(0, 180) + "...";
        document.getElementById('heroPlayBtn').onclick = () => this.play(movie.id);
    },

    render(movies) {
        const grid = document.getElementById('movieGrid');
        grid.innerHTML = movies.filter(m => m.poster_path).map(m => `
            <div class="movie-card" onclick="app.play('${m.id}')">
                <img src="${IMG_PATH + m.poster_path}" alt="${m.title}">
            </div>
        `).join('');
    },

    play(id) {
        const modal = document.getElementById('playerModal');
        const frame = document.getElementById('videoFrame');
        const sBar = document.getElementById('sourceBar');

        // Dublaj öncelikli sunucu
        frame.src = `https://vidsrc.me/embed/movie?tmdb=${id}&lang=tr`;
        
        sBar.innerHTML = `
            <button class="source-btn" onclick="app.changeSource('https://vidsrc.me/embed/movie?tmdb=${id}&lang=tr')">Sunucu 1 (Dublaj)</button>
            <button class="source-btn" onclick="app.changeSource('https://vidsrc.to/embed/movie/${id}')">Sunucu 2</button>
        `;
        
        modal.style.display = 'flex';
    },

    changeSource(url) {
        document.getElementById('videoFrame').src = url;
    },

    closePlayer() {
        document.getElementById('playerModal').style.display = 'none';
        document.getElementById('videoFrame').src = '';
    }
};

window.onload = () => app.fetchPopular();