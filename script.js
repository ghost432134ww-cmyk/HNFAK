const TMDB_API = 'c4c468367090c8c779814353144fe7f7';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500/'; // Slash eklendi
const HERO_PATH = 'https://image.tmdb.org/t/p/original/';

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
        document.querySelector('.row-title').innerText = "Kategori Sonuçları";
        this.render(data.results);
        window.scrollTo({ top: 400, behavior: 'smooth' });
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
        const bg = HERO_PATH + movie.backdrop_path;
        hero.style.backgroundImage = `linear-gradient(to right, #080808 10%, transparent 90%), url(${bg})`;
        document.getElementById('heroTitle').innerText = movie.title;
        document.getElementById('heroDesc').innerText = movie.overview.slice(0, 150) + "...";
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
        const frame = document.getElementById('videoFrame');
        // vidsrc.to otomatik türkçe ses desteği sağlar
        frame.src = `https://vidsrc.to/embed/movie/${id}`;
        document.getElementById('playerModal').style.display = 'flex';
    },

    closePlayer() {
        document.getElementById('playerModal').style.display = 'none';
        document.getElementById('videoFrame').src = '';
    }
};

window.onload = () => app.fetchPopular();
