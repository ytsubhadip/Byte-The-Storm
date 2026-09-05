from pathlib import Path
import re
from datetime import datetime

DATA_FOLDER = Path(r"C:\Users\ytsub\Desktop\github\Byte-The-Storm\ML model\image model\mdapi\cyclone satalite images\AMPHAN")

files = sorted(DATA_FOLDER.glob("*.h5"))

data = []

for file in files:

    # Example:
    # 3RIMG_20MAY2020_0732_L1C_ASIA_MER_V01R00.h5

    match = re.search(
        r"(\d{2})([A-Z]{3})(\d{4})_(\d{4})",
        file.name
    )

    if match:
        date_str = match.group(1) + match.group(2) + match.group(3)
        time_str = match.group(4)

        timestamp = datetime.strptime(
            date_str + time_str,
            "%d%b%Y%H%M"
        )

        data.append((timestamp, file))

data.sort()

print(f"Total H5 files: {len(data)}\n")

count = 0

for timestamp, file in data:
    print(timestamp.strftime("%Y-%m-%d %H:%M"), "→", file.name)
    count += 1

print(f"\nTotal H5 files: {count}")