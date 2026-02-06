import cv2
import sys
import numpy as np

image_path = sys.argv[1]

# Read image
img = cv2.imread(image_path)
output = img.copy()

# Convert to grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Improve contrast
clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
gray = clahe.apply(gray)

# Blur
blur = cv2.GaussianBlur(gray, (5,5), 0)

# Edge detection (stronger)
edges = cv2.Canny(blur, 30, 120)

# Dilate edges to make lines thicker
kernel = np.ones((2,2), np.uint8)
edges = cv2.dilate(edges, kernel, iterations=1)

# Find contours (THIS WORKS FOR PALM LINES)
contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

for cnt in contours:
    if cv2.contourArea(cnt) > 100:  # ignore noise
        # Draw RED palm lines
        cv2.drawContours(output, [cnt], -1, (0, 0, 255), 2)

        # Draw RED points on contour
        for point in cnt[::20]:  # every 20th point
            x, y = point[0]
            cv2.circle(output, (x, y), 3, (0, 0, 255), -1)

# Save output
cv2.imwrite("processed.jpg", output)

print("processed.jpg")
