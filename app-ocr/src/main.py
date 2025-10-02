from flask import Flask, request, jsonify
import pytesseract
from PIL import Image
import io
import time

app = Flask(__name__)

@app.route('/ocr', methods=['POST'])
def ocr():
  if 'image' not in request.files:
      return jsonify({'error': 'No image provided'}), 400
  
  file = request.files['image']
  image = Image.open(io.BytesIO(file.read()))
  
  start_time = time.time()
  text = pytesseract.image_to_string(image)
  end_time = time.time()
  runtime = end_time - start_time

  print(f"{time.time()}: processed image in {(runtime):.3f}s; text: '{text}'")
  return jsonify({'runtime': (runtime), 'content': text})

@app.route('/health', methods=['GET'])
def health():
  return jsonify({'health': "good"})


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)
  