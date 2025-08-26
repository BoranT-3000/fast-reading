/* =================== Flash-Reader app.js =================== */

/* ---- GLOBAL STATE ---- */
const state = {
  rawText: "",
  words: [],
  idx: 0,
  playing: false,
  timer: null,
  wpm: 250,
  numWords: 1,
  fontRem: 3.5,
  shuffle: false,
  tts: false,
  focus: true,
  voiceGender: "female",
  theme: "light",
  lang: "tr",
  // focus controls
  focusY: 50,       // yatay çizgi konumu (%)
  focusX: 50,       // dikey çizgi konumu (%)
  focusVert: false, // dikey çizgi açık mı
};

/* ---- PRESETS (senin verin) ---- */
const PRESETS = [
  {
    "category": "Çalışma Seti",
    "texts": [
      { "title": "Part 1", "content": "aç     ad          af          ağ          ah          ak          al          alt         an        ant     ar          ark          art     arz   as     ast   aş  at        av          ay          az bağ        bak   bal   ban    bar   bas   baş    bat   bay   baz    bej    bek    bel    ben    beş    bet  beybez    bık    bil    bin    bir  bit   biz   boğ      bol    bom     bor    boş    bot  boy   boz       böl\nbön    bul   bun   but   buz    bük      büz     caz  cem    cep    cet   cız   cilt   cip    cips    cop    coş    cuk     cüz çak   çağ    çal    çam   çan   çap    çar    çat    çay   çek    çel   çık    çiğ   çil    çim  Çin    çip    \nçir   çit   çiz   çok   çök   çöl   çöp   çöz    çul    dağ   dal   dam  dar   def    del    dem   dış   dik   dil   din   dip    diş    diz    doğ   dol   don  \ndoy    doz    dök   döl   döş   döv    dul  duş    dut     duy   dün    düş    düz   ek   el   em   en   er   es   eş   et    ev   ez   fak   fal   fan  far   fay  faz   fen   fer    fes    fil   fiş   fit\nfok   fol   fon   fos   föy  gaf   gam   gar   gaz   geç   gel   gem    gen    ger   gez   gir   git   giz   gol    göç   gök   göl   göm\ngör   göz    güç    gül   gün   gür    güz    hak   hal   ham   han   hap   har   has   hat    hav    haz    her    hır    hız    hiç   hol    hor    hoş    hun    iç    iğ   il   ilk   im    in   ip   is    iş    it    iz    jel  jet   jön  kaç     kal    kan    kar    kas    kaş    kat    kay    kaz    kel   kes    ket    kez    kıl    kır    kış    kıt    kız\nkil  kin    kir   koç   kol  kon   kop   kor    koş    kot   koy   koz   kök    kör   köy   köz   kul   kum \nkur   kuş    küf   kül    kür    küs    laf   lal   lam    lav    laz    leş    lop    loş    maç    mal    mat   meç   men   mey   mil     mum     muş    muz    nal    nam     nar    naz     nem      net     ney     not    nur    of    ok    ol    on    org    ot     oy    öç    öd    öl    ölç    ön   öp    ör    örs    örf   ört     öt   öv    öz     pak    pas    pat    pay    pek     pes    pet    pik    pil    pim   pir    pis    piş    pot    poz    puf   pul   pus   put   pür     rab     raf    ray    ret    rey   rol   rot   ruh    rum    rus     saç    saf    sağ    sal    sam     sap    sar     sat    sav    say     saz    seç    sel    sen    ser    set\nsev    sık   sır   sil    sim    sis    siz    son   sor   soy    sök    sön   söz    suç    sun    sur    sür   süs süt   süz    şah    şal    şan    şap    şef     şen    şer    şey     şık    şok     şut    taç   tak    tam    tan    tas    taş    tat    tav     tay    tef    tek    tel     ten   tep    ter    tez   tığ   tır\ntik   tim    tip   tok   ton    toy    top    toz    tuğ   tuş    tut    tuz   tül    tüm    tüp    tür   tüy    uç    \nun    ur    ut   uz    üç     ün   üs   üst    ürk    üz    var   ver   vinç   vur    yağ    yak    yal    yan   yap   yar    yaş    yas      yat    yay   yaz    yel   yem   yen   yer   yığ   yık   yıl   yok   yol   yoz    yük   yün    yüz    zam    zan   zar    zat    zıt     zil    zor\n\nBank   Bant   Berk   Boks   Borç   Broş   Burç   Büst   Celp   Cenk   Cins   Cilt   Çark   Çift   Dans   Darp   Denk   Ders   Dert   Dinç   Dost   Dört   Dürt   Fırt   Form   Fren   Fötr   Genç   Golf   Gonk   Gram   Grip   Grup   Gürz   Fark   Farz   Felç   Fert   Halk   Harç   Harf   Jant   Jest   Kalk   Kamp   Kalp   Kast   Kent   Kırk   Kırp   Kort   Köşk   Kreş   Krem   Kriz   Kulp   Kurs   Kurt   Kürt   Linç   Lüks   Marş   Mart   Mest   Misk   Mont   Neft   Park   Pist   Plak   Plaj   Plan   Post   Priz   Raks   Rant   Ring   Rast   Renk   Rest   Salt   Sark   Semt   Sert   Serp   Sırp   Sırt   Sürt   Şans   Şarj   Şart   Şevk   Şeyh   Şilt   Şort   Tank   Tart   Tarz   Tayt   Terk   Ters    Test    Tost   Tren    Turp   Türk   Vinç    Yırt   Yont   Yurt" },
      { "title": "Part 2", "content": "kısa abla acı akşam altın amaç anı anne araç aslan baba bahar balık bardak barış bayrak bayram bebek beyaz bıçak bıyık bilim bina bilim burun ciğer coşku çanta çare çatal çiçek çimento çocuk çimen düşman erkek evlat fare ferman fincan gece gölge gözlem gözlük gurur gümüş güneş halı hayat hece hedef hurda huzur hüzün inek işgal kadın kağıt kahve kalem kapı kasa kasap kaşık kazak kedi kitap komşu koyun köpek kral kural kurban kuzu mama mana masa melek mide Murat okul oyun öküz önem ördek pembe sabah saha sakal sakız sarma sevda sevgi sevinç sınıf sıra sihir sincap sinek siyah spor sürat tabak tahta tane tarak tasa trend turşu tütün uğur uyku vatan yemek yuva zeka akla ekle kalem elek kelek leke laklak lale akli ekli ilik kekik ilke lila keklik halan anne ekin inal enli ilan inan kanal inle lakin nalan nine kalan Kenan nail nane ninni alo kola konak kokla ona kilo koli koni elma komik liman Muğla mola eşek milli ekmek iklim Kamil Kemal kemik leman limon kamu koku kollu kanun kolluk konu kule kumlu malum mumluk ulu konuk kullan lokum oku oluk okluk ulak uzun umut Altan anten mutlu tatil kutu anlat olta nota toka taklit tonton kilit akü küme küllü kütle etüt kütük küllük lüle tümü türü tünek ümit nükte Tülin Tümen tünel tütmek Ünlü ülkü ülkem menü ayak ayna kamyon kaynak kolay koyun maymun yaka yanak yemek yutak ayla iyi kaykay kaymak leylek oyna uyku yamuk yatak yokluk yumak öte köle kötü köklü önlük öykü köken köpek erik iri karton korkak kuru ömür örtü tanker teker titrek türlü türkü arka emre karne erken kurak lira ortak örme tamir tarak tere terli tören ürkek yürek akıl alın anlat atık ılık kayık kıyma kıta yakın ırmak yıkık yırtma ayı katı kılık mantı tanık tartı tırtıl yarım yalın ada eda damak demir demlik delik dilek dirlik dolma dökme durak dürüm maden moda nadir damar damat dantel dede derman doku donuk dönük dudak düdük döner müdür ördek mide ıslak mısır sakal sakin Salı Sandal sandık sema simit soluk sökük istek maske sadık sokak salon sarı sanat sayı serin sinek soru sönük süre uslu baba balık bana bakla bamya banyo bardak beton berber bidon dahi Mehtap reha sahne şehir zahmet alev ayva civciv çivi davul duvar görev hayvan mavi ova pilav tavan vadi vali vatan veli vişne avcı ceviz çavuş çuval deve havuç kahve ödev savaş tavuk vagon vapur villa yavru bağlaç boğaz çağdaş çiğdem değnek doğa" },
      { "title": "Part 3", "content": "Ahtapot    Atatürk    Ankara     anlama     ağaçlar    akşamlar   benekli    basketbol  beklemek    boyama    bakanlık    beslemek   camiler    cemiyet    cennetlik    canlılık canlılar    cümleler   çeşitli    çiçekler    çıngırak    çaydanlık    çatışma    çekirdek   değişik düzenli    devamlı    dershane    duraklar    daima    elmacık    eskici    eklemler    estetik ekinler    ekmekler   farkında     fıstıkçı    fanatik    festival    fırında    felaket   güneşli gardırop    gökyüzü    gemici    gazete    güzellik   hastalık    hastane    hapşırmak    hikaye hayvanlar    hangisi   Istakoz    ıhlamur     ırkçılık     ılımlı     ıslatan    ılıman   ilkokul   ilkbahar   inançlı    imkansız     iletken     insancıl    Jandarma     jakuzi     jelatin     jiletli     jenerik   Kırmızı     kurtuluş     küçücük     kelime     kumbara      kurbağa    laleli     laleler leylekler     lezzetli     lakırtı    leblebi    makine     merdane     maydanoz     meridyen   meşale    makarna     nafaka     nadiren     numara    namazlık    naftalin     namuslu    onurlu ormancı     otuzlu     ortalık     ortaklık      onarım     ölümcül      ölümsüz     öfkeli    özlemek öğretmen     öğrenci    pencere     pırasa    peçete     parçacık     perili     paralı   rafadan raptiye     rastlantı     renkliler     rakipler     resital     sandalye     sinema     sonbahar salıncak     saplantı     Sakarya     şekilde     şeftali     şerbetli     şeklinde     şımarık     şantiye   Türkiye     topraklar     tırmanma     tapınma     takımlar     testere    uçurtma     uzaklar uçaklar    uzantı     ufaklık     uyarı    üzüntü     ürünler     üzümler     üflemek     üşenmek üşümek    varlıklı     verimli     valizler     vapurda     vestiyer     veranda     yararlı      yaşantı yeşillik    yuvalar     yüksekten     yaşamak     zararlı     zımpara     zenginlik      zemheri zamanla     zıvana    Kanada     Belçika     Japonya     İtalya     Cezayir     Gürcistan  Romanya   Hollanda      Almanya     Adana     Denizli     Edirne     Giresun     İstanbul    Kayseri    Malatya Nevşehir     Sakarya     Yalova     Zonguldak     Karınca     köstebek      pirana      ıstakoz jaguar     leopar     saksağan     kurbağa      papağan     palamut     Portakal      ananas     kayısı      böğürtlen     şeftali      kızılcık     domates      salatalık      patates" },
      { "title": "Part 4", "content": "Ağlamaklı      arındırmak     aşılamak     Ankaralı     anlaşmalı      alıştırmak     Bağlantılı buruşturmak      bocalamak     becerikli      barbunyalar      basamaklar    Cızırtılar  cisimleri   cumartesi      cinayetler      cisimcikler    ciğerciler    Çikolata      çamaşırcı      çakmakçılar çeşitlilik      çingeneler      çarşıdaki     Denizdeki      dağınıklık      dereotu      doruklarda dağlardaki      diyarlarda     Erişmekte      erişkinlik     ekşimekte     ebeveynlik      efendiler egemenlik     Farkındalık       fırtınalı       fıstıkçılar     ferasetli      faturalı      faktöriyel   Galaksiler     garantiler     gazeteci     gecelerde     gelişmeler     genellikle     Hadiseli hafıdan      hakkımızda      havacılık      hazırlıksız      hukukumuz     Iskalama      ışınlanma ışınımlar      ıstakozlar      ışığının      ılımlılık     İnsanoğlu      ibadetler      içerisi      ilköğrenim ikilemek       ilişkiler     Jeologlar      jeologun      jeoloji     jeofizik      jeneratör    jenerikler   Kafiyeden      kahverengi       kalorifer      kanatlanmak      karakterli     karıştırmak    Limonata     lahanalar      lokantacı     leblebici      lavantalar       limitsizler     Maddecilik manilerden     mevsimlerin     medeniyet     menülerin     merhametli     Narenciye nüfuslarda      nasırlarda      nerelerde     niyazlarda     Oradaki     Osmaniye     oburların okumadan      odununu     okumamış    Öbürleri      öğrenmeyi      ölçekleme      örüntüsü öğrenmeler     öğrenilen     Paketleme     paraları     parçacığı     patlamalı      patlıcanlar pırasalar     Radyasyonu      rasathane      rehineler      resimdeki      rakamlardan renklilerden     Sabunları      sadakalar      sahibini       salatalık      samimiyet      sayfalardan     Şablonları     şahısları      şakayıklar      şarküteri      şehirlerde      şikayetçi     Tabakalar tercümanlık      tamlayanlar      tavşankanı     tekerleri      teleskoplar    Unutulmuş uygulama      uykuculuk     usturalar      uyarıcılar      uykusuzluk     Üniteler       üstünlükler üzüntüden     üzerine     üzerimize      üzüntüler     Varoluşlar     vaziyetler      verilerden vazifeler      verimlilik       vesikalık     Yabancılar      yumurtalar      yanıtlama      yapabilen yapamayan     yakınmayın     Zaferlere     zamanların     zararlılar      zelzeleler     zıbınları zamirleri     Dokunduğu      uçurtmalar      oyuncakçı     Çinlilerin      okulların       kahkahalar     Ağabeyim      batışını      ayırırım      İsimleri     sorumluluk      adaletli     Boşlukları doldurunuz      üzerinde      Arkasında      gökyüzünde       fidanların     Büyümesi       portakalı      haftaları    Dolunaya      kültürümüz      çalışması     Boyayınız      görseldeki boyamaya     Pamukkale      Anıtkabir      manastırı     Tekerleme      bıraksana      Çanakkale   Akşamları       şarkımızı       arkadaşlar     Karnabahar     Brokoli      Salatalık     Dereotu    Mandalina      Semizotu     Avakado     Frambuaz      Tiramisu      Çanakkale\nOsmaniye      Kırıkkale      Eskişehir       Kırklareli       Kastamonu        Gaziantep      Adıyaman Diyarbakır      Gümüşhane     Lüleburgaz     Şanlıurfa     İnebolu     Ortahisar     Akçaabat\nÇarşıbaşı     Beylikdüzü     Ümraniye     Kasımpaşa      Muradiye      Reşadiye      Kocaeli\nİskenderun      Zeytinburnu      Eyüpsultan     Sancaktepe      Kağıthane      Etimesgut\nKeçiören      Çamlıdere      Macaristan     Moğolistan     İngiltere     Arnavutluk     Yunanistan\nBulgaristan      Arabistan     Avusturya     Afganistan     Kırgızistan     Ermenistan    Azerbaycan     Brezilya      Danimarka      Filipinler     Kolombiya     Madagaskar\nEndonezya     Kazakistan      Makedonya     Çabalamak      Tırmalamak     Saçmalamak\nHırpalamak     Zırvalamak      Yetiştirmek     Geciktirmek      Acındırmak      Arındırmak Ayıplamak     Sıkıştırmak     Çalıştırmak      Yuvarlamak      Yudumlamak      Hazırlamak\nSakındırmak     Kurcalamak      Sinirlenmek      Öfkelenmek      Pazarlamak     Geçiştirmek\nAlıştırmak     Çözümlemek      Azarlamak     Barıştırmak      Araştırmak      Kazandırmak\nKanıtlamak     İspatlamak     İçerlemek     Taahhütlü     Mesafeli     Marifetli      Yetenekli\nBecerikli      Sadakatli      Kademeli     İadeli     Faturalı     Müsabaka     Karşılaşma    Zanaatkar     Sinemacı     Mesuliyet     Meşguliyet     Biyografi     Kardiyolog     Dahiliye\nHariciye     Edebiyat     Matematik      Geometri     Veresiye     Bağışlama      Doğaçlama\nAsabiyet     Asimetrik     Sistematik     Mücadele     Münakaşa     Müdafaa      Müdahale\nMünazara     Mukabele      Müracaat" },
      { "title": "Part 5", "content": "bakabilirim barışseverlik battaniyeler belediyeler benzeşmeleri bileşikleri cumhuriyetçi cumhuriyetler ciddiyetsizlik cezalandırmak cenazedeki çalışabilir çekimlerimden çingenelerden çevirmemeyi çikolatalar çekirdekçiler daireleri değerlendirmek değerlendirir desenlerini dosyalamamak duygusallıklar ebeveynlerden efendileri egemenlikler empatileri enerjisinin erişilemez faktöriyelden felsefeciler fırtınalarda fikirlerimiz farkındalıklar Galatasaray galaksilerden garantilemek geliştirmeler gerçekleşmeler gezegenlerden hâkimiyetler hanımefendi hatıralarda havacılıklar hazırlıksızlık hediyelikler hukukumuzda ibadethane ideoloji işletmecilik insanlarından isimlendirmek işaretlemek jeologlardan jiletlerinden jürilerinin jakuzideki jeofizikten jölelilerden kafiyelerden kahverengiler kaldırımlardan karikatürler kategoriye kendilerini   limonatalar lokantacılık lalelideki lambalardaki leblebiciler leyleklerine milliyetçilik mahkemelerde makineliler matematikçi medeniyetler memnuniyetle nesnelerimiz neredekiler narenciyeler nakışlarımız niyetlerimiz okunabilir omurgalılar olağanüstü otomobiller ortaöğrenim optimizasyon öbürlerini öğrenilmeyen örüntüleri ölçeklemeli ötekileri paketlemeler patlamalardan pencerelerde periyotlarda permütasyonlar politikayı rasathaneler rehinelerden reçetelerde rahatsızlıklar reçellerinden rastlantısallar salatalıklar sabunlamamak sayıklamalar sayılarından sertifikalı sözcüklerimiz şablonlarının şahıslarının şartnamelerde şekillendirmek şakalaşmalar şıklardakiler tahterevalli tadilatları tabanlarına tamlayanının tarayıcının tekerleklerin    umumiyetle uzaylılardan uzaklıklardan uzantılarla uğursuzluklar Uygurlulardan   ünitelerden üniformalı üzüntülerin üçkağıtçılık ümitlilerden üçlülerdeki vejetaryenlik vekaletname vesikalardan verimlilikten vakitsizlikten vapurlardaki yazılımlara yemeklerimiz yumurtaları yönetimleri yükseköğretim yenilemeler zamirlerini zikretmemeni zayıflıktandır zeminlerdeki zamanlardaki zihinlerimiz Havaalanı Olağanüstü Devedikeni Ateşböceği Yalıçapkını Akşamüzeri Açıköğretim İkiyüzlülük      Uyurgezerlik Akşamsefası Denizanası Vişneçürüğü Hanımefendi Öğretmenevi       Kayınvalide Sıkıyönetim Civanperçemi İmambayıldı Seyahatname arındırmak     aşılamak alıştırmak buruşturmak bocalamak ikilemek kanatlanmak karıştırmak     Çabalamak Tırmalamak Saçmalamak Hırpalamak Zırvalamak Yetiştirmek Geciktirmek      Acındırmak Arındırmak Ayıplamak Sıkıştırmak Çalıştırmak  Yuvarlamak Yudumlamak      Hazırlamak Sakındırmak Kurcalamak Sinirlenmek Öfkelenmek Pazarlamak     Geçiştirmek Alıştırmak Çözümlemek Azarlamak Barıştırmak Araştırmak Kazandırmak      Kanıtlamak İspatlamak İçerlemek" },
      { "title": "Part 6", "content": "Bir ve olmak bu için o ben demek çok yapmak ne gibi daha almak var kendi gelmek ile vermek ama sonra kadar yer en insan değil her istemek yıl çıkmak görmek gün biz gitmek iş şey ara ki bilmek zaman yağ çocuk bakmak çalışmak içinde büyük yok başlamak yol kalmak neden siz konu yapılmak iyi kadın ev ise diye bulunmak söylemek göz gerekmek dünya baş durum yan geçmek sen onlar yeni önce başka hayır orta su girmek ülke yemek hiç bile nasıl bütün karşı bulmak böyle yaşamak düşünmek aynı hiç iç ancak kişi bunlar veya ilk göre ön son biri şekil önemli yüz hem göstermek etmek alt getirmek kullanmak çünkü taraf şimdi adam onun diğer artık üzerinde ses hep doğru durmak kız tüm çekmek konuşmak para anlamak anne az bazı baba hayat sadece küçük fazla bilgi an sormak bunun öyle yine sağlamak sonuç kullanılmak dış at ad yani süre dönmek açmak oturmak anlatmak bırakmak hemen saat yaş sorun devlet sahip sıra yazmak ay atmak tutmak bunu olay düşmek duymak söz güzel sevmek biraz zor çıkarmak şu koymak tek sistem birlikte verilmek kim alınmak genç kapı kitap üzerine burada gece alan işte beklemek uzun hiçbir bugün dönem arkadaş ürün şekil önemli hem göstermek etmek getirmek kullanmak aile okumak erkek herkes güç gerçek tam ilgili ilişki çevre eski aramak yaşam halk sokak yakın bey tarih özellik bölüm özel akıl kimse pek eğer gerek özellikle anlam yüksek banka kez ayak taşımak geri toplum araç madde tür karar görülmek hava sayı farklı grup ada biçim oluşmak haber ayrıca gelen birkaç soru arka kazanmak yazı okul açık öğrenmek sürmek dil şirket kaynak bitmek program renk açılmak hak inanmak çalışma açı parça oluşturmak tabii değer tanımak yapı doktor gelir görev amaç bölge film üzere müşteri zaten telefon eğitim deniz ikinci kalkmak hatta etki gelişmek geçen araba ağız duygu uygulamak hâlâ örnek izlemek derece mümkün şöyle duvar sanat ana hastalık öğrenci televizyon yöntem masa takım üst kafa müzik ayrılmak enerji üniversite türlü can rağmen mümkün kısım sürekli sağlık çeşitli bundan hissetmek oysa sabah internet teknik dışarı merkez ortam yerine düzey köy yönetim vücut düşünce milyon oynamak değişmek temel yaratmak sanmak ulaşmak geçirmek kurmak fakat ışık içmek artmak yeniden işlem kısa kolay hangi oran aslında" },
      { "title": "Part 7", "content": "Orada dikkat uzak bilgisayar gelecek görünmek oğul dinlemek uygun lira üretim dakika unutmak böylece kötü aşağı cevap yatmak toprak isim akşam araştırma götürmek katılmak yoksa kurulmak ödemek sanki kan hasta şehir inmek sunmak bilinmek hafta trafik hesap otomobil yabancı davranış mutfak kent bazen belli ayrı fiyat hakkında kaldırmak kol yalnız hazırlamak cam sonunda yavaş geri gerekli önem hoca yanlış varlık art ilgi sana satış içeri doğal ekonomik acı hayır korumak kat ekonomi genel belirtmek fotoğraf hayvan savaş mavi mal saç kaybetmek kalan değiştirmek gerçekten sayfa teknoloji kurum sektör geniş kağıt koku sağ sıcak yüzyıl cadde Pazar sürdürmek kullanım sınıf aşk doğmak ağır tekrar güneş sigara ağaç kelime bina eş kaçmak parti yatak yazar kulak öğretmen sebep sol peki edat yüzden anlaşılmak varmak gülmek kural satmak şiir göndermek başarı firma hükümet kalp kesmek şart hız köşe vurmak model balık piyasa görüş bura hazırlanmak miktar meydan ölçü seçmek uygulanmak bahçe sevgi ekmek boyunca koşmak dolu kuruluş sayı korkmak yardım karşılaşmak malzeme hoş köpek ünlü büyümek dolaşmak oldukça üstelik yaşanmak beyaz istek öte denmek kardeş çekilmek nerede çalmak izin korku meslek polis açıklamak fikir hızlı pencere uğraşmak taş ateş fark yetmek kimi koşul mahalle mutlaka tane üretmek üstüne dayanmak ince ortak tip insan görüntü ders başkan karşılık kurtulmak numara defa edilmek batı sinema değişik hedef uyumak dost yanmak anlayış asıl basmak kenar kontrol çevirmek din güçlü henüz plan beyin elektrik üstünde sağlanmak söylenmek çizgi üye cilt ruh sevgili yaklaşmak süreç bakış bilim ifade ileri beden hatırla kaza iyice dağ kapatmak adım ciddi çözüm etkilemek fiil belediye gelişme seçim ağlamak bağlı kavram artırmak faaliyet zarar derin salon çeşit kesilmek seyretmek birden içermek sayılmak toplamak aşmak bağırmak sorumluluk davranmak mektup soğuk canlı makine yararlanmak yaşlı sıfat boş acaba maç yönetici getirilmek metre tutulmak kalite değişiklik bitki ilaç kredi yasa imkan ceza incelemek top uzman doldurmak kanal uymak yıllık dolayısıyla yazılmak ait parmak saymak atılmak belirlemek normal hele ilke kırmızı rol şarkı eleman hazır benzemek boy günlük politika suç sahne sokmak adet koltuk kurtarmak sanatçı uzanmak aşama eklemek orman ayırmak düzen faiz genellikle hikaye hücre ora roman vergi yakmak ağabey basın destek giymek hata sınır birlik eser karşılamak yarı yeterli birey karanlık otobüs sanayi bebek vatandaş bakan kere millet reklam yükselmek boyut dergi enflasyon sosyal geçmiş toplantı gazeteci" },
      { "title": "Part 8", "content": "inanç nitelik üzeri bitirmek gerçekleşmek giriş rahat toplam beraber dükkan gizli benzer deri dönüşmek mücadele problem servis tedavi yeşil bakanlık uyumak yıllık mağaza yazılmak ait parmak saymak normal ilke kırmızı şarkı eleman hazır benzemek bir şey hoca boy kilo günlük politika suç sahne adet koltuk kurtarmak sanatçı uzanmak aşama eklemek ayırmak düzen faiz genellikle hikaye hücre roman vergi yakmak ağabey basın destek baskı tepki cümle dilemek özgürlük kimlik üçüncü belirlenmek ilginç sürücü süt yakalamak eşya uluslararası aday milyar sağlıklı tavır toplumsal yayın toplanmak yatırım hafif karışmak tehlike daire fırsat işlemek karıştırmak öykü tamamen uçak yanıt evlenmek burun çıkar elbette işçi işletme kısaca mağaza medya yüzünden artış çıkarılmak sigorta yaz yürek belge çaba demokrasi tuz çağ düşük etraf hızla olanak öldürmek öteki bozulmak ilgilenmek meyve takılmak tatlı bacak değişim kanun rüzgar Cumhuriyet geliştirmek azalmak bağlamak iletişim müdür otel yayınlanmak laf ticaret örgüt yaptırmak cihaz boyun denge kahve kas meclis öteki uğraşmak adres alışveriş güven marka yaprak yaptırmak yarar yayılmak akmak çizmek düşünülmek gönül hayal ilerlemek şarap yukarıda altın düzenlemek sunulmak temiz vitamin ek geç yumurta aşırı eylem istemek kesin birim istemek kapanmak güvenlik hukuk kılmak modern okur talep yoğun asker basit denilmek gaz alışveriş bilinç uygulama üretilmek beyan besin dün görüşmek yaklaşık çerçeve lazım mevcut tüketici uzanmak uzatmak yönelik bağlanmak neredeyse abla çiçek hepsi saygı ücret yetenek kilo paylaşmak sert çay gider kesin zengin asla" },
      { "title": "Part 9", "content": "Bumbıl  basübadelmevt çavşırı çilemek dilhun feveran haddizatında hissikablelvuku hodbin meyus müşkülpesent perdebirun tecessüs tufeyli tumturak ülger deryadil lalettayin haslet nefaset mültefit bedbin perestiş merdümgiriz şikemperver efsunkar munis feriştah canhıraş mütevellit münferit mamafih vakıf hercai vaveyla girift hemdem sirayet nazenin amiyane bilmukabele diğerkam  velhasıl meymenet meymenetsiz lafügüzaf mutabık tahayyül payidar mukadderat beynelminel müteşekkir namütenahi beyhude alaya alavurt alengirli öznel ödün önayak öncül pohpohlamak polemik panorama paye prova pozitif propaganda pragmatik presentabl rağbet reaksiyon rehavet realist radikal rötuş ramak riyakar sait sebat seans soğukkanlı sekte serzeniş simge şablon şairane şifahen tasdik tahsis tamah tasarı tekdüze tekzip tutarlılık tümce tümel ukde umde umumi umacı ulak ulvi üleştirme ülfet ünsiyet vahim yadsımak yazınsal yeğlemek zemberek zembil zeval zula züğürt zürriyet ekarte elalem epik epope erbap erinç ego eğreti ekol empoze etik eyyam evkaf eza ezcümle faal esame fuaye Fulya fenomen gaddar galatımeşhur galat gıpta göreceli günaşırı güdüm gına gırla gıyaben habbe habis hegemonya hunhar hususi helecan ironi ırsi diyet idrak imtiyaz işlev ivedi kabare kanı klişe laçka lafa yazan lafıgüzaf mabeyn mebde muaf muasır muayyen mübalağa naçar naçiz nadan neşretmek nüans nemene oratoryo olgu okuntu ölçüt öykünme adaptasyon acar absürt alegori amade alenen analiz anafor anekdot azami asgari anonim aşikar alelade akıcı arı ati basma kalıp burjuva biçem belirtke bağlam bayağı bengü Bergüzar bohem cengâver cenk cebren cedit celep Celil celse cehil cafcaflı caka celalle yenmek çağdaş çuvallamak çaçaron çalakalem çeşni çığırtkan debdebeli debelenmek deformasyon deforme dududilli dumur demagoji devinim dingin doktrin dönüt doğaçlama ebat ebedi ebru ebruli ecnebi edevat edim editör efemine efsun ehil açıklık adaptasyon akıcılık aktüel alegorik anaç antoloji bahtiyar betimleme biçim bilinç biyografi böbürlenmek bulgu çevirmen dağarcık deforme didaktik doğallık duruluk duyarlılık duyu duyuş düş düşünsel editör eleştiri eleştirmen estetik evrensel fantastik fantezi folklor gerçeküstü güncel içgüdü içtenlik ikilem ileti imbik imge irdelemek izlenim kanı karakter kaygı kesit kuram kurgu kurmaca lirik mihnet mistik miskin nesnel nostalji nüfus olgu ölçüt özeleştiri özgü özgünlük özgülük özümsemek özveri realite sağduyu salt saptamak salt sezgi sürtmek şematik tema terim terkip tutku tutum tümce üslup varsayım yazın yozlaşma zanaat" }
    ]
  }
];

