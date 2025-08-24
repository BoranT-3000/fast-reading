/***** Yardımcı kısayol *****/
const $ = s => document.querySelector(s);

/***** DOM referansları *****/
const customTgl  = $('#customTextToggle');
const customArea = $('#customTextArea');
const shuffleTgl = $('#shuffleToggle');
const soundTgl   = $('#soundToggle');
const focusTgl   = $('#focusToggle');

const wpmSl=$('#wpmSlider'), numSl=$('#numWordsSlider'), fsSl=$('#fontSizeSlider');
const wpmVal=$('#wpmValue'),  numVal=$('#numWordsValue'),   fsVal=$('#fontSizeValue');

const playBtn=$('#playPauseBtn'), resetBtn=$('#resetBtn'), display=$('#display');
const progressBar=$('#progressBar');

const fileInput=$('#fileInput'), partSelect=$('#partSelect');
const libSelect=$('#librarySelect');

const urlInput=$('#urlInput'),  fetchBtn=$('#fetchBtn');
const themeTgl=$('#themeToggle');
const voiceGender = $('#voiceGender');

const fullBtn=$('#fullBtn'), exitFullBtn=$('#exitFullBtn');
const displayWrapper = $('#display-wrapper');

/***** Wakelock (mobil/tablet için ekranı açık tutma, destek varsa) *****/
let wakeLock = null;
async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator) {
      wakeLock = await navigator.wakeLock.request('screen');
    }
  } catch (e) { /* sessiz geç */ }
}
async function releaseWakeLock() { try { await wakeLock?.release(); } catch(e){} }


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
  },
  {
    "category": "Çalışma Seti",
    "texts": [
      {
        "title": "Part 1",
        "content": "aç     ad          af          ağ          ah          ak          al          alt         an        ant     ar          ark          art     arz   as     ast   aş  at        av          ay          az bağ        bak   bal   ban    bar   bas   baş    bat   bay   baz    bej    bek    bel    ben    beş    bet  beybez    bık    bil    bin    bir  bit   biz   boğ      bol    bom     bor    boş    bot  boy   boz       böl\nbön    bul   bun   but   buz    bük      büz     caz  cem    cep    cet   cız   cilt   cip    cips    cop    coş    cuk     cüz çak   çağ    çal    çam   çan   çap    çar    çat    çay   çek    çel   çık    çiğ   çil    çim  Çin    çip    \nçir   çit   çiz   çok   çök   çöl   çöp   çöz    çul    dağ   dal   dam  dar   def    del    dem   dış   dik   dil   din   dip    diş    diz    doğ   dol   don  \ndoy    doz    dök   döl   döş   döv    dul  duş    dut     duy   dün    düş    düz   ek   el   em   en   er   es   eş   et    ev   ez   fak   fal   fan  far   fay  faz   fen   fer    fes    fil   fiş   fit\nfok   fol   fon   fos   föy  gaf   gam   gar   gaz   geç   gel   gem    gen    ger   gez   gir   git   giz   gol    göç   gök   göl   göm\ngör   göz    güç    gül   gün   gür    güz    hak   hal   ham   han   hap   har   has   hat    hav    haz    her    hır    hız    hiç   hol    hor    hoş    hun    iç    iğ   il   ilk   im    in   ip   is    iş    it    iz    jel  jet   jön  kaç     kal    kan    kar    kas    kaş    kat    kay    kaz    kel   kes    ket    kez    kıl    kır    kış    kıt    kız\nkil  kin    kir   koç   kol  kon   kop   kor    koş    kot   koy   koz   kök    kör   köy   köz   kul   kum \nkur   kuş    küf   kül    kür    küs    laf   lal   lam    lav    laz    leş    lop    loş    maç    mal    mat   meç   men   mey   mil     mum     muş    muz    nal    nam     nar    naz     nem      net     ney     not    nur    of    ok    ol    on    org    ot     oy    öç    öd    öl    ölç    ön   öp    ör    örs    örf   ört     öt   öv    öz     pak    pas    pat    pay    pek     pes    pet    pik    pil    pim   pir    pis    piş    pot    poz    puf   pul   pus   put   pür     rab     raf    ray    ret    rey   rol   rot   ruh    rum    rus     saç    saf    sağ    sal    sam     sap    sar     sat    sav    say     saz    seç    sel    sen    ser    set\nsev    sık   sır   sil    sim    sis    siz    son   sor   soy    sök    sön   söz    suç    sun    sur    sür   süs süt   süz    şah    şal    şan    şap    şef     şen    şer    şey     şık    şok     şut    taç   tak    tam    tan    tas    taş    tat    tav     tay    tef    tek    tel     ten   tep    ter    tez   tığ   tır\ntik   tim    tip   tok   ton    toy    top    toz    tuğ   tuş    tut    tuz   tül    tüm    tüp    tür   tüy    uç    \nun    ur    ut   uz    üç     ün   üs   üst    ürk    üz    var   ver   vinç   vur    yağ    yak    yal    yan   yap   yar    yaş    yas      yat    yay   yaz    yel   yem   yen   yer   yığ   yık   yıl   yok   yol   yoz    yük   yün    yüz    zam    zan   zar    zat    zıt     zil    zor\n\nBank   Bant   Berk   Boks   Borç   Broş   Burç   Büst   Celp   Cenk   Cins   Cilt   Çark   Çift   Dans   Darp   Denk   Ders   Dert   Dinç   Dost   Dört   Dürt   Fırt   Form   Fren   Fötr   Genç   Golf   Gonk   Gram   Grip   Grup   Gürz   Fark   Farz   Felç   Fert   Halk   Harç   Harf   Jant   Jest   Kalk   Kamp   Kalp   Kast   Kent   Kırk   Kırp   Kort   Köşk   Kreş   Krem   Kriz   Kulp   Kurs   Kurt   Kürt   Linç   Lüks   Marş   Mart   Mest   Misk   Mont   Neft   Park   Pist   Plak   Plaj   Plan   Post   Priz   Raks   Rant   Ring   Rast   Renk   Rest   Salt   Sark   Semt   Sert   Serp   Sırp   Sırt   Sürt   Şans   Şarj   Şart   Şevk   Şeyh   Şilt   Şort   Tank   Tart   Tarz   Tayt   Terk   Ters    Test    Tost   Tren    Turp   Türk   Vinç    Yırt   Yont   Yurt"
      },
      {
        "title": "Part 2",
        "content": "kısa abla acı akşam altın amaç anı anne araç aslan baba bahar balık bardak barış bayrak bayram bebek beyaz bıçak bıyık bilim bina bilim burun ciğer coşku çanta çare çatal çiçek çimento çocuk çimen düşman erkek evlat fare ferman fincan gece gölge gözlem gözlük gurur gümüş güneş halı hayat hece hedef hurda huzur hüzün inek işgal kadın kağıt kahve kalem kapı kasa kasap kaşık kazak kedi kitap komşu koyun köpek kral kural kurban kuzu mama mana masa melek mide Murat okul oyun öküz önem ördek pembe sabah saha sakal sakız sarma sevda sevgi sevinç sınıf sıra sihir sincap sinek siyah spor sürat tabak tahta tane tarak tasa trend turşu tütün uğur uyku vatan yemek yuva zeka akla ekle kalem elek kelek leke laklak lale akli ekli ilik kekik ilke lila keklik halan anne ekin inal enli ilan inan kanal inle lakin nalan nine kalan Kenan nail nane ninni alo kola konak kokla ona kilo koli koni elma komik liman Muğla mola eşek milli ekmek iklim Kamil Kemal kemik leman limon kamu koku kollu kanun kolluk konu kule kumlu malum mumluk ulu konuk kullan lokum oku oluk okluk ulak uzun umut Altan anten mutlu tatil kutu anlat olta nota toka taklit tonton kilit akü küme küllü kütle etüt kütük küllük lüle tümü türü tünek ümit nükte Tülin Tümen tünel tütmek Ünlü ülkü ülkem menü ayak ayna kamyon kaynak kolay koyun maymun yaka yanak yemek yutak ayla iyi kaykay kaymak leylek oyna uyku yamuk yatak yokluk yumak öte köle kötü köklü önlük öykü köken köpek erik iri karton korkak kuru ömür örtü tanker teker titrek türlü türkü arka emre karne erken kurak lira ortak örme tamir tarak tere terli tören ürkek yürek akıl alın anlat atık ılık kayık kıyma kıta yakın ırmak yıkık yırtma ayı katı kılık mantı tanık tartı tırtıl yarım yalın ada eda damak demir demlik delik dilek dirlik dolma dökme durak dürüm maden moda nadir damar damat dantel dede derman doku donuk dönük dudak düdük döner müdür ördek mide ıslak mısır sakal sakin Salı Sandal sandık sema simit soluk sökük istek maske sadık sokak salon sarı sanat sayı serin sinek soru sönük süre uslu baba balık bana bakla bamya banyo bardak beton berber bidon dahi Mehtap reha sahne şehir zahmet alev ayva civciv çivi davul duvar görev hayvan mavi ova pilav tavan vadi vali vatan veli vişne avcı ceviz çavuş çuval deve havuç kahve ödev savaş tavuk vagon vapur villa yavru bağlaç boğaz çağdaş çiğdem değnek doğa"
      },
      {
        "title": "Part 3",
        "content": "Ahtapot    Atatürk    Ankara     anlama     ağaçlar    akşamlar   benekli    basketbol  beklemek    boyama    bakanlık    beslemek   camiler    cemiyet    cennetlik    canlılık canlılar    cümleler   çeşitli    çiçekler    çıngırak    çaydanlık    çatışma    çekirdek   değişik düzenli    devamlı    dershane    duraklar    daima    elmacık    eskici    eklemler    estetik ekinler    ekmekler   farkında     fıstıkçı    fanatik    festival    fırında    felaket   güneşli gardırop    gökyüzü    gemici    gazete    güzellik   hastalık    hastane    hapşırmak    hikaye hayvanlar    hangisi   Istakoz    ıhlamur     ırkçılık     ılımlı     ıslatan    ılıman   ilkokul   ilkbahar   inançlı    imkansız     iletken     insancıl    Jandarma     jakuzi     jelatin     jiletli     jenerik   Kırmızı     kurtuluş     küçücük     kelime     kumbara      kurbağa    laleli     laleler leylekler     lezzetli     lakırtı    leblebi    makine     merdane     maydanoz     meridyen   meşale    makarna     nafaka     nadiren     numara    namazlık    naftalin     namuslu    onurlu ormancı     otuzlu     ortalık     ortaklık      onarım     ölümcül      ölümsüz     öfkeli    özlemek öğretmen     öğrenci    pencere     pırasa    peçete     parçacık     perili     paralı   rafadan raptiye     rastlantı     renkliler     rakipler     resital     sandalye     sinema     sonbahar salıncak     saplantı     Sakarya     şekilde     şeftali     şerbetli     şeklinde     şımarık     şantiye   Türkiye     topraklar     tırmanma     tapınma     takımlar     testere    uçurtma     uzaklar uçaklar    uzantı     ufaklık     uyarı    üzüntü     ürünler     üzümler     üflemek     üşenmek üşümek    varlıklı     verimli     valizler     vapurda     vestiyer     veranda     yararlı      yaşantı yeşillik    yuvalar     yüksekten     yaşamak     zararlı     zımpara     zenginlik      zemheri zamanla     zıvana    Kanada     Belçika     Japonya     İtalya     Cezayir     Gürcistan  Romanya   Hollanda      Almanya     Adana     Denizli     Edirne     Giresun     İstanbul    Kayseri    Malatya Nevşehir     Sakarya     Yalova     Zonguldak     Karınca     köstebek      pirana      ıstakoz jaguar     leopar     saksağan     kurbağa      papağan     palamut     Portakal      ananas     kayısı      böğürtlen     şeftali      kızılcık     domates      salatalık      patates"
      },
      {
        "title": "Part 4",
        "content": "Ağlamaklı      arındırmak     aşılamak     Ankaralı     anlaşmalı      alıştırmak     Bağlantılı buruşturmak      bocalamak     becerikli      barbunyalar      basamaklar    Cızırtılar  cisimleri   cumartesi      cinayetler      cisimcikler    ciğerciler    Çikolata      çamaşırcı      çakmakçılar çeşitlilik      çingeneler      çarşıdaki     Denizdeki      dağınıklık      dereotu      doruklarda dağlardaki      diyarlarda     Erişmekte      erişkinlik     ekşimekte     ebeveynlik      efendiler egemenlik     Farkındalık       fırtınalı       fıstıkçılar     ferasetli      faturalı      faktöriyel   Galaksiler     garantiler     gazeteci     gecelerde     gelişmeler     genellikle     Hadiseli hafızadan      hakkımızda      havacılık      hazırlıksız      hukukumuz     Iskalama      ışınlanma ışınımlar      ıstakozlar      ışığının      ılımlılık     İnsanoğlu      ibadetler      içerisi      ilköğrenim ikilemek       ilişkiler     Jeologlar      jeologun      jeoloji     jeofizik      jeneratör    jenerikler   Kafiyeden      kahverengi       kalorifer      kanatlanmak      karakterli     karıştırmak    Limonata     lahanalar      lokantacı     leblebici      lavantalar       limitsizler     Maddecilik manilerden     mevsimlerin     medeniyet     menülerin     merhametli     Narenciye nüfuslarda      nasırlarda      nerelerde     niyazlarda     Oradaki     Osmaniye     oburların okumadan      odununu     okumamış    Öbürleri      öğrenmeyi      ölçekleme      örüntüsü öğrenmeler     öğrenilen     Paketleme     paraları     parçacığı     patlamalı      patlıcanlar pırasalar     Radyasyonu      rasathane      rehineler      resimdeki      rakamlardan renklilerden     Sabunları      sadakalar      sahibini       salatalık      samimiyet      sayfalardan     Şablonları     şahısları      şakayıklar      şarküteri      şehirlerde      şikayetçi     Tabakalar tercümanlık      tamlayanlar      tavşankanı     tekerleri      teleskoplar    Unutulmuş uygulama      uykuculuk     usturalar      uyarıcılar      uykusuzluk     Üniteler       üstünlükler üzüntüden     üzerine     üzerimize      üzüntüler     Varoluşlar     vaziyetler      verilerden vazifeler      verimlilik       vesikalık     Yabancılar      yumurtalar      yanıtlama      yapabilen yapamayan     yakınmayın     Zaferlere     zamanların     zararlılar      zelzeleler     zıbınları zamirleri     Dokunduğu      uçurtmalar      oyuncakçı     Çinlilerin      okulların       kahkahalar     Ağabeyim      batışını      ayırırım      İsimleri     sorumluluk      adaletli     Boşlukları doldurunuz      üzerinde      Arkasında      gökyüzünde       fidanların     Büyümesi       portakalı      haftaları    Dolunaya      kültürümüz      çalışması     Boyayınız      görseldeki boyamaya     Pamukkale      Anıtkabir      manastırı     Tekerleme      bıraksana      Çanakkale   Akşamları       şarkımızı       arkadaşlar     Karnabahar     Brokoli      Salatalık     Dereotu    Mandalina      Semizotu     Avakado     Frambuaz      Tiramisu      Çanakkale\nOsmaniye      Kırıkkale      Eskişehir       Kırklareli       Kastamonu        Gaziantep      Adıyaman Diyarbakır      Gümüşhane     Lüleburgaz     Şanlıurfa     İnebolu     Ortahisar     Akçaabat\nÇarşıbaşı     Beylikdüzü     Ümraniye     Kasımpaşa      Muradiye      Reşadiye      Kocaeli\nİskenderun      Zeytinburnu      Eyüpsultan     Sancaktepe      Kağıthane      Etimesgut\nKeçiören      Çamlıdere      Macaristan     Moğolistan     İngiltere     Arnavutluk     Yunanistan\nBulgaristan      Arabistan     Avusturya     Afganistan     Kırgızistan     Ermenistan    Azerbaycan     Brezilya      Danimarka      Filipinler     Kolombiya     Madagaskar\nEndonezya     Kazakistan      Makedonya     Çabalamak      Tırmalamak     Saçmalamak\nHırpalamak     Zırvalamak      Yetiştirmek     Geciktirmek      Acındırmak      Arındırmak Ayıplamak     Sıkıştırmak     Çalıştırmak      Yuvarlamak      Yudumlamak      Hazırlamak\nSakındırmak     Kurcalamak      Sinirlenmek      Öfkelenmek      Pazarlamak     Geçiştirmek\nAlıştırmak     Çözümlemek      Azarlamak     Barıştırmak      Araştırmak      Kazandırmak\nKanıtlamak     İspatlamak     İçerlemek     Taahhütlü     Mesafeli     Marifetli      Yetenekli\nBecerikli      Sadakatli      Kademeli     İadeli     Faturalı     Müsabaka     Karşılaşma    Zanaatkar     Sinemacı     Mesuliyet     Meşguliyet     Biyografi     Kardiyolog     Dahiliye\nHariciye     Edebiyat     Matematik      Geometri     Veresiye     Bağışlama      Doğaçlama\nAsabiyet     Asimetrik     Sistematik     Mücadele     Münakaşa     Müdafaa      Müdahale\nMünazara     Mukabele      Müracaat"
      },
      {
        "title": "Part 5",
        "content": "bakabilirim barışseverlik battaniyeler belediyeler benzeşmeleri bileşikleri cumhuriyetçi cumhuriyetler ciddiyetsizlik cezalandırmak cenazedeki çalışabilir çekimlerimden çingenelerden çevirmemeyi çikolatalar çekirdekçiler daireleri değerlendirmek değerlendirir desenlerini dosyalamamak duygusallıklar ebeveynlerden efendileri egemenlikler empatileri enerjisinin erişilemez faktöriyelden felsefeciler fırtınalarda fikirlerimiz farkındalıklar Galatasaray galaksilerden garantilemek geliştirmeler gerçekleşmeler gezegenlerden hâkimiyetler hanımefendi hatıralarda havacılıklar hazırlıksızlık hediyelikler hukukumuzda ibadethane ideoloji işletmecilik insanlarından isimlendirmek işaretlemek jeologlardan jiletlerinden jürilerinin jakuzideki jeofizikten jölelilerden kafiyelerden kahverengiler kaldırımlardan karikatürler kategoriye kendilerini   limonatalar lokantacılık lalelideki lambalardaki leblebiciler leyleklerine milliyetçilik mahkemelerde makineliler matematikçi medeniyetler memnuniyetle nesnelerimiz neredekiler narenciyeler nakışlarımız niyetlerimiz okunabilir omurgalılar olağanüstü otomobiller ortaöğrenim optimizasyon öbürlerini öğrenilmeyen örüntüleri ölçeklemeli ötekileri paketlemeler patlamalardan pencerelerde periyotlarda permütasyonlar politikayı rasathaneler rehinelerden reçetelerde rahatsızlıklar reçellerinden rastlantısallar salatalıklar sabunlamamak sayıklamalar sayılarından sertifikalı sözcüklerimiz şablonlarının şahıslarının şartnamelerde şekillendirmek şakalaşmalar şıklardakiler tahterevalli tadilatları tabanlarına tamlayanının tarayıcının tekerleklerin    umumiyetle uzaylılardan uzaklıklardan uzantılarla uğursuzluklar Uygurlulardan   ünitelerden üniformalı üzüntülerin üçkağıtçılık ümitlilerden üçlülerdeki vejetaryenlik vekaletname vesikalardan verimlilikten vakitsizlikten vapurlardaki yazılımlara yemeklerimiz yumurtaları yönetimleri yükseköğretim yenilemeler zamirlerini zikretmemeni zayıflıktandır zeminlerdeki zamanlardaki zihinlerimiz Havaalanı Olağanüstü Devedikeni Ateşböceği Yalıçapkını Akşamüzeri Açıköğretim İkiyüzlülük      Uyurgezerlik Akşamsefası Denizanası Vişneçürüğü Hanımefendi Öğretmenevi       Kayınvalide Sıkıyönetim Civanperçemi İmambayıldı Seyahatname arındırmak     aşılamak alıştırmak buruşturmak bocalamak ikilemek kanatlanmak karıştırmak     Çabalamak Tırmalamak Saçmalamak Hırpalamak Zırvalamak Yetiştirmek Geciktirmek      Acındırmak Arındırmak Ayıplamak Sıkıştırmak Çalıştırmak  Yuvarlamak Yudumlamak      Hazırlamak Sakındırmak Kurcalamak Sinirlenmek Öfkelenmek Pazarlamak     Geçiştirmek Alıştırmak Çözümlemek Azarlamak Barıştırmak Araştırmak Kazandırmak      Kanıtlamak İspatlamak İçerlemek"
      },
      {
        "title": "Part 6",
        "content": "Bir ve olmak bu için o ben demek çok yapmak ne gibi daha almak var kendi gelmek ile vermek ama sonra kadar yer en insan değil her istemek yıl çıkmak görmek gün biz gitmek iş şey ara ki bilmek zaman yağ çocuk bakmak çalışmak içinde büyük yok başlamak yol kalmak neden siz konu yapılmak iyi kadın ev ise diye bulunmak söylemek göz gerekmek dünya baş durum yan geçmek sen onlar yeni önce başka hayır orta su girmek ülke yemek hiç bile nasıl bütün karşı bulmak böyle yaşamak düşünmek aynı hiç iç ancak kişi bunlar veya ilk göre ön son biri şekil önemli yüz hem göstermek etmek alt getirmek kullanmak çünkü taraf şimdi adam onun diğer artık üzerinde ses hep doğru durmak kız tüm çekmek konuşmak para anlamak anne az bazı baba hayat sadece küçük fazla bilgi an sormak bunun öyle yine sağlamak sonuç kullanılmak dış at ad yani süre dönmek açmak oturmak anlatmak bırakmak hemen saat yaş sorun devlet sahip sıra yazmak ay atmak tutmak bunu olay düşmek duymak söz güzel sevmek biraz zor çıkarmak şu koymak tek sistem birlikte verilmek kim alınmak genç kapı kitap üzerine burada gece alan işte beklemek uzun hiçbir bugün dönem arkadaş ürün şekil önemli hem göstermek etmek getirmek kullanmak aile okumak erkek herkes güç gerçek tam ilgili ilişki çevre eski aramak yaşam halk sokak yakın bey tarih özellik bölüm özel akıl kimse pek eğer gerek özellikle anlam yüksek banka kez ayak taşımak geri toplum araç madde tür karar görülmek hava sayı farklı grup ada biçim oluşmak haber ayrıca gelen birkaç soru arka kazanmak yazı okul açık öğrenmek sürmek dil şirket kaynak bitmek program renk açılmak hak inanmak çalışma açı parça oluşturmak tabii değer tanımak yapı doktor gelir görev amaç bölge film üzere müşteri zaten telefon eğitim deniz ikinci kalkmak hatta etki gelişmek geçen araba ağız duygu uygulamak hâlâ örnek izlemek derece mümkün şöyle duvar sanat ana hastalık öğrenci televizyon yöntem masa takım üst kafa müzik ayrılmak enerji üniversite türlü can rağmen mümkün kısım sürekli sağlık çeşitli bundan hissetmek oysa sabah internet teknik dışarı merkez ortam yerine düzey köy yönetim vücut düşünce milyon oynamak değişmek temel yaratmak sanmak ulaşmak geçirmek kurmak fakat ışık içmek artmak yeniden işlem kısa kolay hangi oran aslında"
      },
      {
        "title": "Part 7",
        "content": "Orada dikkat uzak bilgisayar gelecek görünmek oğul dinlemek uygun lira üretim dakika unutmak böylece kötü aşağı cevap yatmak toprak isim akşam araştırma götürmek katılmak yoksa kurulmak ödemek sanki kan hasta şehir inmek sunmak bilinmek hafta trafik hesap otomobil yabancı davranış mutfak kent bazen belli ayrı fiyat hakkında kaldırmak kol yalnız hazırlamak cam sonunda yavaş geri gerekli önem hoca yanlış varlık art ilgi sana satış içeri doğal ekonomik acı hayır korumak kat ekonomi genel belirtmek fotoğraf hayvan savaş mavi mal saç kaybetmek kalan değiştirmek gerçekten sayfa teknoloji kurum sektör geniş kağıt koku sağ sıcak yüzyıl cadde Pazar sürdürmek kullanım sınıf aşk doğmak ağır tekrar güneş sigara ağaç kelime bina eş kaçmak parti yatak yazar kulak öğretmen sebep sol peki edat yüzden anlaşılmak varmak gülmek kural satmak şiir göndermek başarı firma hükümet kalp kesmek şart hız köşe vurmak model balık piyasa görüş bura hazırlanmak miktar meydan ölçü seçmek uygulanmak bahçe sevgi ekmek boyunca koşmak dolu kuruluş sayı korkmak yardım karşılaşmak malzeme hoş köpek ünlü büyümek dolaşmak oldukça üstelik yaşanmak beyaz istek öte denmek kardeş çekilmek nerede çalmak izin korku meslek polis açıklamak fikir hızlı pencere uğraşmak taş ateş fark yetmek kimi koşul mahalle mutlaka tane üretmek üstüne dayanmak ince ortak tip insan görüntü ders başkan karşılık kurtulmak numara defa edilmek batı sinema değişik hedef uyumak dost yanmak anlayış asıl basmak kenar kontrol çevirmek din güçlü henüz plan beyin elektrik üstünde sağlanmak söylenmek çizgi üye cilt ruh sevgili yaklaşmak süreç bakış bilim ifade ileri beden hatırla kaza iyice dağ kapatmak adım ciddi çözüm etkilemek fiil belediye gelişme seçim ağlamak bağlı kavram artırmak faaliyet zarar derin salon çeşit kesilmek seyretmek birden içermek sayılmak toplamak aşmak bağırmak sorumluluk davranmak mektup soğuk canlı makine yararlanmak yaşlı sıfat boş acaba maç yönetici getirilmek metre tutulmak kalite değişiklik bitki ilaç kredi yasa imkan ceza incelemek top uzman doldurmak kanal uymak yıllık dolayısıyla yazılmak ait parmak saymak atılmak belirlemek normal hele ilke kırmızı rol şarkı eleman hazır benzemek boy günlük politika suç sahne sokmak adet koltuk kurtarmak sanatçı uzanmak aşama eklemek orman ayırmak düzen faiz genellikle hikaye hücre ora roman vergi yakmak ağabey basın destek giymek hata sınır birlik eser karşılamak yarı yeterli birey karanlık otobüs sanayi bebek vatandaş bakan kere millet reklam yükselmek boyut dergi enflasyon sosyal geçmiş toplantı gazeteci"
      },
      {
        "title": "Part 8",
        "content": "inanç nitelik üzeri bitirmek gerçekleşmek giriş rahat toplam beraber dükkan gizli benzer deri dönüşmek mücadele problem servis tedavi yeşil bakanlık uyumak yıllık mağaza yazılmak ait parmak saymak normal ilke kırmızı şarkı eleman hazır benzemek bir şey hoca boy kilo günlük politika suç sahne adet koltuk kurtarmak sanatçı uzanmak aşama eklemek ayırmak düzen faiz genellikle hikaye hücre roman vergi yakmak ağabey basın destek baskı tepki cümle dilemek özgürlük kimlik üçüncü belirlenmek ilginç sürücü süt yakalamak eşya uluslararası aday milyar sağlıklı tavır toplumsal yayın toplanmak yatırım hafif karışmak tehlike daire fırsat işlemek karıştırmak öykü tamamen uçak yanıt evlenmek burun çıkar elbette işçi işletme kısaca mağaza medya yüzünden artış çıkarılmak sigorta yaz yürek belge çaba demokrasi tuz çağ düşük etraf hızla olanak öldürmek öteki bozulmak ilgilenmek meyve takılmak tatlı bacak değişim kanun rüzgar Cumhuriyet geliştirmek azalmak bağlamak iletişim müdür otel yayınlanmak laf ticaret örgüt yaptırmak cihaz boyun denge kahve kas meclis öteki uğraşmak adres alışveriş güven marka yaprak yaptırmak yarar yayılmak akmak çizmek düşünülmek gönül hayal ilerlemek şarap yukarıda altın düzenlemek sunulmak temiz vitamin ek geç yumurta aşırı eylem istemek kesin birim istemek kapanmak güvenlik hukuk kılmak modern okur talep yoğun asker basit denilmek gaz alışveriş bilinç uygulama üretilmek beyan besin dün görüşmek yaklaşık çerçeve lazım mevcut tüketici uzanmak uzatmak yönelik bağlanmak neredeyse abla çiçek hepsi saygı ücret yetenek kilo paylaşmak sert çay gider kesin zengin asla"
      },
      {
        "title": "Part 9",
        "content": "Bumbıl  basübadelmevt çavşırı çilemek dilhun feveran haddizatında hissikablelvuku hodbin meyus müşkülpesent perdebirun tecessüs tufeyli tumturak ülger deryadil lalettayin haslet nefaset mültefit bedbin perestiş merdümgiriz şikemperver efsunkar munis feriştah canhıraş mütevellit münferit mamafih vakıf hercai vaveyla girift hemdem sirayet nazenin amiyane bilmukabele diğerkam  velhasıl meymenet meymenetsiz lafügüzaf mutabık tahayyül payidar mukadderat beynelminel müteşekkir namütenahi beyhude alaya alavurt alengirli öznel ödün önayak öncül pohpohlamak polemik panorama paye prova pozitif propaganda pragmatik presentabl rağbet reaksiyon rehavet realist radikal rötuş ramak riyakar sait sebat seans soğukkanlı sekte serzeniş simge şablon şairane şifahen tasdik tahsis tamah tasarı tekdüze tekzip tutarlılık tümce tümel ukde umde umumi umacı ulak ulvi üleştirme ülfet ünsiyet vahim yadsımak yazınsal yeğlemek zemberek zembil zeval zula züğürt zürriyet ekarte elalem epik epope erbap erinç ego eğreti ekol empoze etik eyyam evkaf eza ezcümle faal esame fuaye Fulya fenomen gaddar galatımeşhur galat gıpta göreceli günaşırı güdüm gına gırla gıyaben habbe habis hegemonya hunhar hususi helecan ironi ırsi diyet idrak imtiyaz işlev ivedi kabare kanı klişe laçka lafa yazan lafıgüzaf mabeyn mebde muaf muasır muayyen mübalağa naçar naçiz nadan neşretmek nüans nemene oratoryo olgu okuntu ölçüt öykünme adaptasyon acar absürt alegori amade alenen analiz anafor anekdot azami asgari anonim aşikar alelade akıcı arı ati basma kalıp burjuva biçem belirtke bağlam bayağı bengü Bergüzar bohem cengâver cenk cebren cedit celep Celil celse cehil cafcaflı caka celalle yenmek çağdaş çuvallamak çaçaron çalakalem çeşni çığırtkan debdebeli debelenmek deformasyon deforme dududilli dumur demagoji devinim dingin doktrin dönüt doğaçlama ebat ebedi ebru ebruli ecnebi edevat edim editör efemine efsun ehil açıklık adaptasyon akıcılık aktüel alegorik anaç antoloji bahtiyar betimleme biçim bilinç biyografi böbürlenmek bulgu çevirmen dağarcık deforme didaktik doğallık duruluk duyarlılık duyu duyuş düş düşünsel editör eleştiri eleştirmen estetik evrensel fantastik fantezi folklor gerçeküstü güncel içgüdü içtenlik ikilem ileti imbik imge irdelemek izlenim kanı karakter kaygı kesit kuram kurgu kurmaca lirik mihnet mistik miskin nesnel nostalji nüfus olgu ölçüt özeleştiri özgü özgünlük özgülük özümsemek özveri realite sağduyu salt saptamak salt sezgi sürtmek şematik tema terim terkip tutku tutum tümce üslup varsayım yazın yozlaşma zanaat"
      }
    ]
  }
];

