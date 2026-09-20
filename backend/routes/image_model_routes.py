from fastapi import APIRouter, UploadFile, File, HTTPException

from services.cyclone_image_model import predict_cyclone


router = APIRouter(
    prefix="/api/cyclone",
    tags=["Cyclone Prediction"]
)


@router.post("/predict")
async def predict_cyclone_image(
    file: UploadFile = File(...)
):
    # Check file type
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a valid image file."
        )

    try:
        # Read uploaded image
        image_bytes = await file.read()

        # Make prediction
        result = predict_cyclone(image_bytes)

        return {
            "success": True,
            "filename": file.filename,
            "prediction": result
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )