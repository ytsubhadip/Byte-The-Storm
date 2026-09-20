import h5py
import numpy as np
from pathlib import Path
from PIL import Image


FILE = Path(
    r"C:\Users\ytsub\Desktop\github\Byte-The-Storm\data\satellite\raw\3SIMG_L1B_STD\2026\07SEP\3SIMG_07SEP2026_1630_L1B_STD_V01R00.h5"
)

OUTPUT = Path(
    r"C:\Users\ytsub\Desktop\github\Byte-The-Storm\data\satellite\processed/latest_tir1.png"
)


# --------------------------------------------------
# Load H5
# --------------------------------------------------

with h5py.File(FILE, "r") as h5:

    tir1 = np.array(h5["IMG_TIR1"])[0]

    latitude = np.array(h5["Latitude"])
    longitude = np.array(h5["Longitude"])

    print("TIR1 shape:", tir1.shape)
    print("Latitude shape:", latitude.shape)
    print("Longitude shape:", longitude.shape)

    print("\nTIR1 raw values:")
    print("Minimum:", tir1.min())
    print("Maximum:", tir1.max())
    print("Mean:", tir1.mean())

    print("\nLatitude raw:")
    print("Minimum:", latitude.min())
    print("Maximum:", latitude.max())

    print("\nLongitude raw:")
    print("Minimum:", longitude.min())
    print("Maximum:", longitude.max())

    print("\nTIR1 attributes:")
    for key, value in h5["IMG_TIR1"].attrs.items():
        print(key, "=", value)

    print("\nLatitude attributes:")
    for key, value in h5["Latitude"].attrs.items():
        print(key, "=", value)

    print("\nLongitude attributes:")
    for key, value in h5["Longitude"].attrs.items():
        print(key, "=", value)


# --------------------------------------------------
# Convert latitude / longitude using HDF metadata
# --------------------------------------------------

with h5py.File(FILE, "r") as h5:

    lat_ds = h5["Latitude"]
    lon_ds = h5["Longitude"]

    lat_scale = lat_ds.attrs.get("scale_factor", 1.0)
    lat_offset = lat_ds.attrs.get("add_offset", 0.0)

    lon_scale = lon_ds.attrs.get("scale_factor", 1.0)
    lon_offset = lon_ds.attrs.get("add_offset", 0.0)

    latitude = latitude.astype(np.float32) * lat_scale + lat_offset
    longitude = longitude.astype(np.float32) * lon_scale + lon_offset


# --------------------------------------------------
# Select India + surrounding ocean
# --------------------------------------------------

MIN_LAT = 0
MAX_LAT = 30

MIN_LON = 60
MAX_LON = 100


mask = (
    (latitude >= MIN_LAT) &
    (latitude <= MAX_LAT) &
    (longitude >= MIN_LON) &
    (longitude <= MAX_LON)
)


rows, cols = np.where(mask)

if len(rows) == 0:

    raise RuntimeError(
        "No pixels found inside selected geographic region."
    )


r_min = rows.min()
r_max = rows.max()

c_min = cols.min()
c_max = cols.max()


print("\nSelected region:")
print("Rows:", r_min, "→", r_max)
print("Columns:", c_min, "→", c_max)


# --------------------------------------------------
# Crop TIR1
# --------------------------------------------------

crop = tir1[
    r_min:r_max + 1,
    c_min:c_max + 1
]


print("Crop shape:", crop.shape)


# --------------------------------------------------
# Remove invalid values
# --------------------------------------------------

crop = crop.astype(np.float32)

valid = crop > 0

if not np.any(valid):

    raise RuntimeError(
        "No valid TIR1 pixels found."
    )


# --------------------------------------------------
# Contrast stretch
# --------------------------------------------------

low = np.percentile(
    crop[valid],
    2
)

high = np.percentile(
    crop[valid],
    98
)

crop = np.clip(
    crop,
    low,
    high
)


crop = (
    (crop - low) /
    (high - low + 1e-8)
)


# Invert so colder cloud tops appear brighter
crop = 1.0 - crop


# --------------------------------------------------
# Convert to PNG
# --------------------------------------------------

image = (
    crop * 255
).astype(np.uint8)


OUTPUT.parent.mkdir(
    parents=True,
    exist_ok=True
)


Image.fromarray(
    image
).save(OUTPUT)


print("\n================================")
print("Satellite preview created!")
print("================================")
print("Output:", OUTPUT)