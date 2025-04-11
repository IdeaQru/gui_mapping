#include <WiFi.h>
#include <HTTPClient.h>
#include <math.h>

// WiFi Credentials
const char* ssid = "YOUR_WIFI_SSID"; // Ganti dengan nama WiFi Anda
const char* password = "YOUR_WIFI_PASSWORD"; // Ganti dengan password WiFi Anda

// Server Endpoint
const char* serverName = "http://192.168.1.100:3000/api/sensor"; // Ganti dengan IP server Anda

// Simulasi Data
float latitude = -7.370365;
float longitude = 112.897170;
float gyroX = 0;
float gyroY = 0;
float gyroZ = 0;

// Variabel untuk menyimpan posisi sebelumnya dan waktu sebelumnya
float prev_latitude = latitude;
float prev_longitude = longitude;
unsigned long prev_time;

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi!");

  prev_time = millis(); // Inisialisasi waktu sebelumnya
}

// Fungsi untuk menghitung jarak menggunakan rumus haversine (dalam kilometer)
float haversine(float lat1, float lon1, float lat2, float lon2) {
    const float R = 6371; // Radius bumi dalam km
    float dLat = radians(lat2 - lat1);
    float dLon = radians(lon2 - lon1);
    float a = sin(dLat / 2) * sin(dLat / 2) + cos(radians(lat1)) * cos(radians(lat2)) * sin(dLon / 2) * sin(dLon / 2);
    float c = 2 * atan2(sqrt(a), sqrt(1 - a));
    return R * c;
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    // Update data simulasi
    latitude += 0.0001 * sin(millis() / 1000.0);
    longitude += 0.0001 * cos(millis() / 1000.0);
    gyroX = round(10 * sin(millis() / 1000.0));
    gyroY = round(20 * cos(millis() / 1000.0));
    gyroZ = round(30 * sin(millis() / 2000.0));

    // Hitung waktu dan jarak untuk speed (km/h)
    unsigned long current_time = millis();
    float distance_km = haversine(prev_latitude, prev_longitude, latitude, longitude);
    float time_diff_hours = (current_time - prev_time) / (1000.0 * 3600.0); // Konversi ms ke jam
    float speed_kmh = distance_km / time_diff_hours;

    // Update posisi sebelumnya dan waktu sebelumnya
    prev_latitude = latitude;
    prev_longitude = longitude;
    prev_time = current_time;

    // Format data sebagai JSON
    String jsonData = "{";
    jsonData += "\"lat\":" + String(latitude) + ",";
    jsonData += "\"lng\":" + String(longitude) + ",";
    jsonData += "\"gyroX\":" + String(gyroX) + ",";
    jsonData += "\"gyroY\":" + String(gyroY) + ",";
    jsonData += "\"gyroZ\":" + String(gyroZ) + ",";
    jsonData += "\"speed\":" + String(speed_kmh);
    jsonData += "}";

    // Kirim data ke server
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");
    int httpResponseCode = http.POST(jsonData);

    if (httpResponseCode > 0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      Serial.println("Data sent: " + jsonData);
    } else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  } else {
    Serial.println("WiFi Disconnected");
  }

  delay(1000); // Kirim data setiap detik
}
