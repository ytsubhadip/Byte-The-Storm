import tensorflow as tf
import numpy as np
from PIL import Image

# Load model
model = tf.keras.models.load_model("cyclone_model.keras")

print("Model loaded successfully!")
print("Input shape:", model.input_shape)
print("Output shape:", model.output_shape)


# -----------------------------
# Class names
# -----------------------------
CLASS_NAMES = [
    "Low Pressure",
    "Depression",
    "Deep Depression",
    "Cyclonic Storm",
    "Severe Cyclonic Storm",
    "Very Severe Cyclonic Storm"
]


# -----------------------------
# Load image
# -----------------------------
IMAGE_PATH = "test3_image.png"

image = Image.open(IMAGE_PATH).convert("RGB")

print("Original image size:", image.size)


# -----------------------------
# Preprocess
# -----------------------------
image = image.resize((128, 128))

image_array = np.array(image).astype("float32")

image_array = image_array / 255.0

image_array = np.expand_dims(image_array, axis=0)


# -----------------------------
# Prediction
# -----------------------------
prediction = model.predict(
    image_array,
    verbose=0
)

predicted_index = np.argmax(prediction[0])

confidence = prediction[0][predicted_index] * 100

predicted_class = CLASS_NAMES[predicted_index]


# -----------------------------
# Result
# -----------------------------
print("\n-----------------------------")
print("CYCLONE PREDICTION")
print("-----------------------------")

print("Prediction:", predicted_class)
print("Confidence:", round(float(confidence), 2), "%")

print("\nAll probabilities:")

for class_name, probability in zip(
    CLASS_NAMES,
    prediction[0]
):
    print(
        f"{class_name}: "
        f"{probability * 100:.2f}%"
    )