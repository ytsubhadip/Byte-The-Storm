from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates 
from fastapi.staticfiles import StaticFiles

from routes.weather_routes import weather_route

app = FastAPI()

app.mount("/static", StaticFiles(directory="frontend/static"), name="static")

templates = Jinja2Templates(directory="frontend/templates")

# ADD ALL ROUTES
app.include_router(weather_route)

@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse(
        request = request,
        name = "index.html",
    )

@app.get("/dashboard")
async def dashboard(request: Request):
    return templates.TemplateResponse(
        request = request,
        name = "dashboard.html",
    )

@app.get("/about")
async def about(request: Request):
    return templates.TemplateResponse(
        request = request,
        name = "about.html",
    )