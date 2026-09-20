from pathlib import Path    

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from routes.weather_routes import weather_route
from routes.image_model_routes import router as image_model_router
from routes.satellite_routes import router as satellite_router
from routes.dashboard_routes import route as dashboard_route



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ADD ALL ROUTES
app.include_router(weather_route)
app.include_router(image_model_router)
app.include_router(satellite_router)
app.include_router(dashboard_route)

@app.get("/")
async def home():
    return {
        "status" : "active"
    }



