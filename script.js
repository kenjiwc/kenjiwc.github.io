// ============================================
// MYSPACE-STYLE MUSIC PLAYER
// ============================================
// To use real songs: put MP3 files in the /assets folder and update
// the `src` field for each track below. File names are just examples.

const playlist = [
  { title: "Summer Nights",      artist: "The Faded Polaroids", src: "assets/track1.mp3" },
  { title: "Dial Tone Romance",  artist: "Static Youth",        src: "assets/track2.mp3" },
  { title: "Neon & Nostalgia",   artist: "Casette Future",      src: "assets/track3.mp3" },
];

let currentTrack = 0;
let isPlaying = false;

const audio = new Audio();
audio.volume = 0.6;

const els = {
  playBtn: document.getElementById("player-play"),
  prevBtn: document.getElementById("player-prev"),
  nextBtn: document.getElementById("player-next"),
  trackLabel: document.getElementById("player-track-label"),
  progressBar: document.getElementById("player-progress"),
  progressFill: document.getElementById("player-progress-fill"),
  timeCurrent: document.getElementById("player-time-current"),
  playlistEl: document.getElementById("player-playlist"),
  volumeSlider: document.getElementById("player-volume-slider"),
};

function formatTime(seconds) {
  if (!isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function loadTrack(index, autoplay) {
  currentTrack = (index + playlist.length) % playlist.length;
  const track = playlist[currentTrack];
  audio.src = track.src;

  els.trackLabel.innerHTML =
    `<span class="marquee-wrap"><span class="marquee">Now playing: <strong>${track.title}</strong> &mdash; ${track.artist} &nbsp;&nbsp;&bull;&nbsp;&nbsp; Now playing: <strong>${track.title}</strong> &mdash; ${track.artist}</span></span>`;

  renderPlaylist();

  if (autoplay) {
    audio.play().catch(() => {
      // Autoplay can be blocked by the browser until the user interacts.
      isPlaying = false;
      els.playBtn.textContent = "▶";
    });
  }
}

function renderPlaylist() {
  els.playlistEl.innerHTML = "";
  playlist.forEach((track, i) => {
    const row = document.createElement("div");
    row.textContent = `${i + 1}. ${track.title} — ${track.artist}`;
    if (i === currentTrack) row.classList.add("active");
    row.addEventListener("click", () => {
      loadTrack(i, true);
      isPlaying = true;
      els.playBtn.textContent = "❙❙";
    });
    els.playlistEl.appendChild(row);
  });
}

function togglePlay() {
  if (isPlaying) {
    audio.pause();
    els.playBtn.textContent = "▶";
  } else {
    audio.play().catch(() => {
      console.log("Playback blocked until a track file is added, or browser needs a direct interaction.");
    });
    els.playBtn.textContent = "❙❙";
  }
  isPlaying = !isPlaying;
}

els.playBtn.addEventListener("click", togglePlay);

els.nextBtn.addEventListener("click", () => {
  loadTrack(currentTrack + 1, isPlaying);
});

els.prevBtn.addEventListener("click", () => {
  loadTrack(currentTrack - 1, isPlaying);
});

audio.addEventListener("timeupdate", () => {
  const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  els.progressFill.style.width = pct + "%";
  els.timeCurrent.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("ended", () => {
  loadTrack(currentTrack + 1, true);
});

els.progressBar.addEventListener("click", (e) => {
  const rect = els.progressBar.getBoundingClientRect();
  const ratio = (e.clientX - rect.left) / rect.width;
  if (audio.duration) audio.currentTime = ratio * audio.duration;
});

els.volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value / 100;
});

// Initialize with the first track loaded (not playing, to respect autoplay rules)
loadTrack(0, false);


// ============================================
// "CURRENTLY ONLINE" BLINK (kept lightweight & accessible)
// ============================================
// Handled entirely in CSS via the .blink class — no JS needed,
// but respects prefers-reduced-motion automatically through CSS.