# Would You Rather - Hangisini Tercih Edersin?

Modern ve etkileşimli bir "Hangisini Tercih Edersin?" oyunu. Next.js, Firebase ve Framer Motion kullanılarak geliştirilmiştir.

## Özellikler

- Modern ve responsive tasarım
- Rastgele soru sıralaması ve pozisyonlama
- Akıcı animasyonlar ve geçişler
- Gerçek zamanlı oylama sonuçları
- Mobil uyumlu arayüz

## Teknolojiler

- Next.js 13
- Firebase Realtime Database
- Tailwind CSS
- Framer Motion
- TypeScript

## Kurulum

1. Repoyu klonlayın:
```bash
git clone https://github.com/yourusername/would-you-rather-tr.git
cd would-you-rather-tr
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyasını oluşturun ve Firebase bilgilerinizi ekleyin:
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

## Özellikler

- Her soru için iki seçenek
- Animasyonlu yüzde gösterimi
- Dinamik ekran bölünmesi
- Rastgele soru pozisyonları
- Gerçek zamanlı oy sayımı

## Katkıda Bulunma

1. Bu repoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik: Muhteşem özellik'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Bir Pull Request oluşturun

## Lisans

MIT Lisansı altında dağıtılmaktadır. Daha fazla bilgi için `LICENSE` dosyasına bakın.
