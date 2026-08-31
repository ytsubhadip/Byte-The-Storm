document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("map")) createCycloneMap("map");
  const c = document.getElementById("chart");
  if (c)
    new Chart(c, {
      type: "line",
      data: {
        labels: ["Now", "6h", "12h", "24h", "36h", "48h"],
        datasets: [
          {
            data: [85, 91, 96, 103, 110, 116],
            borderColor: "#1769d1",
            backgroundColor: "#1769d122",
            fill: true,
            tension: 0.4,
            pointRadius: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 8 } } },
          y: { grid: { color: "#edf1f4" }, ticks: { font: { size: 8 } } },
        },
      },
    });
});