// window’a bağla (özellikle type="module" ise gerekli)
window.PRESETS = PRESETS;

/* ---- i18n yardımcıları (lang.js varsa onu kullanır) ---- */
function t(key, fallback) {
  try { return (window.I18N?.[state.lang]?.[key]) ?? fallback ?? ""; }
  catch { return fallback ?? ""; }
}
function setLang(lang) {
  state.lang = lang;
  localStorage.setItem("lang", lang);
  const dict = window.I18N?.[lang] || {};
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.getAttribute("data-i18n");
    if (dict[k]) el.textContent = dict[k];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const k = el.getAttribute("data-i18n-placeholder");
    if (dict[k]) el.setAttribute("placeholder", dict[k]);
  });
}

/* ---- kısayol ---- */
const $ = s => document.querySelector(s);

/* ---- Elements ---- */
const librarySelect   = $("#librarySelect");   // kategori
const fileInput       = $("#fileInput");
const partSelect      = $("#partSelect");      // part (kategoriye göre)
const urlInput        = $("#urlInput");
const fetchBtn        = $("#fetchBtn");
const customTextArea  = $("#customTextArea");
const customTextToggle= $("#customTextToggle");

const wpmSlider       = $("#wpmSlider");
const wpmValue        = $("#wpmValue");
const numWordsSlider  = $("#numWordsSlider");
const numWordsValue   = $("#numWordsValue");
const fontSizeSlider  = $("#fontSizeSlider");
const fontSizeValue   = $("#fontSizeValue");

