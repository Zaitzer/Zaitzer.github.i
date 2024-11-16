import os

thisFile = os.path.basename(__file__)
with open("temp.txt", "w", encoding="utf-8", errors="ignore") as f:
    for filename in os.listdir("."):
        if os.path.isfile(filename) and filename not in [thisFile, "temp.txt"]:
            with open(filename, encoding="utf-8", errors="ignore") as file:
                f.write(file.read() + "\n")


