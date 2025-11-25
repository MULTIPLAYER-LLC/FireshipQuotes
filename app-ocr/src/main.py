from flask import Flask, request, jsonify
from paddleocr import PaddleOCR
from PIL import Image
import io
import time
import numpy as np
import logging

pocr = PaddleOCR(
  text_detection_model_dir="/root/.paddlex/official_models/PP-OCRv5_server_det",
  text_recognition_model_dir="/root/.paddlex/official_models/PP-OCRv5_server_rec",
  use_doc_orientation_classify=False,
  use_doc_unwarping=False,
  use_textline_orientation=False
)

app = Flask(__name__)
app.logger.parent.handlers[0].addFilter(
    lambda record: '/health' not in record.getMessage()
)
app.logger.setLevel(logging.INFO)

@app.route('/ocr', methods=['POST'])
def ocr():
  if 'image' not in request.files:
      return jsonify({'error': 'No image provided'}), 400
  
  start_time = time.time()

  file = request.files['image']
  image = Image.open(io.BytesIO(file.read()))
  image = image.convert('RGB')
  image_array = np.array(image)
  result = pocr.predict(input=image_array)

  end_time = time.time()
  runtime = end_time - start_time

  # Extract just the text strings
  text_list = result[0]['rec_texts']  # This is a list of strings
  text = '\n'.join(text_list)  # Join them into one string

  app.logger.info(f"processed image in {(runtime):.3f}s; text: \n'''\n{text}\n'''")
  return jsonify({'runtime': (runtime), 'content': text})

@app.route('/health', methods=['GET'])
def health():
  return jsonify({'health': "good"})


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=80)
  