const shuffleToggle   = $("#shuffleToggle");
const soundToggle     = $("#soundToggle");
const focusToggle     = $("#focusToggle");
const voiceGenderSel  = $("#voiceGender");

const themeToggle     = $("#themeToggle");
const langSelectHdr   = $("#langSelect");
const langSelectSet   = $("#langSelectSettings");

const playPauseBtn    = $("#playPauseBtn");
const resetBtn        = $("#resetBtn");
const fullBtn         = $("#fullBtn");
const exitFullBtn     = $("#exitFullBtn");

const display         = $("#display");
const progressBar     = $("#progressBar");

// Focus controls
const focusYRange = $("#focusYRange");
const focusYValue = $("#focusYValue");
const focusXRange = $("#focusXRange");
const focusXValue = $("#focusXValue");
const focusVertToggle = $("#focusVertToggle");

/* ---- Prefs ---- */
function savePrefs(){
  localStorage.setItem("flashReaderPrefs", JSON.stringify({
    wpm: state.wpm, numWords: state.numWords, fontRem: state.fontRem,
    shuffle: state.shuffle, tts: state.tts, focus: state.focus,
    voiceGender: state.voiceGender, theme: state.theme,
    focusY: state.focusY, focusX: state.focusX, focusVert: state.focusVert
  }));
}
function loadPrefs(){
  try{
    const p = JSON.parse(localStorage.getItem("flashReaderPrefs")||"{}");
    Object.assign(state, p);
  }catch(e){}
  const stTheme = localStorage.getItem("theme"); if (stTheme) state.theme = stTheme;
  const stLang  = localStorage.getItem("lang");  if (stLang) setLang(stLang);
}

