import h5py

H5_PATH = r"C:\Users\ytsub\Desktop\github\Byte-The-Storm\data\cyclone dataset\Cyclone_Images.h5"


with h5py.File(H5_PATH, "r") as f:

    images = f["Images"]

    print("Dataset name:", images.name)
    print("Shape:", images.shape)
    print("Data type:", images.dtype)
    print("Number of images:", len(images))

    # Inspect first image
    first_image = images[0]

    print("\nFirst image:")
    print("Shape:", first_image.shape)
    print("Data type:", first_image.dtype)
    print("Min value:", first_image.min())
    print("Max value:", first_image.max())