function createCycloneMap(id) {
  const map = L.map(id).setView([19.8, 87.3], 5);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);
  const path = [
    [17.7, 89.5],
    [18.5, 89],
    [19.2, 88.4],
    [20, 87.6],
    [20.8, 86.9],
    [21.6, 86.3],
  ];
  L.polyline(path, { color: "#1769d1", weight: 4, dashArray: "8 7" }).addTo(
    map,
  );
  L.circle([20, 87.6], {
    radius: 75000,
    color: "#e94b55",
    fillColor: "#e94b55",
    fillOpacity: 0.12,
  }).addTo(map);
  L.circleMarker([20, 87.6], {
    radius: 9,
    color: "#e94b55",
    fillColor: "#fff",
    fillOpacity: 1,
    weight: 4,
  })
    .addTo(map)
    .bindPopup(
      "<b>Potential Cyclonic System</b><br>Wind: 85 km/h<br>Formation probability: 78%",
    )
    .openPopup();
  return map;
}
