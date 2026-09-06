from pathlib import Path    

from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates 
from fastapi.staticfiles import StaticFiles

from routes.weather_routes import weather_route

BASE_DIR = Path(__file__).resolve().parent

app = FastAPI()

# Frontend paths
STATIC_DIR = BASE_DIR / "frontend" / "static"
TEMPLATE_DIR = BASE_DIR / "frontend" / "templates"

# Static files
app.mount(
    "/static",
    StaticFiles(directory=STATIC_DIR),
    name="static"
)

# Templates
templates = Jinja2Templates(
    directory=TEMPLATE_DIR
)

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