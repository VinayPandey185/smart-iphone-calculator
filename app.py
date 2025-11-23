import math
import random
from flask import Flask, render_template

app = Flask(__name__)

# ----------- Basic Operations (path = accepts int/float/negative) -----------

@app.route("/add/<path:a>/<path:b>")
def add(a, b):
    a = float(a)
    b = float(b)
    return {"Your Answer is": a + b}

@app.route("/sub/<path:a>/<path:b>")
def sub(a, b):
    a = float(a)
    b = float(b)
    return {"Your Answer is": a - b}

@app.route("/mul/<path:a>/<path:b>")
def mul(a, b):
    a = float(a)
    b = float(b)
    return {"Your Answer is": a * b}

@app.route("/div/<path:a>/<path:b>")
def div(a, b):
    a = float(a)
    b = float(b)
    if b == 0:
        return {"Error": "Cannot divide by 0"}
    return {"Your Answer is": a / b}

# ----------- Square & Cube -----------

@app.route("/squ/<path:x>")
def squ(x):
    x = float(x)
    return {"key": x**2}

@app.route("/cube/<path:x>")
def cube(x):
    x = float(x)
    return {"key": x**3}

# ----------- Extra Operations -----------

@app.route("/pow/<path:a>/<path:b>")
def power(a, b):
    return {"Your Answer is": float(a) ** float(b)}

@app.route("/sqrt/<path:x>")
def sqrt(x):
    x = float(x)
    if x < 0:
        return {"Error": "Cannot take sqrt of negative number"}
    return {"Your Answer is": math.sqrt(x)}

@app.route("/fact/<int:x>")
def factorial(x):
    if x < 0:
        return {"Error": "Factorial not defined for negative numbers"}
    return {"Your Answer is": math.factorial(x)}

@app.route("/mod/<path:a>/<path:b>")
def modulus(a, b):
    a = float(a)
    b = float(b)
    if b == 0:
        return {"Error": "Modulus by zero is not allowed"}
    return {"Your Answer is": a % b}

# ----------- Scientific -----------

@app.route("/sin/<path:x>")
def sin_calc(x):
    x = float(x)
    return {"Your Answer is": math.sin(math.radians(x))}

@app.route("/cos/<path:x>")
def cos_calc(x):
    x = float(x)
    return {"Your Answer is": math.cos(math.radians(x))}

@app.route("/tan/<path:x>")
def tan_calc(x):
    x = float(x)
    return {"Your Answer is": math.tan(math.radians(x))}

@app.route("/log/<path:x>")
def log_calc(x):
    x = float(x)
    if x <= 0:
        return {"Error": "Log undefined for 0 or negative"}
    return {"Your Answer is": math.log10(x)}

@app.route("/ln/<path:x>")
def ln_calc(x):
    x = float(x)
    if x <= 0:
        return {"Error": "ln undefined for 0 or negative"}
    return {"Your Answer is": math.log(x)}

@app.route("/abs/<path:x>")
def abs_calc(x):
    return {"Your Answer is": abs(float(x))}

@app.route("/cbr/<path:x>")
def cbr_calc(x):
    return {"Your Answer is": float(x) ** (1/3)}

@app.route("/rand/<path:n>")
def rand_calc(n):
    n = int(n)
    if n <= 0:
        return {"Error": "n must be > 0"}
    return {"Your Answer is": random.randint(1, n)}

# ----------- Homepage -----------

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
