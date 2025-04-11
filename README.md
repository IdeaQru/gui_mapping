

# \# Panduan Lengkap Proyek Monitoring Kapal Cerdas

## Pendahuluan

Proyek ini bertujuan untuk membuat sistem monitoring kapal cerdas menggunakan ESP32, Node.js, dan visualisasi gyroscope berbasis web.

---

## Persiapan Awal

### Perangkat Keras:

1. **ESP32**
2. **Komputer/Laptop**
3. **Koneksi Internet**
4. **Sensor Gyroscope (Opsional)**

### Perangkat Lunak:

1. **Arduino IDE**
2. **Node.js**
3. **Python (untuk simulasi data)**

---

## Langkah-Langkah Implementasi

### A. Konfigurasi Backend Server

1. **Instal Node.js**:
    - Download dan instal Node.js dari [nodejs.org](https://nodejs.org).
2. **Buat File Backend**:
    - Buat file `server.js` dengan kode berikut:

```
const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.post('/api/sensor', (req, res) =&gt; {
  console.log(req.body);
  res.status(200).send('Data received');
});

app.listen(3000, () =&gt; console.log('Server running on port 3000'));
```

    - Jalankan server dengan perintah:

```
node server.js
```


---

### B. Simulasi Data dengan Python

1. **Instal Python dan Library**:
2. **Buat File Python**:

- Simpan kode berikut sebagai `send_data.py`:

```
import requests, time, math

URL = "http://localhost:3000/api/sensor"

def send_simulated_data():
    while True:
        latitude = -7.370365 + (0.0001 * math.sin(time.time()))
        longitude = 112.897170 + (0.0001 * math.cos(time.time()))
        gyroX = round(10 * math.sin(time.time()), 2)
        gyroY = round(20 * math.cos(time.time()), 2)
        gyroZ = round(30 * math.sin(time.time() / 2), 2)

        data = {"lat": latitude, "lng": longitude, "gyroX": gyroX, "gyroY": gyroY, "gyroZ": gyroZ}
        response = requests.post(URL, json=data)
        print(f"Sent: {data}")
        time.sleep(1)
send_simulated_data()
```


---

### C. Program ESP32

1. **Instal Arduino IDE**:

- Download dan instal Arduino IDE dari [arduino.cc](https://www.arduino.cc).

2. **Tambahkan ESP32 Board**:

- Di Arduino IDE, buka `File &gt; Preferences`.
- Tambahkan URL berikut di kolom `Additional Board Manager URLs`:

```
https://dl.espressif.com/dl/package_esp32_index.json
```


3. **Upload Program ke ESP32**:

- Gunakan kode `esp32_simulation.ino` di atas.
- Pastikan Anda mengganti SSID dan password WiFi.

---

### D. Visualisasi Web

1. **Buat File HTML**:

- Simpan kode berikut sebagai `index.html`:

```

&lt;html&gt;
  &lt;head&gt;&lt;title&gt;Monitoring Kapal&lt;/title&gt;&lt;/head&gt;
  &lt;body&gt;
    &lt;script src="https://cdn.babylonjs.com/babylon.js"&gt;&lt;/script&gt;
    &lt;script src="https://unpkg.com/leaflet@1/dist/leaflet.js"&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
```


2. **Jalankan Server Web**:

- Gunakan Node.js untuk menyajikan file statis.

---

## Pengujian Proyek

### Akses Website:

- Buka browser dan akses `http://localhost:3000`.


### Simulasi Data:

- Jalankan file Python atau program ESP32 untuk mengirimkan data.


### Verifikasi Output:

- Pastikan marker di peta bergerak sesuai data latitude dan longitude.
- Pastikan visualisasi gyroscope berputar sesuai data gyroscope.

---

## Penutup

Proyek ini memungkinkan monitoring kapal secara real-time dengan integrasi antara perangkat keras (ESP32), backend server (Node.js), dan antarmuka web.

# 

buat supaya di preview github menjadi tampilan yg menarik

Berikut adalah versi Markdown yang lebih menarik untuk tampilan di GitHub, termasuk gambar, tabel, dan struktur yang terorganisir:

---

## Smart Ship Monitoring Project

### **Pendahuluan**

Proyek ini bertujuan untuk membuat sistem monitoring kapal cerdas menggunakan **ESP32**, **Node.js**, dan **visualisasi gyroscope** berbasis web.

<p>
<img>
</p>
---

### **Persiapan Awal**

#### **Perangkat Keras**

- ESP32
- Komputer/Laptop
- Koneksi Internet
- Sensor Gyroscope (*Opsional*)


#### **Perangkat Lunak**

- Arduino IDE
- Node.js
- Python (untuk simulasi data)

---

### **Langkah-Langkah Implementasi**

#### **A. Konfigurasi Backend Server**

1. **Instal Node.js**:
    - Download dan instal Node.js dari [nodejs.org](https://nodejs.org).
2. **Buat File Backend**:
    - Buat file `server.js` dengan kode berikut:
```javascript
const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.post('/api/sensor', (req, res) =&gt; {
  console.log(req.body);
  res.status(200).send('Data received');
});

app.listen(3000, () =&gt; console.log('Server running on port 3000'));
```

3. Jalankan server dengan perintah:

```bash
node server.js
```


---

#### **B. Simulasi Data dengan Python**

1. **Instal Python dan Library**:

```bash
pip install requests
```

2. **Buat File Python**:
    - Simpan kode berikut sebagai `send_data.py`:
```python
import requests, time, math

URL = "http://localhost:3000/api/sensor"

def send_simulated_data():
    while True:
        latitude = -7.370365 + (0.0001 * math.sin(time.time()))
        longitude = 112.897170 + (0.0001 * math.cos(time.time()))
        gyroX = round(10 * math.sin(time.time()), 2)
        gyroY = round(20 * math.cos(time.time()), 2)
        gyroZ = round(30 * math.sin(time.time() / 2), 2)

        data = {"lat": latitude, "lng": longitude, "gyroX": gyroX, "gyroY": gyroY, "gyroZ": gyroZ}
        response = requests.post(URL, json=data)
        print(f"Sent: {data}")
        time.sleep(1)
send_simulated_data()
```

---

#### **C. Program ESP32**

1. **Instal Arduino IDE**:
    - Download dan instal Arduino IDE dari [arduino.cc](https://www.arduino.cc).
2. **Tambahkan ESP32 Board**:
    - Di Arduino IDE, buka `File &gt; Preferences`.
    - Tambahkan URL berikut di kolom `Additional Board Manager URLs`:

```
https://dl.espressif.com/dl/package_esp32_index.json
```

3. **Upload Program ke ESP32**:
    - Gunakan kode `esp32_simulation.ino` di bawah ini:
```cpp
#include &lt;WiFi.h&gt;
#include &lt;HTTPClient.h&gt;
#include &lt;math.h&gt;

const char* ssid = "YOUR_WIFI_SSID"; 
const char* password = "YOUR_WIFI_PASSWORD"; 

const char* serverName = "http://192.168.1.100:3000/api/sensor"; 

float latitude = -7.370365;
float longitude = 112.897170;
float gyroX = 0;
float gyroY = 0;
float gyroZ = 0;

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    latitude += 0.0001 * sin(millis() / 1000.0);
    longitude += 0.0001 * cos(millis() / 1000.0);
    gyroX = round(10 * sin(millis() / 1000.0));
    gyroY = round(20 * cos(millis() / 1000.0));
    gyroZ = round(30 * sin(millis() / 2000.0));

    String jsonData = "{";
    jsonData += "\"lat\":" + String(latitude) + ",";
    jsonData += "\"lng\":" + String(longitude) + ",";
    jsonData += "\"gyroX\":" + String(gyroX) + ",";
    jsonData += "\"gyroY\":" + String(gyroY) + ",";
    jsonData += "\"gyroZ\":" + String(gyroZ);
    jsonData += "}";

    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");
    int httpResponseCode = http.POST(jsonData);

    if (httpResponseCode &gt; 0) {
      Serial.println("Data sent: " + jsonData);
    }

    http.end();
  }

  delay(1000);
}
```

---

#### **D. Visualisasi Web**

1. Buat file HTML sebagai `index.html`:
```html

&lt;html&gt;
&lt;head&gt;&lt;title&gt;Monitoring Kapal&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;
&lt;script src="https://cdn.babylonjs.com/babylon.js"&gt;&lt;/script&gt;
&lt;script src="https://unpkg.com/leaflet@1/dist/leaflet.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
```

2. Jalankan server web menggunakan Node.js.

---

### **Pengujian Proyek**

| Langkah Pengujian | Deskripsi |
| :-- | :-- |
| **Akses Website** | Buka browser dan akses `http://localhost:3000`. |
| **Simulasi Data** | Jalankan file Python atau program ESP32 untuk mengirimkan data ke server backend Anda. |
| **Verifikasi Output** | Pastikan marker di peta bergerak sesuai data latitude dan longitude serta visualisasi gyroscope berputar sesuai data gyroscope. |

---

### Penutup

Proyek ini memungkinkan monitoring kapal secara real-time dengan integrasi antara perangkat keras (ESP32), backend server (Node.js), dan antarmuka web.

---


<div>⁂</div>

[^1]: https://pplx-res.cloudinary.com/image/upload/v1744388097/user_uploads/vasbycoOrgfUXWT/image.jpg

[^2]: https://docs.github.com/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax

[^3]: https://www.freecodecamp.org/news/github-flavored-markdown-syntax-examples/

[^4]: https://dev.to/danishzayan/creating-beautiful-markdown-files-in-github-5ga3

[^5]: https://gist.github.com/apaskulin/1ad686e42c7165cb9c22f9fe1e389558

[^6]: https://github.com/adam-p/markdown-here/wiki/markdown-cheatsheet

[^7]: https://github.com/microsoft/FluidFramework/wiki/Markdown-Best-Practices

[^8]: https://www.youtube.com/watch?v=QLta2MNjMMA

[^9]: https://google.github.io/styleguide/docguide/style.html

[^10]: https://www.hatica.io/blog/best-practices-for-github-readme/

[^11]: https://dev.to/thepiyushmalhotra/how-to-design-an-attractive-github-profile-readme-1ppg

[^12]: https://github.com/darsaveli/Readme-Markdown-Syntax

[^13]: https://docs.ed-fi.org/community/sdlc/code-contribution-guidelines/coding-standards/markdown-best-practices

[^14]: https://stackoverflow.com/questions/59619952/markdown-syntax-to-include-image-that-works-in-github-github-editor-preview-an

[^15]: https://github.com/DavidWells/advanced-markdown

[^16]: https://docs.github.com/en/contributing/writing-for-github-docs/using-markdown-and-liquid-in-github-docs

[^17]: https://github.com/yzhang-gh/vscode-markdown/issues/1254

[^18]: https://www.markdownguide.org/basic-syntax/

[^19]: https://github.com/mjbvz/vscode-github-markdown-preview-style

[^20]: https://github.com/orgs/community/discussions/16289

[^21]: https://docs.github.com/articles/about-writing-and-formatting-on-github

