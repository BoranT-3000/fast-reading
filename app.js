/***** Yardımcı kısayol *****/
const $ = s => document.querySelector(s);

/***** DOM referansları *****/
const customTgl  = $('#customTextToggle');
const customArea = $('#customTextArea');
const shuffleTgl = $('#shuffleToggle');
const soundTgl   = $('#soundToggle');
const focusTgl   = $('#focusToggle'); // YENİ: Odak anahtarı referansı

const wpmSl=$('#wpmSlider'), numSl=$('#numWordsSlider'), fsSl=$('#fontSizeSlider');
const wpmVal=$('#wpmValue'),  numVal=$('#numWordsValue'),   fsVal=$('#fontSizeValue');

const playBtn=$('#playPauseBtn'), resetBtn=$('#resetBtn'), display=$('#display');
const progressBar=$('#progressBar');

const fileInput=$('#fileInput'), partSelect=$('#partSelect');
const libSelect=$('#librarySelect');

const urlInput=$('#urlInput'),  fetchBtn=$('#fetchBtn');
const themeTgl=$('#themeToggle');

const fullBtn=$('#fullBtn'), exitFullBtn=$('#exitFullBtn');


// ========================================================================
// KATEGORİLİ VE ZENGİNLEŞTİRİLMİŞ METİN KÜTÜPHANESİ
// ========================================================================
const localLibrary = [
  {
    category: "Başlangıç Metinleri",
    texts: [
      { 
        title: "Gün Başlarken", 
        content: `Gün doğarken şehir uyanıyor.\nSessiz sokaklarda ilk adımlar yankılanıyor.\nYeni bir günün heyecanı, taze kahve kokusuna karışıyor.` 
      },
      { 
        title: "Okumanın Gücü", 
        content: `Okumak, zihnin en güçlü egzersizidir.\nHer kelime yeni bir kapı, her cümle başka bir evrendir.\n\nDüzenli pratik, göz kaslarını güçlendirir.\nHızlı okuma ile odak ve algı aynı anda gelişir.`
      }
    ]
  },
  {
    category: "Teknoloji",
    texts: [
      {
        title: "Yapay Zeka",
        content: `Yapay zeka, makinelerin insan benzeri yetenekler sergilemesini sağlayan bir teknolojidir. Öğrenme, problem çözme ve karar verme gibi süreçleri taklit eder. Günümüzde sağlık, finans ve ulaşım gibi birçok alanda devrim yaratmaktadır.`
      },
      {
        title: "Blokzincir",
        content: `Blokzincir, şifrelenmiş işlem takibini sağlayan dağıtık bir veri tabanı sistemidir. Bu teknoloji, özellikle kripto paralarla tanınsa da tedarik zinciri, oy verme sistemleri ve noter hizmetleri gibi alanlarda da güven ve şeffaflık sunar.`
      }
    ]
  },
  {
    category: "Bilim",
    texts: [
      {
        title: "Evrenin Genişlemesi",
        content: `Evren sürekli olarak genişlemektedir. Gökadalar, aralarındaki uzayın genişlemesi nedeniyle birbirlerinden uzaklaşır. Bu olgu, Büyük Patlama teorisinin en güçlü kanıtlarından biridir ve modern kozmolojinin temel taşını oluşturur.`
      }
    ]
  }
];


/***** Global durum *****/
let words=[], idx=0, interval=null, paused=true;

/***** Başlangıç font *****/
display.style.fontSize = `${fsSl.value}rem`;

/***** Sliderlar *****/
[wpmSl,numSl,fsSl].forEach(sl=>{
  sl.oninput=()=>{
    wpmVal.textContent=wpmSl.value;
    numVal.textContent=numSl.value;
    fsVal.textContent =fsSl.value;
    display.style.fontSize=`${fsSl.value}rem`;
  };
});

/***** Tema toggle *****/
if(localStorage.theme==='dark'){document.body.classList.add('dark'); themeTgl.checked=true;}
themeTgl.onchange=()=>{
  document.body.classList.toggle('dark', themeTgl.checked);
  localStorage.theme = themeTgl.checked ? 'dark' : 'light';
};

/***** BÜYÜT / KÜÇÜLT düğmeleri *****/
fullBtn.onclick = ()=>{
  display.classList.add('enlarged');
  fullBtn.classList.add('d-none');
  exitFullBtn.classList.remove('d-none');
  display.scrollIntoView({behavior:'smooth'});
};
exitFullBtn.onclick = ()=>{
  display.classList.remove('enlarged');
  exitFullBtn.classList.add('d-none');
  fullBtn.classList.remove('d-none');
};

/***** Toggle görünüm *****/
customTgl.onchange = () => customArea.style.display = customTgl.checked ? 'block' : 'none';
partSelect.onchange = () => reset();

/***** Başlat / duraklat / reset *****/
playBtn.onclick = () => paused ? start() : pause();
resetBtn.onclick = reset;

/***** Dosya yükleme *****/
fileInput.onchange = e=>{
  const f = e.target.files[0]; if(!f) return;
  const r = new FileReader();
  r.onload = ev => {
    loadParts(ev.target.result);
    libSelect.value = '';
    customTgl.checked = false; customArea.style.display = 'none';
    reset();
  };
  r.readAsText(f,'utf-8');
};


/***** KATEGORİLİ METİNLERİ YÜKLEYEN FONKSİYON *****/
(function loadLibrary(){
  populateLibrary(localLibrary);
})();