/***** Öğretmen kütüphanesi (kalıcı) *****/
const STORAGE_KEY = 'teacherLibrary';
function loadTeacherLibrary() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}
function saveTeacherLibrary(arr){ localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }
let teacherLibrary = loadTeacherLibrary();

/***** Global durum *****/
let words = [], idx = 0;
let paused = true;
let timerId = null; // setInterval yerine setTimeout zinciri

/***** Başlangıç font *****/
if (fsSl) display.style.fontSize = `${fsSl.value}rem`;

/***** Sesli okuma: TR sesleri ve seçim *****/
let trVoices = [];
function refreshVoices() {
  trVoices = speechSynthesis.getVoices().filter(v => v.lang && v.lang.startsWith('tr'));
}
refreshVoices();
speechSynthesis.onvoiceschanged = refreshVoices;

function pickTurkishVoice() {
  refreshVoices();
  if (!trVoices.length) return null;
  const wantFemale = voiceGender?.value === 'female';
  const femaleCandidates = trVoices.filter(v => /filiz|female|kadın/i.test(v.name));
  const maleCandidates   = trVoices.filter(v => /male|erkek/i.test(v.name));
  if (wantFemale) return femaleCandidates[0] || trVoices[0];
  return maleCandidates[0] || trVoices[0];
}