/* ---- Theme & focus CSS vars ---- */
function setTheme(mode){
  state.theme = mode;
  document.body.classList.toggle("dark", mode === "dark");
  themeToggle && (themeToggle.checked = mode === "dark");
  localStorage.setItem("theme", mode);
}
function applyFocusVars(){
  document.documentElement.style.setProperty("--focus-y", state.focusY + "%");
  document.documentElement.style.setProperty("--focus-x", state.focusX + "%");
}

/* ---- Text utils ---- */
function wordsFromText(txt){
  const clean = (txt||"").replace(/\s+/g," ").replace(/[\u200B-\u200D\uFEFF]/g,"").trim();
  return clean ? clean.split(" ") : [];
}

/* ---- Display ---- */
function updateDisplay(){
  if(state.idx < 0) state.idx = 0;
  const start = state.idx;
  const end = Math.min(state.idx + state.numWords, state.words.length);
  display.textContent = state.words.slice(start, end).join(" ") || "";
  progressBar.style.width = state.words.length ? `${(end/state.words.length)*100}%` : "0%";
}

/* ---------- TTS (TR/EN algısı + isimden cinsiyet + fallback) ---------- */
function detectLangFromText(t=""){
  const tr = (t.match(/[çğıöşüİı]/gi)||[]).length;
  const en = (t.match(/[a-z]/gi)||[]).length;
  if (tr > 3 && tr > en/6) return "tr";
  return state.lang === "en" ? "en" : "tr";
}
function getVoicesReady(){
  return new Promise(res=>{
    const v = speechSynthesis.getVoices();
    if (v.length) return res(v);
    const id = setTimeout(()=>res(speechSynthesis.getVoices()), 800);
    speechSynthesis.onvoiceschanged = () => { clearTimeout(id); res(speechSynthesis.getVoices()); };
  });
}
function pickVoice(voices, wantGender="female", wantLang="tr"){
  let cand = voices.filter(v => (v.lang||"").toLowerCase().startsWith(wantLang));
  if (!cand.length) cand = voices.slice();
  const femaleRE = /female|woman|zira|filiz|salli|google.*(female|woman)|kadın/i;
  const maleRE   = /male|man|männ|adam|erkek|google.*(male|man)|alperen|ali|ahmet/i;
  const re = wantGender === "female" ? femaleRE : maleRE;

  let pick = cand.find(v => re.test(v.name));
  if (!pick) pick = cand.find(v => /google|onecore|natural|neural/i.test(v.name));
  if (!pick) pick = cand[0];
  if (!pick) pick = voices[0];
  return pick;
}
async function speak(text, gender="female"){
  if (!("speechSynthesis" in window)) return;
  try{
    window.speechSynthesis.cancel();
    const voices = await getVoicesReady();
    const langGuess = detectLangFromText(text);
    const u = new SpeechSynthesisUtterance(text);
    u.voice = pickVoice(voices, gender, langGuess);
    u.rate  = 0.9;
    speechSynthesis.speak(u);
  }catch(e){}
}

