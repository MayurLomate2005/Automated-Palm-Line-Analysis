import cv2
import sys
import numpy as np

image_path = sys.argv[1]

img = cv2.imread(image_path)
h, w, _ = img.shape
output = img.copy()

# ---- PREPROCESSING ----
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
blur = cv2.GaussianBlur(gray, (5, 5), 0)
edges = cv2.Canny(blur, 40, 120)

# Strengthen lines
kernel = np.ones((2,2), np.uint8)
edges = cv2.dilate(edges, kernel, iterations=1)

# Find contours (for red line visualization)
contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

for cnt in contours:
    if cv2.contourArea(cnt) > 200:
        cv2.drawContours(output, [cnt], -1, (0, 0, 255), 2)

# ---- STATIC LABELING (BIG & CLEAR) ----

def draw_label(img, text, x, y):
    font = cv2.FONT_HERSHEY_SIMPLEX
    scale = 1.2          # 🔥 BIG TEXT
    thickness = 3        # 🔥 THICK TEXT

    (tw, th), _ = cv2.getTextSize(text, font, scale, thickness)

    # White background box
    cv2.rectangle(
        img,
        (x - 5, y - th - 10),
        (x + tw + 5, y + 5),
        (255, 255, 255),
        -1
    )

    # Red text
    cv2.putText(
        img,
        text,
        (x, y),
        font,
        scale,
        (0, 0, 255),
        thickness
    )

# Heart Line (top)
draw_label(output, "Heart Line", int(w*0.30), int(h*0.18))

# Head Line (middle)
draw_label(output, "Head Line", int(w*0.30), int(h*0.45))

# Life Line (bottom / thumb side)
draw_label(output, "Life Line", int(w*0.10), int(h*0.75))