/***** Sliderlar *****/
[wpmSl, numSl, fsSl].forEach(sl=>{
  if(!sl) return;
  sl.oninput=()=>{
    wpmVal.textContent=wpmSl.value;
    numVal.textContent=numSl.value;
    fsVal.textContent =fsSl.value;
    display.style.fontSize=`${fsSl.value}rem`;
    enforceSoundLimit();
    if (!paused && (sl === wpmSl || sl === numSl)) {
      scheduleNextTick(); // anlık hız/adet değişiminde hemen etkili
    }
  };
});

/***** Tema toggle *****/
if(localStorage.theme==='dark'){document.body.classList.add('dark'); themeTgl.checked=true;}
themeTgl.onchange=()=>{
  document.body.classList.toggle('dark', themeTgl.checked);
  localStorage.theme = themeTgl.checked ? 'dark' : 'light';
};

/***** BÜYÜT / KÜÇÜLT düğmeleri (Fullscreen & Screen Orientation API) *****/
fullBtn.onclick = async () => {
  try {
    await displayWrapper.requestFullscreen();
    await requestWakeLock();
    try { await screen.orientation.lock('landscape'); } 
    catch (err) { console.warn("Ekran döndürme kilitlenemedi:", err); }
  } catch (err) {
    console.warn("Tam ekran moduna geçilemedi:", err);
    display.classList.add('enlarged');
  }
};