/* ---- Playback ---- */
function stepOnce(){
  if (!state.playing) return;
  if (state.idx >= state.words.length){ pause(); return; }
  updateDisplay();
  if (state.tts && state.wpm <= 60 && state.numWords === 1){
    speak(display.textContent, state.voiceGender);
  }
  state.idx += state.numWords;
  const msPerWord = 60000 / state.wpm;
  state.timer = setTimeout(stepOnce, msPerWord);
}
function play(){
  if (!state.words.length){
    const base = customTextToggle?.checked ? customTextArea.value : state.rawText;
    if (!base?.trim()) return;
    const arr = wordsFromText(base);
    state.words = state.shuffle ? shuffleArray(arr) : arr;
    state.idx = 0;
  }
  state.playing = true;
  const startText = t("start","Başlat");
  playPauseBtn.textContent = startText.includes("Başlat") || startText.includes("Start")
    ? (state.lang==="en"?"Pause":"Duraklat")
    : startText;
  stepOnce();
}
function pause(){
  state.playing = false;
  clearTimeout(state.timer);
  playPauseBtn.textContent = t("start","Başlat");
}
function reset(){ pause(); state.idx = 0; updateDisplay(); }
function shuffleArray(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

/* ---- URL Fetch (CORS-safe) ---- */
async function fetchURLContent(url){
  const clean = (url||"").trim();
  if(!clean) throw new Error("URL boş.");
  const withoutProto = clean.replace(/^https?:\/\//i, "");
  const jina = `https://r.jina.ai/http://${withoutProto}`;
  try{
    const t = await (await fetch(jina)).text();
    if (t && t.trim().length > 50) return t;
  }catch(e){}
  try{
    const allorigins = `https://api.allorigins.win/raw?url=${encodeURIComponent(clean)}`;
    const html = await (await fetch(allorigins)).text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const ps = [...doc.querySelectorAll("p")].map(p=>p.textContent.trim()).filter(Boolean);
    if (ps.length) return ps.join("\n\n");
    return (doc.body?.innerText||"").trim();
  }catch(e){}
  try{
    const res = await fetch(clean);
    if (!res.ok) throw new Error("HTTP "+res.status);
    return await res.text();
  }catch(e){
    throw new Error("CORS veya ağ hatası.");
  }
}
function readFileAsText(file){
  return new Promise((resolve,reject)=>{
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result||""));
    fr.onerror = reject;
    fr.readAsText(file, "utf-8");
  });
}

