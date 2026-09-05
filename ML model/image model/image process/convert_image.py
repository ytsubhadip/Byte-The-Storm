import os
import h5py
import numpy as np
from PIL import Image

# ==========================================
# CONFIGURATION
# ==========================================

INPUT_FOLDER = r"C:\Users\ytsub\Desktop\github\Byte-The-Storm\ML model\image model\mdapi\cyclone satalite images\AMPHAN"

OUTPUT_FOLDER = r"C:\Users\ytsub\Desktop\github\Byte-The-Storm\ML model\image model\mdapi\cyclone satalite images\AMPHAN_IMAGES"

IMAGE_SIZE = (224, 224)

# ==========================================
# CREATE OUTPUT FOLDER
# ==========================================

os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# ==========================================
# NORMALIZE IMAGE
# ==========================================

def normalize_image(data):

    data = data.astype(np.float32)

    min_val = np.percentile(data, 1)
    max_val = np.percentile(data, 99)

    if max_val == min_val:
        return np.zeros(data.shape, dtype=np.uint8)

    data = (data - min_val) / (max_val - min_val)

    data = np.clip(data, 0, 1)

    data = (data * 255).astype(np.uint8)

    return data


# ==========================================
# CONVERT H5 → PNG
# ==========================================

files = sorted([
    f for f in os.listdir(INPUT_FOLDER)
    if f.endswith(".h5")
])

print(f"\nTotal H5 files found: {len(files)}\n")

success = 0
failed = 0

for filename in files:

    file_path = os.path.join(INPUT_FOLDER, filename)

    try:

        with h5py.File(file_path, "r") as h5:

            # Using MIR channel
            data = h5["IMG_MIR"][:]

            # Remove extra dimension
            data = np.squeeze(data)

            # Normalize to 0–255
            image_data = normalize_image(data)

            # Convert NumPy array → image
            image = Image.fromarray(image_data)

            # Resize
            image = image.resize(IMAGE_SIZE)

            # Output filename
            output_name = filename.replace(".h5", ".png")

            output_path = os.path.join(
                OUTPUT_FOLDER,
                output_name
            )

            image.save(output_path)

            success += 1

            print(f"✓ Converted: {filename}")

    except Exception as e:

        failed += 1

        print(f"✗ Failed: {filename}")
        print(f"  Error: {e}")


print("\n==============================")
print("CONVERSION COMPLETE")
print("==============================")

print(f"Total files: {len(files)}")
print(f"Successfully converted: {success}")
print(f"Failed: {failed}")
print(f"Images saved to: {OUTPUT_FOLDER}")