exitFullBtn.onclick = async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    try { screen.orientation.unlock(); } catch (err) {}
    await releaseWakeLock();
  } catch (err) {
    display.classList.remove('enlarged');
  }
};

// sekme geri gelince wakeLock düşmüş olabilir
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && !paused) requestWakeLock();
});

// Tam ekran durumunu dinle
document.addEventListener('fullscreenchange', () => {
  const isFullscreen = !!document.fullscreenElement;
  fullBtn.classList.toggle('d-none', isFullscreen);
  exitFullBtn.classList.toggle('d-none', !isFullscreen);
});

/***** Toggle görünüm *****/
customTgl.onchange = () => customArea.style.display = customTgl.checked ? 'block' : 'none';
partSelect.onchange = () => reset();

/***** Başlat / duraklat / reset *****/
playBtn.onclick = () => paused ? start() : pause();

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    const step = e.shiftKey ? 50 : 10; // Shift ile 50, tek başına 10 KPM
    const newWpm = +wpmSl.value + (e.key === 'ArrowRight' ? step : -step);
    wpmSl.value = Math.max(10, Math.min(1000, newWpm)); // Min/Max
    wpmVal.textContent = wpmSl.value;
    enforceSoundLimit();
    if (!paused) scheduleNextTick(); // ANINDA yeni ritim
  }
});