/* ---- PRESETS UI (kategori + partSelect) ---- */
function fillCategories(){
  if (!librarySelect) return;
  librarySelect.innerHTML = ""; // temizle

  // placeholder
  const ph = document.createElement("option");
  ph.value = "";
  ph.textContent = "Kategori seç…";
  ph.disabled = true;
  ph.selected = true;
  librarySelect.appendChild(ph);

  // kategorileri ekle
  const list = Array.isArray(window.PRESETS) ? window.PRESETS : [];
  list.forEach((cat, ci)=>{
    const opt = document.createElement("option");
    opt.value = String(ci);
    opt.textContent = cat?.category || `Kategori ${ci+1}`;
    librarySelect.appendChild(opt);
  });

  // partSelect'i başlangıçta gizle/temizle
  if (partSelect){
    partSelect.classList.add("d-none");
    partSelect.innerHTML = "";
  }

  // Sadece 1 kategori varsa otomatik seç ve change tetikle
  if (list.length === 1) {
    librarySelect.selectedIndex = 1;        // 0 = placeholder, 1 = ilk (ve tek) kategori
    librarySelect.dispatchEvent(new Event("change"));
  }
}


function fillPartsForCategory(ci){
  const cat = window.PRESETS?.[ci];
  if (!cat) return;
  partSelect.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.textContent = "Part seç…";
  placeholder.disabled = true; placeholder.selected = true;
  partSelect.appendChild(placeholder);

  (cat.texts||[]).forEach((t, pi)=>{
    const opt = document.createElement("option");
    opt.value = String(pi);
    opt.textContent = t.title || `Part ${pi+1}`;
    partSelect.appendChild(opt);
  });
  partSelect.classList.remove("d-none");
}

