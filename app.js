// 初始化地圖並設定視圖
const map = L.map('map').setView([51.505, -0.09], 13);

// 添加地圖圖層（使用 OpenStreetMap）
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

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
searchAddress('Tainan, Taiwan');


// 添加 GeoJSON 圖層
fetch('assets/points.json') // 載入 GeoJSON 文件
  .then(response => response.json())
  .then(data => {
    // 將 GeoJSON 添加到地圖
    const geojsonLayer = L.geoJSON(data, {
      style: {
        color: "blue", // 設置圖層的顏色
        weight: 2,
        opacity: 0.7
      },
      onEachFeature: (feature, layer) => {
        if (feature.properties) {
          // 彈出屬性資訊
          layer.bindPopup(`Name: ${feature.properties.name || 'N/A'}`);
        }
      }
    });
    geojsonLayer.addTo(map);
  })
  .catch(error => {
    console.error('Error loading GeoJSON:', error);
  });
