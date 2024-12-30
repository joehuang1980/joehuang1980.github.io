// 初始化地圖並設定視圖
const map = L.map('map').setView([51.505, -0.09], 13);

// 添加地圖圖層（使用 OpenStreetMap）
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

// 定義一個變數來存放 GeoJSON 圖層
let geojsonLayer;

// 加載 GeoJSON 圖層
fetch('assets/points.json') // 載入 GeoJSON 文件
  .then(response => response.json())
  .then(data => {
    geojsonLayer = L.geoJSON(data, {
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
    geojsonLayer.addTo(map); // 預設添加到地圖
  })
  .catch(error => {
    console.error('Error loading GeoJSON:', error);
  });

// 添加控制功能
const toggleLayerCheckbox = document.getElementById('toggleLayer');
toggleLayerCheckbox.addEventListener('change', (e) => {
  if (geojsonLayer) {
    if (e.target.checked) {
      map.addLayer(geojsonLayer); // 顯示圖層
    } else {
      map.removeLayer(geojsonLayer); // 隱藏圖層
    }
  }
});
