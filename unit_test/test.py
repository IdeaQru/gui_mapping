import requests
import time
import math

# URL endpoint server
URL = "http://localhost:3000/api/sensor"

# Fungsi untuk menghitung jarak menggunakan rumus haversine
def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Radius bumi dalam km
    dLat = math.radians(lat2 - lat1)
    dLon = math.radians(lon2 - lon1)
    a = math.sin(dLat / 2) ** 2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dLon / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

# Variabel untuk menyimpan posisi sebelumnya
prev_lat = -7.370365
prev_lon = 112.897170
prev_time = time.time()

# Fungsi untuk mengirimkan data simulasi
def send_simulated_data():
    global prev_lat, prev_lon, prev_time

    try:
        while True:
            # Data simulasi (latitude, longitude, gyroscope)
            latitude = -7.370365 + (0.0001 * math.sin(time.time()))  # Latitude tetap di sekitar laut Sidoarjo
            longitude = 112.897170 + (0.0001 * math.cos(time.time()))  # Longitude tetap di sekitar laut Sidoarjo

            gyro_x = round(10 * math.sin(time.time()), 2)  # Rotasi X
            gyro_y = round(20 * math.cos(time.time()), 2)  # Rotasi Y
            gyro_z = round(30 * math.sin(time.time() / 2), 2)  # Rotasi Z

            # Hitung waktu dan jarak untuk speed (km/h)
            current_time = time.time()
            distance_km = haversine(prev_lat, prev_lon, latitude, longitude)
            time_diff_hours = (current_time - prev_time) / 3600.0
            speed_kmh = round(distance_km / time_diff_hours, 2) if time_diff_hours > 0 else 0

            # Update posisi sebelumnya dan waktu sebelumnya
            prev_lat, prev_lon, prev_time = latitude, longitude, current_time

            # Format data sebagai dictionary
            data = {
                "lat": latitude,
                "lng": longitude,
                "gyroX": gyro_x,
                "gyroY": gyro_y,
                "gyroZ": gyro_z,
                "speed": speed_kmh
            }

            # Kirim data ke server dengan POST request
            response = requests.post(URL, json=data)
            
            if response.status_code == 200:
                print(f"Data sent successfully: {data}")
            else:
                print(f"Failed to send data: {response.status_code}")

            # Delay untuk mensimulasikan interval pengiriman data (1 detik)
            time.sleep(1)
    except KeyboardInterrupt:
        print("Simulation stopped.")

# Jalankan fungsi simulasi
if __name__ == "__main__":
    send_simulated_data()
