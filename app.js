// 初始化地圖並設定視圖
const map = L.map('map').setView([51.505, -0.09], 13);

// 添加地圖圖層（使用 OpenStreetMap）
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

// 添加一個標記
L.marker([51.5, -0.09]).addTo(map)
  .bindPopup('Hello GIS App!')
  .openPopup();

// **定位使用者位置**
map.locate({ setView: true, maxZoom: 16 });

map.on('locationfound', (e) => {
  L.marker(e.latlng).addTo(map)
    .bindPopup("You are here!")
    .openPopup();
});

// **搜索功能**
async function searchAddress(query) {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`);
  const data = await response.json();
  if (data.length > 0) {
    const { lat, lon } = data[0];
    map.setView([lat, lon], 16);
    L.marker([lat, lon]).addTo(map).bindPopup(query).openPopup();
  } else {
    alert("Address not found!");
  }
}

// 測試搜索功能
searchAddress('London');
