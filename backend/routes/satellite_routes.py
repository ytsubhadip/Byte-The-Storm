from pathlib import Path

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse


router = APIRouter(
    prefix="/api/satellite",
    tags=["Satellite"]
)


BASE_DIR = Path(__file__).resolve().parent.parent

SATELLITE_IMAGE = (
    BASE_DIR
    / "data"
    / "satellite"
    / "processed"
    / "latest_tir1.png"
)


@router.get("/image")
async def get_satellite_image():

    if not SATELLITE_IMAGE.exists():
        raise HTTPException(
            status_code=404,
            detail="Satellite image not found"
        )

    return FileResponse(
        SATELLITE_IMAGE,
        media_type="image/png"
    )


@router.get("/latest")
async def get_latest_satellite():

    if not SATELLITE_IMAGE.exists():
        raise HTTPException(
            status_code=404,
            detail="Satellite image not found"
        )

    return {
        "success": True,
        "image_url": "/api/satellite/image",
        "channel": "TIR-1",
        "satellite": "INSAT-3DS"
    }