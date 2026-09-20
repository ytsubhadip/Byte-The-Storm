import os
import joblib

model_path = r"C:\Users\ytsub\Desktop\github\Byte-The-Storm\backend\ML model\identification_model\cyclone_identification_model.joblib"

model1 = joblib.load(model_path)

def cyclone_identification_model(data:dict):
    pass

result = model1.predict([[27.498160,1008.521429, 89.279758, 13.979877, 0.000020, 8.119890, 76.137625,1.366176, 1]])
print(result)