from fastapi import FastAPI, APIRouter

route = APIRouter(prefix="/api")

@route.get("/dashboard")
async def get_dashboard():
    return{
        "sst": 40,
        "pressure": 1007,
        "humidity": 82,
        "wind_shear": 12
    }