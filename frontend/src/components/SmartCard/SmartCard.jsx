import "./SmartCard.css";

function SmartCard({ title, value, unit, description, icon }) {
  return (
    <div className="smart-card">
      <div className="smart-card-top">
        <span className="smart-card-title">
          {title}
        </span>
      </div>
      <div className="smart-card-value">
        {value}
        <span>
          {unit}
        </span>
      </div>
    </div>
  );
}

export default SmartCard;