// =========================
// SWIMEDU DETAIL MATERI JS
// CLEAN + MODERN VERSION
// =========================

const materiList = [
  "Pengenalan Renang",
  "Teknik Gaya Bebas",
  "Latihan Kebugaran",
  "Keselamatan Air"
];

const materiData = {

  "Pengenalan Renang": {
    deskripsi: "Dasar pengenalan air dan adaptasi tubuh dalam olahraga renang.",
    isi: `
<h2>Pengenalan Air dalam Renang</h2>

<p>
Pengenalan air adalah tahap awal dalam pembelajaran renang yang bertujuan
membangun rasa percaya diri serta adaptasi tubuh terhadap lingkungan air.
Tahapan ini sangat penting bagi pemula sebelum mempelajari teknik renang.
</p>

<h3>Manfaat Pengenalan Air</h3>

<ul>
  <li>Mengurangi rasa takut terhadap air</li>
  <li>Meningkatkan koordinasi tubuh</li>
  <li>Melatih teknik pernapasan</li>
  <li>Membangun keseimbangan di air</li>
  <li>Meningkatkan kebugaran tubuh</li>
</ul>

<h3>Latihan Dasar</h3>

<p>
Latihan dasar meliputi mengapung, meluncur, menendang,
dan latihan pernapasan sederhana.
</p>
`,
    gambar: "img/materi1.jpg",
    video: "https://www.youtube.com/embed/5HLW2AI1Ink"
  },

  "Teknik Gaya Bebas": {
    deskripsi: "Mempelajari teknik dasar renang gaya bebas.",
    isi: `
<h2>Teknik Dasar Renang Gaya Bebas</h2>

<p>
Renang gaya bebas merupakan gaya renang tercepat
dan paling populer dalam perlombaan.
</p>

<h3>Teknik Dasar</h3>

<ul>
  <li><strong>Posisi Tubuh:</strong> tubuh sejajar permukaan air.</li>
  <li><strong>Gerakan Tangan:</strong> dilakukan bergantian ke depan.</li>
  <li><strong>Gerakan Kaki:</strong> menggunakan flutter kick.</li>
  <li><strong>Pernapasan:</strong> mengambil napas dari samping.</li>
</ul>

<h3>Manfaat</h3>

<p>
Gaya bebas membantu meningkatkan kekuatan otot,
daya tahan, dan kesehatan jantung.
</p>
`,
    gambar: "img/gaya-bebas.jpg",
    video: "https://www.youtube.com/embed/s2h0tFWwqFc"
  },

  "Latihan Kebugaran": {
    deskripsi: "Latihan fisik pendukung performa renang.",
    isi: `
<h2>Latihan Kebugaran Renang</h2>

<p>
Latihan kebugaran membantu meningkatkan performa
dan kekuatan tubuh dalam berenang.
</p>

<h3>Jenis Latihan</h3>

<ul>
  <li>Latihan kardio</li>
  <li>Latihan kekuatan otot</li>
  <li>Latihan fleksibilitas</li>
  <li>Latihan daya tahan</li>
</ul>

<h3>Tujuan Latihan</h3>

<p>
Meningkatkan stamina, kekuatan otot,
dan efisiensi gerakan saat berenang.
</p>
`,
    gambar: "img/kebugaran.jpg",
    video: "https://www.youtube.com/embed/JghqyliWwb4"
  },

  "Keselamatan Air": {
    deskripsi: "Materi keamanan dan keselamatan saat berenang.",
    isi: `
<h2>Keselamatan Air</h2>

<p>
Keselamatan air merupakan bagian penting dalam olahraga renang
untuk mencegah risiko cedera dan kecelakaan.
</p>

<h3>Prinsip Keselamatan</h3>

<ul>
  <li>Melakukan pemanasan</li>
  <li>Menggunakan alat bantu bila diperlukan</li>
  <li>Tidak berenang sendirian</li>
  <li>Memahami kedalaman kolam</li>
  <li>Mematuhi instruksi pelatih</li>
</ul>

<h3>Tujuan</h3>

<p>
Menciptakan aktivitas renang yang aman,
nyaman, dan menyenangkan.
</p>
`,
    gambar: "img/keselamatan.jpg",
    video: "https://www.youtube.com/embed/1J4Qx4g5k1A"
  }
};

// =========================
// CURRENT INDEX
// =========================

let currentIndex = 0;

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

if (id && materiList.includes(id)) {
  currentIndex = materiList.indexOf(id);
}

// =========================
// LOAD MATERI
// =========================

function loadMateri(index) {

  const key = materiList[index];
  const data = materiData[key];

  // title
  document.title = `${key} - SwimEdu`;

  // heading
  document.getElementById("judul-materi").innerText = key;

  // desc
  const desc = document.getElementById("deskripsi-materi");
  if (desc) {
    desc.innerText = data.deskripsi;
  }

  // isi materi
  document.getElementById("isi-materi").innerHTML = data.isi;

  // gambar
  const img = document.getElementById("materi-gambar");

  img.src = data.gambar;
  img.style.display = "block";

  // video
  document.getElementById("materi-video").innerHTML = `
    <iframe
      width="100%"
      height="420"
      src="${data.video}"
      title="${key}"
      frameborder="0"
      allowfullscreen>
    </iframe>
  `;

  // progress nav
  updateNavButton();
}

// =========================
// NEXT PREV
// =========================

function nextMateri() {

  if (currentIndex < materiList.length - 1) {

    currentIndex++;

    loadMateri(currentIndex);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
}

function prevMateri() {

  if (currentIndex > 0) {

    currentIndex--;

    loadMateri(currentIndex);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
}

// =========================
// BUTTON STATE
// =========================

function updateNavButton() {

  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  if (!prevBtn || !nextBtn) return;

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === materiList.length - 1;
}

// =========================
// IMAGE PARALLAX EFFECT
// =========================

window.addEventListener("scroll", () => {

  const image = document.getElementById("materi-gambar");

  if (!image) return;

  const offset = window.pageYOffset;

  image.style.transform = `translateY(${offset * 0.05}px)`;
});

// =========================
// LOAD FIRST
// =========================

loadMateri(currentIndex);