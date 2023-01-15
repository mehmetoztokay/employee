## Yapı Kredi Bankası `UI Development Challange`

### Hedef

Şirket çalışanlarının listelenebildiği, yeni çalışan ekleyebileceğimiz, silebileceğimiz ve mevcut çalışan üzerinde güncelleme yapmaya olanak sağlayan `React` uygulaması geliştirilmesi.<br>
Uygulamanın development mode da çalışması `UI Development Challange` kapsamında yeterlidir, deployment beklentisi bulunmamaktadır.<br>
Uygulamanın modern/güncel browserlarda görüntülenebilmesi yeterlidir.

### `npm run dev`

Uygulamayı development mode da başlatır.<br>
Görüntülemek için: [http://localhost:3000](http://localhost:3000)

UI uygulaması ile beraber, çalışan ve departmanların listelenebildiği Fake REST API ([json-server](https://github.com/typicode/json-server)) çalıştırır. <br>
[http://localhost:3004](http://localhost:3004)

Geliştirme esnasında bu API aracılığı ile çalışanları / departmanları listeleyebilir, silebilir, ekleyebilir ya da güncelleyebilirsiniz.

```
GET    /employees
GET    /employees/1
POST   /employees
PUT    /employees/1
PATCH  /employees/1
DELETE /employees/1
GET    /departments
```

### Örnek / Beklenen çalışan listeleme sayfası referansı

| Ad       |    Email     | Medeni Durum |      Departman       |     Güncelle      |     Sil      |
| -------- | :----------: | :----------: | :------------------: | :---------------: | :----------: |
| Ad Soyad | email adresi |  Evli/Bekar  | Çalışanın Departmanı | Güncelleme Butonu | Silme Butonu |

### Not

Proje kapsamında işinizi kolaylaştırabileceğini düşündüğünüz, ihtiyaç duyduğunuz herhangi bir teknolojiyi (React-FlexBox-Grid, redux, react-hooks, react-forms, react-bootstrap vb.) kullanmaktan çekinmeyin.
`UI Development Challange` projesinin işlevselliğini yitirmemesi için yaptığınız çalışmayı üçüncü kişilerle paylaşmamanızı rica ederiz.
