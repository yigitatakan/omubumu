# Would You Rather - Hangisini Tercih Edersin?

Modern ve etkileşimli bir "Hangisini Tercih Edersin?" oyunu. Next.js App Router, Firebase Realtime Database ve Framer Motion kullanılarak geliştirilmiştir.

## Özellikler

- **Modern ve Responsive Tasarım**
  - Tailwind CSS ile geliştirilmiş şık arayüz
  - Her ekran boyutuna uyumlu tasarım
  - Glassmorphism efektleri

- **Gelişmiş Kullanıcı Deneyimi**
  - Akıcı animasyonlar ve geçişler (Framer Motion)
  - Rastgele soru sıralaması
  - Dinamik pozisyonlama ve renk değişimleri
  - Mobil dokunmatik optimizasyonu

- **Performans Optimizasyonları**
  - Next.js App Router ile hızlı sayfa yüklemeleri
  - Otomatik kod bölümleme
  - Görüntü optimizasyonu
  - SEO dostu yapı

- **Gerçek Zamanlı Özellikler**
  - Firebase Realtime Database ile anlık oy güncellemeleri
  - Yüzdelik hesaplamaları ve animasyonlu gösterim
  - Oylanan soruların takibi

## Teknolojiler

- **Frontend**
  - Next.js 13+ (App Router)
  - TypeScript
  - Tailwind CSS
  - Framer Motion

- **Backend & Veritabanı**
  - Firebase Realtime Database
  - Firebase Analytics

- **Diğer Araçlar**
  - ESLint
  - PostCSS
  - Google Analytics

## Kurulum

1. Repoyu klonlayın:
```bash
git clone https://github.com/yigitatakan/omubumu.git
cd omubumu
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env.local` dosyasını oluşturun ve Firebase bilgilerinizi ekleyin:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. Development sunucusunu başlatın:
```bash
npm run dev
```

5. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın

## Özellik Detayları

### Soru Mekanizması
- Rastgele soru seçimi
- Daha önce cevaplanmış soruların takibi
- Soru havuzunun tükenmesi durumunda otomatik sıfırlama

### Oylama Sistemi
- Anlık oy güncellemeleri
- Animasyonlu yüzde gösterimi
- Seçenek değiştirme engelleme

### Kullanıcı Arayüzü
- Mobil ve masaüstü için optimize edilmiş tasarım
- Karanlık/aydınlık mod desteği
- Dokunmatik ekran optimizasyonu

## SEO ve Performans

- Sayfa başlıkları ve meta açıklamaları
- Open Graph etiketleri
- Robots.txt ve sitemap.xml
- Google Analytics entegrasyonu
- Lighthouse skorları optimizasyonu

## Katkıda Bulunma

1. Bu repoyu forklayın
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için [LICENSE](LICENSE) dosyasına bakın.

## İletişim

Yiğit Atakan - [@yigitatakan](https://github.com/yigitatakan)

Proje Linki: [https://github.com/yigitatakan/omubumu](https://github.com/yigitatakan/omubumu)
