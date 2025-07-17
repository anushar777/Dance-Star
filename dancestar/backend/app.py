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

@app.route('/analyze', methods=['POST'])
def analyze():
    # Example: List uploaded files and do analysis
    files = os.listdir(UPLOAD_FOLDER)
    # Here you would add your actual analysis code
    # For now, just return a message
    return {'message': f'Analysis complete! Files: {files}'}, 200

if __name__ == '__main__':
    app.run(debug=True) 