resetBtn.onclick = reset;

/***** Dosya yükleme (TXT veya CSV) *****/
fileInput.onchange = e=>{
  const f = e.target.files[0]; if(!f) return;
  const r = new FileReader();
  const isCSV = /\.csv$/i.test(f.name);

  r.onload = ev => {
    if (isCSV) {
      const lines = ev.target.result.split(/\r?\n/).filter(Boolean);
      if (lines.length > 1) {
        const added = [];
        for (let i=1;i<lines.length;i++){
          const raw = lines[i];
          const [title, ...rest] = raw.split(',');
          const content = rest.join(',').trim();
          if (title && content) {
            teacherLibrary.push({ title: title.trim(), content });
            added.push(title.trim());
          }
        }
        saveTeacherLibrary(teacherLibrary);
        alert(`${added.length} metin eklendi (Öğretmen Metinleri).`);
        location.reload(); // dropdown’u kolay tazele
        return;
      } else {
        alert('CSV biçimi beklenenden farklı görünüyor.');
      }
    } else {
      // TXT: paragraflara bölerek tek “Metin” gibi yükle
      loadParts(ev.target.result, 'Metin');
      libSelect.value = '';
      customTgl.checked = false; customArea.style.display = 'none';
      reset();
    }
  };
  r.readAsText(f,'utf-8');
};

