import "./CycloneMap.css"

function CycloneMap() {
  return (
      <div className="windy-map">

      <iframe
        title="Windy Weather Map"
        src="https://embed.windy.com/embed2.html?lat=15&lon=82&zoom=5&level=surface&overlay=wind&menu=&message=true&marker=true&calendar=now&pressure=true&type=map&location=coordinates&detailLat=15&detailLon=82&metricWind=default&metricTemp=default&radarRange=-1"
        frameBorder="0"
        width="100%"
        height="100%"
      />

    </div>
  );
}

export default CycloneMap;