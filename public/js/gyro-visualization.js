// Inisialisasi Babylon.js
const canvas = document.createElement('canvas');
canvas.id = 'renderCanvas';
canvas.style.width = '200px';
canvas.style.height = '200px';
document.getElementById('gyro-container').appendChild(canvas);

const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// Kamera untuk memutar dan melihat mesh
const camera = new BABYLON.ArcRotateCamera(
    "Camera",
    Math.PI / 4,
    Math.PI / 4,
    5,
    new BABYLON.Vector3(0, 0, 0),
    scene
);
camera.attachControl(canvas, true);

// Tambahkan pencahayaan
const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

// Buat bentuk layang-layang (custom mesh)
const kiteMesh = new BABYLON.Mesh("kite", scene);

// Posisi vertex (x, y, z)
const positions = [
    0, 1, 0,   // Puncak atas
   -1, 0, 0,   // Kiri
    0, -1, 0,  // Puncak bawah
    1, 0, 0    // Kanan
];

// Indeks untuk membuat segitiga (layang-layang terdiri dari dua segitiga)
const indices = [
    0, 1, 3,   // Segitiga atas (puncak atas - kiri - kanan)
    1, 2, 3    // Segitiga bawah (kiri - puncak bawah - kanan)
];

// Warna untuk setiap vertex
const colors = [
    1, 0, 0, 1,   // Merah (puncak atas)
    0, 1, 0, 1,   // Hijau (kiri)
    0, 0, 1, 1,   // Biru (puncak bawah)
    1, 1, 0, 1    // Kuning (kanan)
];

// Data vertex untuk mesh
const vertexData = new BABYLON.VertexData();
vertexData.positions = positions;
vertexData.indices = indices;
vertexData.colors = colors;

// Terapkan data ke mesh
vertexData.applyToMesh(kiteMesh);

// Aktifkan warna vertex
kiteMesh.hasVertexAlpha = true;
kiteMesh.material = new BABYLON.StandardMaterial("material", scene);
kiteMesh.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
kiteMesh.material.backFaceCulling = false;

// Animasi Loop
engine.runRenderLoop(() => {
    scene.render();
});

// Update Rotasi Berdasarkan Data Gyroscope
socket.on('sensor-update', (data) => {
    kiteMesh.rotation.x = data.gyroX * (Math.PI / 180); // Rotasi X berdasarkan gyroX
    kiteMesh.rotation.y = data.gyroY * (Math.PI / 180); // Rotasi Y berdasarkan gyroY
});