/* ---- Events ---- */
function bindEvents(){
  // Kategori → Part listesi
  librarySelect?.addEventListener("change", ()=>{
    const ci = parseInt(librarySelect.value,10);
    fillPartsForCategory(ci);
    state.rawText=""; state.words=[]; state.idx=0; updateDisplay();
  });

  // Part seçildiğinde metni yükle (+ textarea’ya yaz ve görünür yap)
  partSelect?.addEventListener("change", ()=>{
    const ci = parseInt(librarySelect.value,10);
    const pi = parseInt(partSelect.value,10);
    const text = window.PRESETS?.[ci]?.texts?.[pi]?.content || "";
    state.rawText = text;
    state.words = []; state.idx=0;

    if (customTextArea){
      customTextArea.value = text;
      if (customTextToggle){
        customTextToggle.checked = true;
        customTextArea.style.display = "block";
      }
    }
    updateDisplay();
  });

  // Dosya
  fileInput?.addEventListener("change", async ()=>{
    const f = fileInput.files?.[0]; if(!f) return;
    const txt = await readFileAsText(f);
    customTextArea.value = txt;
    customTextToggle.checked = true; customTextArea.style.display = "block";
    state.rawText = txt; state.words=[]; state.idx=0; updateDisplay();
  });

  // Özel metin toggle + input
  const applyCustom = ()=>{
    customTextArea.style.display = customTextToggle.checked ? "block" : "none";
    if (customTextToggle.checked){ state.rawText = customTextArea.value; state.words=[]; state.idx=0; updateDisplay(); }
  };
  customTextToggle?.addEventListener("change", applyCustom);
  customTextArea?.addEventListener("input", ()=>{
    if (customTextToggle.checked){ state.rawText = customTextArea.value; state.words=[]; state.idx=0; updateDisplay(); }
  });

  // URL
  fetchBtn?.addEventListener("click", async ()=>{
    const url = urlInput?.value || "";
    fetchBtn.disabled = true;
    fetchBtn.textContent = (state.lang==="en" ? "Loading..." : "Yükleniyor...");
    try{
      const text = await fetchURLContent(url);
      customTextArea.value = text;
      customTextToggle.checked = true; customTextArea.style.display = "block";
      state.rawText = text; state.words=[]; state.idx=0; updateDisplay();
    }catch(e){
      alert((state.lang==="en" ? "Failed to fetch content. " : "İçerik alınamadı. ") + (e.message||""));
    }finally{
      fetchBtn.disabled = false;
      fetchBtn.textContent = t("btn_fetch","URL içeriğini ekle");
    }
  });

  // Sliders
  wpmSlider?.addEventListener("input", ()=>{ state.wpm=parseInt(wpmSlider.value,10); wpmValue.textContent=state.wpm; savePrefs(); });
  numWordsSlider?.addEventListener("input", ()=>{ state.numWords=parseInt(numWordsSlider.value,10); numWordsValue.textContent=state.numWords; savePrefs(); });
  fontSizeSlider?.addEventListener("input", ()=>{ state.fontRem=parseFloat(fontSizeSlider.value); fontSizeValue.textContent=state.fontRem; display.style.fontSize=state.fontRem+"rem"; savePrefs(); });

  // Ayarlar
  shuffleToggle?.addEventListener("change", ()=>{
    state.shuffle = shuffleToggle.checked;
    if (state.rawText){
      const base = customTextToggle.checked ? customTextArea.value : state.rawText;
      const arr = wordsFromText(base);
      state.words = state.shuffle ? shuffleArray(arr) : arr;
      state.idx=0; updateDisplay();
    }
    savePrefs();
  });
  soundToggle?.addEventListener("change", ()=>{ state.tts = soundToggle.checked; if(!state.tts) window.speechSynthesis?.cancel(); savePrefs(); });
  focusToggle?.addEventListener("change", ()=>{ state.focus = focusToggle.checked; document.body.classList.toggle("focus-enabled", state.focus); savePrefs(); });
  voiceGenderSel?.addEventListener("change", ()=>{ state.voiceGender = voiceGenderSel.value; savePrefs(); });

  // Focus Y/X
  focusYRange?.addEventListener("input", ()=>{ state.focusY=parseInt(focusYRange.value,10); focusYValue.textContent=state.focusY; applyFocusVars(); savePrefs(); });
  focusXRange?.addEventListener("input", ()=>{ state.focusX=parseInt(focusXRange.value,10); focusXValue.textContent=state.focusX; applyFocusVars(); savePrefs(); });
  focusVertToggle?.addEventListener("change", ()=>{ state.focusVert = focusVertToggle.checked; document.body.classList.toggle("focus-vertical-enabled", state.focusVert); savePrefs(); });

  // Tema
  themeToggle?.addEventListener("change", ()=>{ setTheme(themeToggle.checked ? "dark" : "light"); savePrefs(); });

  // Dil (header + settings senkron)
  function onLangChange(e){
    const lang = e.target.value;
    setLang(lang);
    langSelectHdr && (langSelectHdr.value=lang);
    langSelectSet && (langSelectSet.value=lang);
  }
  langSelectHdr?.addEventListener("change", onLangChange);
  langSelectSet?.addEventListener("change", onLangChange);

  // Kontroller
  playPauseBtn?.addEventListener("click", ()=>{ state.playing ? pause() : play(); });
  resetBtn?.addEventListener("click", reset);
  fullBtn?.addEventListener("click", ()=>{ document.body.classList.add("fullscreen"); fullBtn.classList.add("d-none"); exitFullBtn.classList.remove("d-none"); });
  exitFullBtn?.addEventListener("click", ()=>{ document.body.classList.remove("fullscreen"); exitFullBtn.classList.add("d-none"); fullBtn.classList.remove("d-none"); });

  // Kısayollar
  document.addEventListener("keydown", (e)=>{
    if (e.code==="Space"){ e.preventDefault(); state.playing ? pause() : play(); }
    if (e.code==="ArrowUp"){ e.preventDefault(); fontSizeSlider.value = Math.min(80, parseFloat(fontSizeSlider.value)+0.2); fontSizeSlider.dispatchEvent(new Event("input")); }
    if (e.code==="ArrowDown"){ e.preventDefault(); fontSizeSlider.value = Math.max(1, parseFloat(fontSizeSlider.value)-0.2); fontSizeSlider.dispatchEvent(new Event("input")); }
    if (e.code==="ArrowRight"){ e.preventDefault(); wpmSlider.value = Math.min(1000, parseInt(wpmSlider.value,10)+10); wpmSlider.dispatchEvent(new Event("input")); }
    if (e.code==="ArrowLeft"){ e.preventDefault(); wpmSlider.value = Math.max(10, parseInt(wpmSlider.value,10)-10); wpmSlider.dispatchEvent(new Event("input")); }
  });
}