/***** KÜTÜPHANEYİ YÜKLE *****/
// (function loadLibrary(){
//   populateLibrary(localLibrary);
//   populateTeacherLibrary(); // öğretmen metinlerini de bas
// })();

function populateLibrary(library){
  library.forEach(category => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = category.category;
    category.texts.forEach(text => {
      const option = document.createElement('option');
      option.value = text.title; 
      option.textContent = text.title;
      option.dataset.source = 'builtin';
      optgroup.appendChild(option);
    });
    libSelect.appendChild(optgroup);
  });
}

function populateTeacherLibrary(){
  if (!teacherLibrary.length) return;
  const optgroup = document.createElement('optgroup');
  optgroup.label = 'Öğretmen Metinleri';
  teacherLibrary.forEach(t => {
    const o = document.createElement('option');
    o.value = t.title;
    o.textContent = t.title;
    o.dataset.source = 'teacher';
    optgroup.appendChild(o);
  });
  libSelect.appendChild(optgroup);
}

/***** DROPDOWN DEĞİŞTİĞİNDE KATEGORİDEN METİN BUL *****/
libSelect.onchange = ()=>{
  const selectedTitle = libSelect.value;
  if(!selectedTitle) return;

  // önce öğretmen kitaplığında var mı?
  const tFound = teacherLibrary.find(t => t.title === selectedTitle);
  if (tFound) {
    loadParts(tFound.content, 'Metin');
    fileInput.value = '';
    customTgl.checked=false; customArea.style.display='none';
    reset();
    return;
  }
  // sonra yerel kütüphanede ara
  for (const category of localLibrary) {
    const found = category.texts.find(text => text.title === selectedTitle);
    if (found) {
      loadParts(found.content, 'Metin');
      fileInput.value = '';
      customTgl.checked=false; customArea.style.display='none';
      reset();
      return;
    }
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

/***** Metni parçalara böl ve select’i doldur *****/
function loadParts(raw, labelPrefix = 'Metin'){
  const parts = raw.split(/\n\s*\n/);
  partSelect.innerHTML='';
  parts.forEach((p,i)=>{
    const o=document.createElement('option');
    o.textContent = `${labelPrefix} ${i+1}`;
    o.dataset.text = p.trim();
    partSelect.appendChild(o);
  });
  // Tek parça ise seçimi gizle, çok parça ise göster
  partSelect.classList.toggle('d-none', parts.length <= 1);
}

/***** Okuma motoru *****/
function prepare(){
  let txt="";
  if(customTgl.checked) {
    txt = customArea.value.trim();
  } else if (partSelect.selectedOptions.length > 0) {
    txt = partSelect.selectedOptions[0]?.dataset.text || "";
  }
  if(!txt) return;
  words = shuffle(txt.split(/\s+/).filter(w => w.length > 0));
  idx = 0;
  updateProgress();
}

/* Dinamik zamanlama: her turda anlık KPM’e göre yeniden planlanır */
function msPerChunk() {
  const wpm = +wpmSl.value;
  const n = +numSl.value;
  return 60000 * (n / Math.max(10, wpm));
}

function scheduleNextTick() {
  clearTimeout(timerId);
  timerId = setTimeout(() => {
    tick();
    if (!paused) scheduleNextTick();
  }, msPerChunk());
}

function start(){
  if(!words.length) prepare();
  if(!words.length) return alert('Okunacak metin yok!');
  
  paused=false; 
  playBtn.textContent='Duraklat';
  document.body.classList.add('is-reading');
  updateFocusState();
  enforceSoundLimit();

  // ilk gösterimi beklemeden yap
  tick();
  scheduleNextTick();
}

function pause(){ 
  paused=true; 
  playBtn.textContent='Devam'; 
  clearTimeout(timerId); 
  speechSynthesis.cancel();
  document.body.classList.remove('is-reading');
  updateFocusState();
}

function reset(){ 
  pause(); 
  idx=0; 
  words=[]; 
  display.innerHTML='';
  playBtn.textContent='Başlat'; 
  updateProgress();
}

function tick() {
  if (idx >= words.length) { reset(); return; }
  const grp = words.slice(idx, idx + +numSl.value).join(' ');
  
  // ODAK ANAHTARI KONTROLÜ
  if (focusTgl.checked) {
    const midpoint = Math.floor(grp.length / 2);
    let focusHTML = '';
    if (grp.length > 0) {
      focusHTML = `${grp.substring(0, midpoint)}<span class="focus-letter">${grp[midpoint] || ''}</span>${grp.substring(midpoint + 1)}`;
    }
    display.innerHTML = focusHTML;
  } else {
    display.textContent = grp; // Odak kapalıysa düz metin
  }

  // Sesli okuma (≤50 KPM)
  if (soundTgl.checked && +wpmSl.value <= 50) {
    const u = new SpeechSynthesisUtterance(grp);
    u.lang = 'tr-TR';
    const v = pickTurkishVoice();
    if (v) u.voice = v;
    u.rate = 1.0;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
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

/***** İLERLEME ÇUBUĞU *****/
function updateProgress() {
  const percentage = words.length > 0 ? (idx / words.length) * 100 : 0;
  const pct = Math.min(percentage, 100);
  progressBar.style.width = `${pct}%`;
  progressBar.setAttribute('aria-valuenow', Math.round(pct));
}

/***** ODAK ÇİZGİSİ ON/OFF *****/
focusTgl.onchange = updateFocusState;
function updateFocusState() {
  const isReading = document.body.classList.contains('is-reading');
  document.body.classList.toggle('reading', focusTgl.checked && isReading);
}

/***** 60 KPM ses limiti (UI + mantık) *****/
function enforceSoundLimit() {
  const over = +wpmSl.value > 60;
  soundTgl.disabled = over;
  soundTgl.title = over ? 'Sesli okuma için KPM 60 veya daha düşük olmalı' : '';
  if (over && soundTgl.checked) {
    soundTgl.checked = false;
    speechSynthesis.cancel();
  }
}

/***** Bootstrap Tooltip'leri Başlat *****/
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));


// ========================================================================
// DIŞ JSON'DAN KÜTÜPHANE YÜKLEME
// ========================================================================
async function loadExternalLibrary() {
  try {
    const res = await fetch('library.json'); // aynı dizinde
    if (!res.ok) throw new Error('library.json bulunamadı');
    const data = await res.json();
    populateLibrary(data); // senin mevcut fonksiyon
  } catch (e) {
    console.warn('JSON kütüphane yüklenemedi:', e);
  }
}

// init sırasında:
(function initLibrary(){
  populateLibrary(localLibrary);
  populateTeacherLibrary();
  loadExternalLibrary();  // dış JSON’u da ekle
})();

