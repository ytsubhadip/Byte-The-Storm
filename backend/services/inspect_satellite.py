import h5py
from pathlib import Path


FILE = Path(
   r"C:\Users\ytsub\Desktop\github\Byte-The-Storm\data\satellite\raw\3SIMG_L1B_STD\2026\07SEP\3SIMG_07SEP2026_1630_L1B_STD_V01R00.h5"
)


def print_hdf_structure(name, obj):

    if isinstance(obj, h5py.Dataset):

        print(
            f"[DATASET] {name}"
        )

        print(
            f"          Shape : {obj.shape}"
        )

        print(
            f"          Type  : {obj.dtype}"
        )

    elif isinstance(obj, h5py.Group):

        print(
            f"[GROUP]   {name}"
        )


with h5py.File(FILE, "r") as h5:

    print("=" * 60)
    print("INSAT-3DS H5 STRUCTURE")
    print("=" * 60)

    h5.visititems(print_hdf_structure)

    print("\n")
    print("=" * 60)
    print("ROOT ATTRIBUTES")
    print("=" * 60)

    for key, value in h5.attrs.items():

        print(
            f"{key}: {value}"
        )