document.addEventListener('DOMContentLoaded', () => {

  // Footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // scroll
  document.getElementById('startBtn').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#features').scrollIntoView({ behavior: 'smooth' });
  });

  // motivation
  DailyQuote();

  // Render Tips
  renderTips();

  // BMI
  document.getElementById('calcBmiBtn').addEventListener('click', calculateBMI);

  // generate
  document.getElementById('genScheduleBtn').addEventListener('click', generateSchedule);

  // contact
  document.getElementById('contactForm').addEventListener('submit', handleContactSubmit);

  // animation
  initFadeUpObserver();
});

// motivation
const quotes = [
  "Setiap langkah kecil adalah kemenangan — mulai dari hari ini.",
  "Kesehatan bukan tujuan, tapi cara hidup.",
  "Tidur cukup, makan seimbang, bergerak setiap hari.",
  "Konsistensi > Intensitas. Mulai sedikit, lakukan sering.",
  "Kepercayaan diri tumbuh dari kebiasaan sehat.",
  "Jangan tunggu sempurna — mulailah dari kecil."
];

function DailyQuote() {
  const el = document.getElementById('motivation');
  const idx = Math.floor(Math.random() * quotes.length);
  el.textContent = `"${quotes[idx]}"`;
}
// tips
const section = document.getElementById("features");
const tipsData = [
  { title: "Pola makan seimbang", text: "Konsumsi makanan bergizi yang mengandung karbohidrat, protein, lemak sehat, vitamin, mineral, dan serat." },
  { title: "Minum Air Cukup", text: "Target 6-8 gelas/hari. Bawa botol minum ke sekolah." },
  { title: "Olahraga Ringan", text: "Stretching + jalan cepat atau HIIT singkat 11-15 menit." },
  { title: "Tidur Teratur", text: "Usahakan 7-9 jam; Biasakan relaksasi sebelum tidur." },
  { title: "Jaga Kesehatan Mental", text: "Luangkan waktu untuk diri sendiri dan kelola stres dengan baik." }
];

