from flask import Flask, request
import os
import cv2  # OpenCV for video processing
import numpy as np

# Initialize Flask app
app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_files():
    choreography = request.files.get('choreography')
    user = request.files.get('user')
    if choreography and choreography.filename:
        choreography.save(os.path.join(UPLOAD_FOLDER, choreography.filename))
    if user and user.filename:
        user.save(os.path.join(UPLOAD_FOLDER, user.filename))
    return 'Files uploaded successfully', 200


def extract_frames(video_path, fps=10):
    cap = cv2.VideoCapture(video_path)
    frames = []
    frame_rate = cap.get(cv2.CAP_PROP_FPS)
    interval = int(frame_rate // fps)
    count = 0
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        if count % interval == 0:
            frames.append(frame)
        count += 1
    cap.release()
    return frames

@app.route('/analyze', methods=['POST'])
def analyze():
    # Example: List uploaded files and do analysis
    files = os.listdir(UPLOAD_FOLDER)
    
    #Analysis Code





    return {'message': f'Analysis complete! Files: {files}'}, 200

if __name__ == '__main__':
    app.run(debug=True) 