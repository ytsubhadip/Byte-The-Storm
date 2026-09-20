import "./SmartCard.css";

function SmartCard({ title, value, unit, description, icon }) {
  return (
    <div className="smart-card">

      <div className="smart-card-top">

        <div className="smart-card-icon">
          {icon}
        </div>

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


      <p className="smart-card-description">
        {description}
      </p>

    </div>
  );
}

export default SmartCard;