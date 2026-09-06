from fastapi import APIRouter, Request, Query
from fastapi.responses import HTMLResponse
import httpx

weather_route = APIRouter(prefix="/api/weather") 

@weather_route.get("/get-live")
async def getcurrent_weather(
    lat: float=Query(...),
    lon: float = Query(...)
):

    url = (
         "https://api.open-meteo.com/v1/forecast"
        f"?latitude={lat}"
        f"&longitude={lon}"
        "&current="
        "temperature_2m,"
        "relative_humidity_2m,"
        "precipitation,"
        "rain,"
        "cloud_cover,"
        "pressure_msl,"
        "wind_speed_10m,"
        "wind_direction_10m,"
        "wind_gusts_10m"
        "&wind_speed_unit=kmh"
        "&hourly=precipitation_probability"
    )

    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        response.raise_for_status()
        weather = response.json()

    current = weather["current"]

     # Get the current hour's rain probability
    hourly = weather.get("hourly", {})

    rain_probability = None

    if hourly:
        hourly_times = hourly.get("time", [])
        probabilities = hourly.get(
            "precipitation_probability", []
        )

        current_time = current["time"]

        if current_time in hourly_times:
            index = hourly_times.index(current_time)

            if index < len(probabilities):
                rain_probability = probabilities[index]

    return {
        "location": {
            "latitude": lat,
            "longitude": lon
        },

        "updated_at": current["time"],

        "temperature": current["temperature_2m"],

        "humidity": current["relative_humidity_2m"],

        "rain": current["rain"],

        "precipitation": current["precipitation"],

        "cloud_cover": current["cloud_cover"],

        "pressure": current["pressure_msl"],

        "wind_speed": current["wind_speed_10m"],

        "wind_direction": current["wind_direction_10m"],

        "wind_gusts": current["wind_gusts_10m"],
        
         "rain_probability": rain_probability
    }
