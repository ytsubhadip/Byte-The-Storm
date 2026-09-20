import h5py
import numpy as np
import matplotlib.pyplot as plt


H5_PATH = r"C:\Users\ytsub\Desktop\github\Byte-The-Storm\data\cyclone dataset\Cyclone_Images.h5"


with h5py.File(H5_PATH, "r") as f:

    images = f["Images"]

    image = images[0]

    print("Image shape:", image.shape)

    for channel in range(4):

        channel_data = image[:, :, channel]

        print(
            f"\nChannel {channel}:"
        )

        print("Min:", channel_data.min())
        print("Max:", channel_data.max())
        print("Mean:", channel_data.mean())

        plt.figure(figsize=(5, 5))

        plt.imshow(
            channel_data,
            cmap="gray"
        )

        plt.title(
            f"Channel {channel}"
        )

        plt.colorbar()

        plt.axis("off")

        plt.show()