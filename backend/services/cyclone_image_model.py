import numpy as np
import tensorflow as tf
from PIL import Image
import io


MODEL_PATH = r"C:\Users\ytsub\Desktop\github\Byte-The-Storm\backend\models\cyclone_model.keras"

model = tf.keras.models.load_model(MODEL_PATH)


CLASS_NAMES = [
    "Cyclonic Storm",
    "Deep Depression",
    "Depression",
    "Low Pressure",
    "Severe Cyclonic Storm",    
    "Very Severe Cyclonic Storm"
]


def predict_cyclone(image_bytes):

    # Convert uploaded image to PIL
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    # Resize exactly like model input
    image = image.resize((128, 128))

    # Convert to numpy
    image = np.array(image).astype("float32")

    # Normalize exactly like training
    image = image / 255.0

    # Add batch dimension
    image = np.expand_dims(image, axis=0)

    # Prediction
    prediction = model.predict(image, verbose=0)[0]

    # Highest probability class
    class_index = int(np.argmax(prediction))
    confidence = float(prediction[class_index])

    return {
        "class": CLASS_NAMES[class_index],
        "confidence": round(confidence * 100, 2),
        "probabilities": {
            CLASS_NAMES[i]: round(float(prediction[i]) * 100, 2)
            for i in range(len(CLASS_NAMES))
        }
    }