function populateLibrary(library){
  library.forEach(category => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = category.category;
    
    category.texts.forEach(text => {
      const option = document.createElement('option');
      option.value = text.title; 
      option.textContent = text.title;
      optgroup.appendChild(option);
    });
    
    libSelect.appendChild(optgroup);
  });
}


/***** DROPDOWN DEĞİŞTİĞİNDE KATEGORİDEN METİN BULAN FONKSİYON *****/
libSelect.onchange = ()=>{
  const selectedTitle = libSelect.value;
  if(!selectedTitle) return;
  
  let selectedText = null;
  for (const category of localLibrary) {
    const found = category.texts.find(text => text.title === selectedTitle);
    if (found) {
      selectedText = found;
      break;
    }
  }
  
  if (selectedText) {
    loadParts(selectedText.content);
    fileInput.value = '';
    customTgl.checked=false; customArea.style.display='none';
    reset();
  }
};


/***** URL’den <p>’leri çek *****/
fetchBtn.onclick = async ()=>{
  const url = urlInput.value.trim(); if(!url) return;
  try{
    const text = await fetchParagraphs(url);
    if(!text){ alert('Paragraf bulunamadı'); return; }
    customTgl.checked = true; customArea.style.display='block';
    customArea.value = text; customArea.scrollIntoView({behavior:'smooth'});
  }catch(e){ alert('İçerik alınamadı (CORS/proxy)'); console.error(e); }
};

async function fetchParagraphs(url){
  const prox = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  const html = await fetch(prox).then(r=>r.text());
  const doc  = new DOMParser().parseFromString(html, 'text/html');
  return Array.from(doc.querySelectorAll('p'))
              .map(p=>p.textContent.trim())
              .filter(t=>t.length>25)
              .join('\n\n');
}

/***** Part’lara böl *****/
function loadParts(raw){
  const parts = raw.split(/\n\s*\n/);
  partSelect.innerHTML='';
  parts.forEach((p,i)=>{
    const o=document.createElement('option');
    o.textContent = `Part ${i+1}`;
    o.dataset.text = p.trim();
    partSelect.appendChild(o);
  });
  partSelect.classList.remove('d-none');
}

/***** Okuma motoru *****/
function prepare(){
  let txt="";
  if(customTgl.checked) txt = customArea.value.trim();
  else if (partSelect.selectedOptions.length > 0) {
    txt = partSelect.selectedOptions[0]?.dataset.text || "";
  }
  if(!txt) return;
  words = shuffle(txt.split(/\s+/).filter(w => w.length > 0));
  idx = 0;
  updateProgress();
}

function start(){
  if(!words.length) prepare();
  if(!words.length) return alert('Okunacak metin yok!');
  
  paused=false; 
  playBtn.textContent='Duraklat';
  document.body.classList.add('is-reading'); // 'reading' yerine 'is-reading' kullan
  updateFocusState(); // YENİ: Odak durumunu güncelle
  
  tick();
  const ms = 60000 * +numSl.value / +wpmSl.value;
  interval = setInterval(tick, ms);
}

function pause(){ 
  paused=true; 
  playBtn.textContent='Devam'; 
  clearInterval(interval); 
  speechSynthesis.cancel();
  document.body.classList.remove('is-reading');
  updateFocusState(); // YENİ: Odak durumunu güncelle
}

function reset(){ 
  pause(); 
  idx=0; 
  words=[]; 
  display.innerHTML='';
  playBtn.textContent='Başlat'; 
  updateProgress();
}

function tick(){
  if(idx>=words.length){ 
    reset(); 
    return; 
  }
  const grp = words.slice(idx, idx + +numSl.value).join(' ');
  
  // ODAK ANAHTARI KONTROLÜ
  if (focusTgl.checked) {
    const midpoint = Math.floor(grp.length / 2);
    let focusHTML = '';
    if (grp.length > 0) {
      focusHTML = `${grp.substring(0, midpoint)}<span class="focus-letter">${grp[midpoint]}</span>${grp.substring(midpoint + 1)}`;
    }
    display.innerHTML = focusHTML;
  } else {
    display.textContent = grp; // Odak kapalıysa düz metin göster
  }
  
  if(soundTgl.checked && +wpmSl.value<=300){
    const u = new SpeechSynthesisUtterance(grp); u.lang='tr-TR';
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  }
  
  idx += +numSl.value;
  updateProgress();
}

function shuffle(a){
  if(!shuffleTgl.checked) return a;
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

/***** İLERLEME ÇUBUĞUNU GÜNCELLEYEN FONKSİYON *****/
function updateProgress() {
  const percentage = words.length > 0 ? (idx / words.length) * 100 : 0;
  progressBar.style.width = `${Math.min(percentage, 100)}%`;
  progressBar.setAttribute('aria-valuenow', percentage);
}

// ========================================================================
// YENİ: ODAK ÇİZGİSİNİ GÖSTER/GİZLE
// ========================================================================
focusTgl.onchange = updateFocusState; // Anahtar değiştiğinde fonksiyonu çağır

function updateFocusState() {
  const isReading = document.body.classList.contains('is-reading');
  // Odak çizgisi sadece 'Okuma Odağı' açıksa VE okuma aktifse gösterilir.
  document.body.classList.toggle('reading', focusTgl.checked && isReading);
}


/***** Bootstrap Tooltip'leri Başlat *****/
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));