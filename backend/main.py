from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({"message": "Flask is working"})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080) # 0.0.0.0 so that this will work on expo go
