import h5py
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path


# =========================================================
# PATHS
# =========================================================

BASE_DIR = Path(__file__).resolve().parent.parent

H5_FILE = (
    BASE_DIR
    / "data"
    / "satellite"
    / "raw"
    / "3SIMG_L1B_STD"
    / "2026"
    / "07SEP"
    / "3SIMG_07SEP2026_1700_L1B_STD_V01R00.h5"
)

OUTPUT_DIR = (
    BASE_DIR
    / "data"
    / "satellite"
    / "processed"
)

OUTPUT_DIR.mkdir(
    parents=True,
    exist_ok=True
)


# =========================================================
# LOAD SATELLITE DATA
# =========================================================

print("Loading:", H5_FILE)

with h5py.File(H5_FILE, "r") as h5:

    # TIR-1 thermal infrared image
    tir1 = np.array(h5["IMG_TIR1"])[0].astype(np.float32)

    # Geographic coordinates
    latitude = np.array(h5["Latitude"]).astype(np.float32)
    longitude = np.array(h5["Longitude"]).astype(np.float32)

    # Satellite acquisition time
    acquisition_time = h5.attrs.get(
        "Acquisition_Time_in_GMT",
        b"Unknown"
    )

    if isinstance(acquisition_time, bytes):
        acquisition_time = acquisition_time.decode()


print("TIR-1 shape:", tir1.shape)
print("Latitude shape:", latitude.shape)
print("Longitude shape:", longitude.shape)

print("Acquisition time:", acquisition_time)


# =========================================================
# PREPARE TIR-1 IMAGE
# =========================================================

# Ignore invalid pixels
valid = tir1 > 0

if not np.any(valid):
    raise RuntimeError("No valid TIR-1 pixels found.")


# Contrast stretch
low = np.percentile(
    tir1[valid],
    2
)

high = np.percentile(
    tir1[valid],
    98
)

tir1_display = np.clip(
    tir1,
    low,
    high
)

# Normalize 0 → 1
tir1_display = (
    tir1_display - low
) / (
    high - low + 1e-8
)

# Thermal visualization:
# colder cloud tops appear brighter
tir1_display = 1.0 - tir1_display


# =========================================================
# FUNCTION TO CREATE IMAGE
# =========================================================

def create_satellite_view(
    filename,
    title,
    min_lat,
    max_lat,
    min_lon,
    max_lon
):

    print("\nCreating:", title)

    # -----------------------------------------------------
    # Geographic mask
    # -----------------------------------------------------

    mask = (
        (latitude >= min_lat)
        & (latitude <= max_lat)
        & (longitude >= min_lon)
        & (longitude <= max_lon)
    )

    rows, cols = np.where(mask)

    if len(rows) == 0:
        print("No pixels found!")
        return


    # -----------------------------------------------------
    # Find pixel bounding box
    # -----------------------------------------------------

    r_min = rows.min()
    r_max = rows.max()

    c_min = cols.min()
    c_max = cols.max()


    # -----------------------------------------------------
    # Crop image
    # -----------------------------------------------------

    image = tir1_display[
        r_min:r_max + 1,
        c_min:c_max + 1
    ]

    lat_crop = latitude[
        r_min:r_max + 1,
        c_min:c_max + 1
    ]

    lon_crop = longitude[
        r_min:r_max + 1,
        c_min:c_max + 1
    ]


    print("Crop shape:", image.shape)


    # -----------------------------------------------------
    # Create plot
    # -----------------------------------------------------

    fig, ax = plt.subplots(
        figsize=(10, 7)
    )


    # Satellite image
    ax.imshow(
        image,
        cmap="gray",
        extent=[
            lon_crop.min(),
            lon_crop.max(),
            lat_crop.min(),
            lat_crop.max()
        ],
        origin="upper"
    )


    # -----------------------------------------------------
    # Grid
    # -----------------------------------------------------

    ax.grid(
        True,
        linestyle="--",
        linewidth=0.7,
        alpha=0.5
    )


    # -----------------------------------------------------
    # Labels
    # -----------------------------------------------------

    ax.set_xlabel(
        "Longitude (°E)"
    )

    ax.set_ylabel(
        "Latitude (°N)"
    )


    ax.set_title(
        f"{title}\n"
        f"INSAT-3DS / TIR-1 | "
        f"{acquisition_time} UTC"
    )


    # -----------------------------------------------------
    # Save
    # -----------------------------------------------------

    output_file = (
        OUTPUT_DIR
        / filename
    )

    plt.savefig(
        output_file,
        dpi=150,
        bbox_inches="tight"
    )

    plt.close()


    print(
        "Saved:",
        output_file
    )


# =========================================================
# IMAGE 1
# BAY OF BENGAL
# =========================================================

create_satellite_view(
    filename="bay_of_bengal_tir1.png",

    title="Bay of Bengal — Ocean View",

    min_lat=5,
    max_lat=22,

    min_lon=80,
    max_lon=100
)


# =========================================================
# IMAGE 2
# ARABIAN SEA
# =========================================================

create_satellite_view(
    filename="arabian_sea_tir1.png",

    title="Arabian Sea — Ocean View",

    min_lat=5,
    max_lat=25,

    min_lon=50,
    max_lon=75
)


# =========================================================
# IMAGE 3
# FULL INDIA + SURROUNDING OCEAN
# =========================================================

create_satellite_view(
    filename="india_full_tir1.png",

    title="India + Surrounding Ocean",

    min_lat=0,
    max_lat=35,

    min_lon=40,
    max_lon=105
)


# =========================================================
# DONE
# =========================================================

print("\n")
print("=" * 60)
print("ALL SATELLITE IMAGES CREATED")
print("=" * 60)

print(
    OUTPUT_DIR / "bay_of_bengal_tir1.png"
)

print(
    OUTPUT_DIR / "arabian_sea_tir1.png"
)

print(
    OUTPUT_DIR / "india_full_tir1.png"
)