/* ---- init ---- */
function init(){
  loadPrefs();

  // Dil
  const prefLang = localStorage.getItem("lang") || (navigator.language||"tr").slice(0,2);
  setLang(prefLang==="en" ? "en" : "tr");
  langSelectHdr && (langSelectHdr.value = state.lang);
  langSelectSet && (langSelectSet.value = state.lang);

  // Tema
  setTheme(state.theme || "light");

  // UI yansıt
  wpmSlider && (wpmSlider.value = state.wpm); wpmValue && (wpmValue.textContent=state.wpm);
  numWordsSlider && (numWordsSlider.value = state.numWords); numWordsValue && (numWordsValue.textContent=state.numWords);
  fontSizeSlider && (fontSizeSlider.value = state.fontRem); fontSizeValue && (fontSizeValue.textContent=state.fontRem);
  display.style.fontSize = state.fontRem+"rem";

  shuffleToggle && (shuffleToggle.checked = state.shuffle);
  soundToggle   && (soundToggle.checked   = state.tts);
  focusToggle   && (focusToggle.checked   = state.focus);
  voiceGenderSel&& (voiceGenderSel.value  = state.voiceGender);

  document.body.classList.toggle("focus-enabled", state.focus);
  document.body.classList.toggle("focus-vertical-enabled", state.focusVert);
  applyFocusVars();
  if (focusYRange){ focusYRange.value=state.focusY; focusYValue.textContent=state.focusY; }
  if (focusXRange){ focusXRange.value=state.focusX; focusXValue.textContent=state.focusX; }

  // Presetleri yükle (kategori → part)
  fillCategories();

  if (librarySelect?.options.length > 1) {
    librarySelect.selectedIndex = 1;
    fillPartsForCategory(0);
    if (partSelect?.options.length > 1) {
      partSelect.selectedIndex = 1;
      partSelect.dispatchEvent(new Event("change"));
    }
  }

  updateDisplay();
  bindEvents();
}
document.addEventListener("DOMContentLoaded", init);