function renderTips() {
  const container = document.getElementById('tipsList');
  container.innerHTML = '';
  tipsData.forEach(t => {
    const card = document.createElement('div');
    card.className = 'card mb-2';
    card.innerHTML = `
      <div class="card-body p-2">
        <h6 class="card-title mb-1">${t.title}</h6>
        <p class="card-text small text-muted mb-0">${t.text}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

// BMI calculator
let selectedType = null;

function calculateBMI() {
  const weightEl = document.getElementById('weight');
  const heightEl = document.getElementById('height');
  const resultEl = document.getElementById('bmiResult');

  const weight = parseFloat(weightEl.value);
  const heightCm = parseFloat(heightEl.value);

  if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
    resultEl.className = 'alert alert-danger';
    resultEl.textContent = 'Masukkan berat dan tinggi yang valid.';
    resultEl.classList.remove('d-none');
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);
  const bmiRounded = Math.round(bmi * 10) / 10;

  let category = '', advice = '', cls = '';
  if (bmi < 18.5) {
    category = 'Underweight (Kurus)'; advice = 'Tingkatkan asupan nutrisi,konsultasi ahli gizi & terapkan jadwal yang kami berikan';
    cls = 'warning'; selectedType = "under";
  } else if (bmi < 25) {
    category = 'Normal (Sehat)'; advice = 'Pertahankan gaya hidup sehat & terapkan jadwal yang kami berikan';
    cls = 'success'; selectedType = "normal";
  } else if (bmi < 30) {
    category = 'Overweight (Kelebihan berat badan)'; advice = 'Jaga pola makan,perbanyak olahraga & terapkan jadwal yang kami berikan';
    cls = 'warning'; selectedType = "over";
  } else {
    category = 'Obese (Obesitas)'; advice = 'untuk sementara terapkan jadwal yang kami berikan & Segera konsultasi dengan tenaga medis untuk penanganan lebih lanjut';
    cls = 'danger'; selectedType = "obese";
  }

  resultEl.className = `alert alert-${cls}`;
  resultEl.innerHTML = `BMI ${bmiRounded} — ${category}<br><small>${advice}</small>`;
  resultEl.classList.remove('d-none');

  // auto category
  document.getElementById("autoCategory").value = selectedType;

  function updateNeedle(bmi) {
  const needle = document.getElementById('bmiNeedle');
  const valueDisplay = document.getElementById('bmiValueDisplay');

  if (!needle) return;

  const minBMI = 10;
  const maxBMI = 40;

  const minAngle = -90;
  const maxAngle = 90;

  const clampedBMI = Math.min(Math.max(bmi, minBMI), maxBMI);

  const angle = ((clampedBMI - minBMI) / (maxBMI - minBMI)) * 
                (maxAngle - minAngle) + minAngle;

  needle.style.transform = `rotate(${angle}deg)`;
  valueDisplay.textContent = `BMI ${bmi.toFixed(1)}`;
}
  updateNeedle(bmi);
}


// generate
//underweight
const morning_under1 = [
  "Mengonsumsi sarapan tinggi kalori seperti roti gandum dengan selai kacang.",
  "Melakukan peregangan ringan selama 5-10 menit.",
  "Meminum susu full cream atau yogurt sebagai tambahan energi."
];
const afternoon_under1 = [
  "Makan siang tinggi protein seperti ayam panggang, ikan, atau telur dengan sayuran.",
  "Mengonsumsi camilan bergizi seperti roti,dan buah.",
  "Berjalan santai selama 10 menit setelah makan."
];
const post_afternoon_under1 = [
  "Camilan tinggi kalori sehat: alpukat + roti gandum",
  "Minum milkshake pisang + susu full cream",
  "Istirahat 10 menit lalu stretching ringan"
];
const evening_under1 = [
  "Melakukan latihan kekuatan selama 15-20 menit (push-up, squat, atau latihan beban ringan).",
  "Mengonsumsi makan dari sumber karbohidrat, protein, dan sayuran.",
  "Meminum susu hangat sebelum tidur untuk menambah asupan kalori."
];
const morning_under2 = [
  "Minum smoothie tinggi kalori (pisang + madu + susu + kacang almond).",
  "Jalan santai sambil berjemur 5-10 menit.",
  "Sarapan omelet keju atau roti isi telur."
];
const afternoon_under2 = [
  "Makan nasi dengan daging sapi/ayam dan avocado sebagai tambahan lemak sehat.",
  "Camilan seperti pisang goreng rumahan atau roti keju.",
  "Duduk rileks 10 menit setelah makan sambil minum air hangat."
];
const post_afternoon_under2 = [
  "Granola bar + yogurt full cream",
  "Smoothie kacang almond + madu",
  "Jalan santai 10-15 menit"
];
const evening_under2 = [
  "Latihan resistance band 15 menit.",
  "Makan malam berupa pasta dengan saus krim dan sayur.",
  "Minum susu cokelat atau yogurt kental sebelum tidur."
];
const morning_under3 = [
  "Sarapan bubur kacang hijau dengan santan.",
  "Minum madu hangat untuk energi tambahan.",
  "Melakukan peregangan punggung dan bahu selama 5 menit."
];
const afternoon_under3 = [
  "Makan siang nasi dengan daging sapi dan tumis sayuran.",
  "Camilan seperti sandwich isi keju dan telur.",
  "Duduk rileks sambil minum jus alpukat."
];
const post_afternoon_under3 = [
  "Roti selai kacang porsi sedang",
  "Segelas jus mangga tanpa gula",
  "Relaksasi nafas 5 menit"
];
const evening_under3 = [
  "Latihan beban sederhana menggunakan botol air selama 15 menit.",
  "Makan malam kentang panggang dengan ayam dan sayur.",
  "Minum milkshake pisang sebelum tidur."
];
const morning_under4 = [
  "Sarapan roti panggang dengan mentega dan selai buah.",
  "Minum segelas susu cokelat hangat.",
  "Jalan santai 5-8 menit di teras atau halaman."
];
const afternoon_under4 = [
  "Makan siang pasta creamy dengan ayam dan keju.",
  "Camilan roti manis atau pancake mini.",
  "Minum jus mangga atau smoothies tinggi kalori."
];
const post_afternoon_under4 = [
  "Buah kering + kacang almond",
  "Minum susu coklat hangat",
  "Gerakan mobilitas tubuh ringan"
];
const evening_under4 = [
  "Latihan core ringan seperti plank dan glute bridge selama 10 menit.",
  "Makan malam nasi dengan ikan grill dan brokoli.",
  "Minum susu vanilla atau yogurt kental sebelum tidur."
];
const morning_under5 = [
  "Sarapan nasi goreng rumahan dengan telur.",
  "Minum vitamin penambah nafsu makan (jika diperlukan).",
  "Peregangan seluruh tubuh selama 5 menit."
];
const afternoon_under5 = [
  "Makan siang burger rumahan dengan sayuran.",
  "Camilan pisang + selai kacang.",
  "Minum teh manis hangat sambil duduk santai."
];
const post_afternoon_under5 = [
  "Kentang panggang kecil + keju",
  "Smoothie alpukat + susu tinggi kalori",
  "Stretching punggung 5 menit"
];
const evening_under5 = [
  "Latihan ringan naik turun tangga 5-7 menit.",
  "Makan malam sup cream ayam dengan roti.",
  "Minum susu fermentasi sebelum tidur."
];
//normal
const morning_normal1 = [
  "Sarapan seimbang seperti telur dan roti gandum.",
  "Berjalan pagi selama 10-15 menit.",
  "Meminum segelas air putih setelah bangun tidur."
];
const afternoon_normal1 = [
  "Melakukan peregangan ringan setiap satu jam selama 5-10 menit.",
  "Mengonsumsi makan siang seimbang dengan karbohidrat, protein, dan sayuran.",
  "Mengambil camilan sehat seperti buah segar atau kacang."
];
const post_afternoon_normal1 = [
  "Buah segar seperti apel atau pir",
  "Minum air putih 1 gelas",
  "Jalan sore 20 menit"
];
const evening_normal1 = [
  "Berolahraga selama 20-30 menit seperti jogging atau latihan tubuh.",
  "Mengonsumsi makan malam yang ringan dengan sumber protein.",
  "Mengurangi penggunaan gawai 30 menit sebelum tidur."
];
const morning_normal2 = [
  "Minum air lemon dingin lalu sarapan buah + yogurt.",
  "Lakukan 5 menit latihan pernapasan atau meditasi ringan.",
  "Sepeda santai 10 menit."
];
const afternoon_normal2 = [
  "Makan nasi merah, lauk ikan panggang, dan salad kecil.",
  "Camilan kacang panggang atau roti gandum.",
  "Berdiri dan stretching 2-3 menit setiap 1 jam."
];
const post_afternoon_normal2 = [
  "Snack sehat: kacang panggang sedikit",
  "Minum teh herbal tanpa gula",
  "Gerakan peregangan 10 menit"
];
const evening_normal2 = [
  "Yoga 20-25 menit atau latihan mobilitas.",
  "Makan malam sup ayam sayur atau wrap gandum isi sayur dan ayam.",
  "Minum teh herbal tanpa gula sebelum tidur."
];
const morning_normal3 = [
  "Sarapan smoothie bowl dengan granola.",
  "Lakukan stretching kaki 5 menit.",
  "Jalan ringan di sekitar rumah 10 menit."
];
const afternoon_normal3 = [
  "Makan siang nasi merah dengan ikan dan tumis sayur.",
  "Camilan buah campur.",
  "Melakukan peregangan leher dan bahu setiap 1 jam."
];
const post_afternoon_normal3 = [
  "Yogurt + potongan buah kecil",
  "Minum air putih",
  "Latihan ringan: squat atau plank 5 menit"
];
const evening_normal3 = [
  "Latihan HIIT ringan selama 15 menit.",
  "Makan malam wrap gandum isi ayam.",
  "Minum air hangat sambil relaksasi pernapasan."
];
const morning_normal4 = [
  "Sarapan oats dengan madu dan buah.",
  "Meditasi 3 menit untuk fokus.",
  "Berjalan keliling komplek 12 menit."
];
const afternoon_normal4 = [
  "Makan siang ayam panggang dengan sayur kukus.",
  "Camilan yogurt plain.",
  "Melakukan jalan kecil di dalam rumah selama 5 menit."
];
const post_afternoon_normal4 = [
  "Biskuit gandum 2 keping",
  "Minum infused water",
  "Jalan santai 15 menit"
];
const evening_normal4 = [
  "Yoga fleksibilitas 20 menit.",
  "Makan malam sup bening + tempe panggang.",
  "Teh herbal hangat sebelum tidur."
];
const morning_normal5 = [
  "Minum air hangat lalu sarapan roti gandum isi telur.",
  "Senam ringan 5-7 menit.",
  "Duduk di luar untuk mendapatkan cahaya matahari pagi."
];
const afternoon_normal5 = [
  "Makan siang nasi + ayam teriyaki rendah minyak.",
  "Camilan kacang almond atau kacang mete.",
  "Stretching pinggang dan punggung 3-5 menit."
];
const post_afternoon_normal5 = [
  "Buah pisang 1 + segelas air",
  "Napas perut 3 menit",
  "Peregangan bahu dan leher"
];
const evening_normal5 = [
  "Jogging santai 15 menit.",
  "Makan malam salad dengan telur rebus.",
  "Membatasi cahaya gawai 20 menit sebelum tidur."
];
//overweight
const morning_over1 = [
  "Sarapan tinggi serat seperti buah dengan yogurt atau oatmeal.",
  "Meminum air hangat setelah bangun tidur.",
  "Berjalan kaki selama 10 menit."
];
const afternoon_over1 = [
  "Makan siang rendah minyak seperti ikan panggang, ayam kukus, atau salad dengan protein.",
  "Mengonsumsi camilan buah dalam porsi kecil.",
  "Berjalan kaki selama 10–15 menit setelah makan."
];
const post_afternoon_over1 = [
  "Snack rendah kalori: buah melon",
  "Minum teh hijau tanpa gula",
  "Jalan cepat 15 menit"
];
const evening_over1 = [
  "Berolahraga ringan 20-30 menit seperti bersepeda atau jalan cepat.",
  "Makan malam rendah kalori dengan protein.",
  "Meminum segelas air putih sebelum tidur."
];
const morning_over2 = [
  "Minum air putih 2 gelas setelah bangun.",
  "Sarapan roti gandum isi sayur + telur rebus.",
  "Jalan cepat 10-12 menit."
];
const afternoon_over2 = [
  "Makan nasi merah sedikit + ayam rebus/panggang + tumis sayuran ringan.",
  "Camilan buah potong dalam porsi kecil.",
  "Naik turun tangga 2-3 menit (jika memungkinkan)."
];
const post_afternoon_over2 = [
  "Kacang porsi kecil (10-12 biji)",
  "Air putih 1 gelas",
  "Senam ringan 5-7 menit"
];
const evening_over2 = [
  "Latihan aerobik ringan seperti senam low-impact 20 menit.",
  "Makan malam sayur kukus + tahu/tempe.",
  "Minum air hangat sambil melakukan stretching 5 menit."
];
const morning_over3 = [
  "Sarapan roti gandum dengan sayur dan telur.",
  "Minum air 2 gelas setelah bangun.",
  "Jalan cepat 8-10 menit."
];
const afternoon_over3 = [
  "Makan siang sup sayur + fillet ayam panggang.",
  "Camilan buah pir atau jeruk.",
  "Jalan santai 5 menit di dalam rumah."
];
const post_afternoon_over3 = [
  "Salad mini: selada + tomat",
  "Minum lemon water",
  "Stretching 10 menit"
];
const evening_over3 = [
  "Latihan cardio low-impact 15-20 menit.",
  "Makan malam sayur kukus dengan tahu.",
  "Minum air hangat sebelum tidur."
];
const morning_over4 = [
  "Sarapan oatmeal dengan potongan apel.",
  "Stretching 7 menit.",
  "Berjemur sambil berjalan santai."
];
const afternoon_over4 = [
  "Makan siang nasi merah sedikit + ikan kukus.",
  "Camilan pepaya atau melon.",
  "Melakukan 10 squat ringan."
];
const post_afternoon_over4 = [
  "1 buah apel ukuran kecil",
  "Minum air hangat",
  "Latihan ringan: step-up 5 menit"
];
const evening_over4 = [
  "Berjalan cepat 15 menit.",
  "Makan malam sup jamur atau sayuran.",
  "Peregangan punggung 5 menit."
];
const morning_over5 = [
  "Sarapan buah-buahan segar + yogurt rendah lemak.",
  "Minum air hangat 1 gelas.",
  "Latihan pernapasan + gerakan tangan ringan 5 menit."
];
const afternoon_over5 = [
  "Makan siang salad besar dengan dada ayam.",
  "Camilan kacang panggang tanpa garam.",
  "Berjalan mondar-mandir 5-7 menit."
];
const post_afternoon_over5 = [
  "Roti gandum 1 lembar",
  "Teh chamomile tanpa gula",
  "Gerakan mobilitas tubuh 5-7 menit"
];
const evening_over5 = [
  "Cardio statis seperti marching di tempat 20 menit.",
  "Makan malam tumis sayur rendah minyak.",
  "Minum teh chamomile tanpa gula."
];
//obese
const morning_obese1 = [
  "Meminum air lemon hangat lalu sarapan rendah kalori seperti oatmeal atau buah.",
  "Melakukan peregangan selama 10 menit.",
  "Berjalan cepat selama 10 menit."
];
const afternoon_obese1 = [
  "Makan siang tinggi protein rendah lemak seperti tofu,atau ikan kukus.",
  "Mengonsumsi buah potong sebagai camilan sehat.",
  "Berjalan minimal 15 menit setelah makan."
];
const post_afternoon_obese1 = [
  "Buah rendah kalori seperti pepaya",
  "Minum air putih 1-2 gelas",
  "Jalan cepat 20 menit"
];
const evening_obese1 = [
  "Berjalan cepat selama 20-30 menit atau melakukan latihan kardio ringan.",
  "Makan malam rendah kalori seperti sup sayur atau salad.",
  "Melakukan meditasi atau latihan pernapasan sebelum tidur."
];
const morning_obese2 = [
  "Minum air hangat 2 gelas, kemudian sarapan smoothie sayur-buah (low calorie).",
  "Lakukan peregangan tubuh 8-10 menit.",
  "Jalan di tempat 5 menit untuk pemanasan."
];
const afternoon_obese2 = [
  "Makan sup bening berisi sayur + dada ayam rebus/panggang.",
  "Camilan jelly tanpa gula atau buah rendah kalori (melon, pepaya).",
  "Jalan santai 10-12 menit di sekitar rumah setelah makan."
];
const post_afternoon_obese2 = [
  "Snack sehat: sayuran kukus kecil",
  "Teh hijau tanpa gula",
  "Peregangan kaki dan punggung 10 menit"
];
const evening_obese2 = [
  "Latihan low-impact seperti marching in place atau langkah kecil 20-25 menit.",
  "Makan malam salad dengan dressing ringan atau sup sayur.",
  "atihan relaksasi: deep breathing 5 menit sebelum tidur."
];
const morning_obese3 = [
  "Sarapan smoothie hijau rendah kalori (bayam, apel, air).",
  "Peregangan tubuh 10 menit.",
  "Jalan sangat santai 5-7 menit."
];
const afternoon_obese3 = [
  "Makan siang sup ayam tanpa kulit + sayuran.",
  "Camilan satu potong buah rendah kalori.",
  "Naik turun satu anak tangga perlahan 2 menit."
];
const post_afternoon_obese3 = [
  "Smoothie sayur tanpa gula (bayam + timun)",
  "Air lemon hangat",
  "Latihan ringan: marching 7-10 menit"
];
const evening_obese3 = [
  "Latihan low-impact sambil duduk 15 menit.",
  "Makan malam salad hijau dengan lemon.",
  "Meditasi pernapasan 5 menit."
];
const morning_obese4 = [
  "Sarapan roti gandum dengan tomat dan telur rebus.",
  "Minum air 2 gelas setelah bangun.",
  "Latihan mobilitas sendi 8 menit."
];
const afternoon_obese4 = [
  "Makan siang ikan kukus + sayur rebus.",
  "Camilan melon atau semangka.",
  "Berjalan di dalam rumah 7-10 menit."
];
const post_afternoon_obese4 = [
  "1 buah jeruk",
  "Air putih",
  "Latihan duduk-berdiri 10 menit"
];
const evening_obese4 = [
  "Latihan kaki duduk (seated leg raise) 10 menit.",
  "Makan malam sup sayur hangat.",
  "Stretching ringan sebelum tidur."
];
const morning_obese5 = [
  "Sarapan oatmeal tanpa gula dengan sedikit kayu manis.",
  "Peregangan leher, bahu, dan pinggang 8 menit.",
  "Jalan sangat pelan 5 menit."
];
const afternoon_obese5 = [
  "Makan siang salad besar tanpa dressing minyak.",
  "Camilan apel atau kiwi.",
  "Latihan pernapasan 3 menit + jalan 5 menit."
];
const post_afternoon_obese5 = [
  "Salad kecil tanpa dressing manis",
  "Minum air 1 gelas",
  "Jalan santai 15-20 menit"
];
const evening_obese5 = [
  "Latihan gerak tangan low-impact sambil duduk 15 menit.",
  "Makan malam sup kacang merah rendah garam.",
  "Minum air hangat sambil relaksasi."
];

const schedules = {
  under: {
    morning: [morning_under1, morning_under2, morning_under3, morning_under4, morning_under5],
    afternoon: [afternoon_under1, afternoon_under2, afternoon_under3, afternoon_under4, afternoon_under5],
    post_afternoon: [post_afternoon_under1, post_afternoon_under2, post_afternoon_under3, post_afternoon_under4, post_afternoon_under5],
    evening: [evening_under1, evening_under2, evening_under3, evening_under4, evening_under5]
  },
  normal: {
    morning: [morning_normal1, morning_normal2, morning_normal3, morning_normal4, morning_normal5],
    afternoon: [afternoon_normal1, afternoon_normal2, afternoon_normal3, afternoon_normal4, afternoon_normal5],
    post_afternoon: [post_afternoon_normal1, post_afternoon_normal2, post_afternoon_normal3, post_afternoon_normal4, post_afternoon_normal5],
    evening: [evening_normal1, evening_normal2, evening_normal3, evening_normal4, evening_normal5]
  },
  over: {
    morning: [morning_over1, morning_over2, morning_over3, morning_over4, morning_over5],
    afternoon: [afternoon_over1, afternoon_over2, afternoon_over3, afternoon_over4, afternoon_over5],
    post_afternoon: [post_afternoon_over1, post_afternoon_over2, post_afternoon_over3, post_afternoon_over4, post_afternoon_over5],
    evening: [evening_over1, evening_over2, evening_over3, evening_over4, evening_over5]
  },
  obese: {
    morning: [morning_obese1, morning_obese2, morning_obese3, morning_obese4, morning_obese5],
    afternoon: [afternoon_obese1, afternoon_obese2, afternoon_obese3, afternoon_obese4, afternoon_obese5],
    post_afternoon: [post_afternoon_obese1, post_afternoon_obese2, post_afternoon_obese3, post_afternoon_obese4, post_afternoon_obese5],
    evening: [evening_obese1, evening_obese2, evening_obese3, evening_obese4, evening_obese5]
  }
};

function randFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateSchedule() {
  const list = document.getElementById("scheduleList");
  list.innerHTML = "";

  if (!selectedType) {
    alert("Hitung BMI dulu!");
    return;
  }

  let morning, afternoon, post_afternoon, evening;

// random index 0–4
const rand = Math.floor(Math.random() * 5);

if (schedules[selectedType]) {
  morning = schedules[selectedType].morning[rand];
  afternoon = schedules[selectedType].afternoon[rand];
  post_afternoon = schedules[selectedType].post_afternoon[rand];
  evening = schedules[selectedType].evening[rand];
}

  const items = [
    { time: "Pagi", act: randFrom(morning) },
    { time: "Siang", act: randFrom(afternoon) },
    { time: "Sore", act: randFrom(post_afternoon) },
    { time: "Malam", act: randFrom(evening) },
  ];

  items.forEach(it => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-start";
    li.innerHTML = `
      <div>
        <strong>${it.time}</strong>
        <div class="small text-muted">${it.act}</div>
      </div>
      <span class="badge bg-success rounded-pill">OK</span>
    `;
    list.appendChild(li);
  });
}

// contact
function handleContactSubmit(e) {
  e.preventDefault();
  const waLink = "https://wa.me/6281235523401?text=Halo%20Admin%20HoldByHealthy%20saya%20ingin%20bertanya%20tentang%20HoldByHealthy";
  window.open(waLink, "_blank");
  waLink = "https://wa.me/6285784014188?text=Halo%20Admin%20HoldByHealthy%20saya%20ingin%20bertanya%20tentang%20HoldByHealthy";
  window.open(waLink, "_blank");
}


// animation
function initFadeUpObserver() {
  const els = document.querySelectorAll('.fade-up');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => obs.observe(el));
}
