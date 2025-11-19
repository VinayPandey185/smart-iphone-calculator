import math
import random
from flask import Flask, render_template

app = Flask(__name__)

# ----------- Existing routes -----------

@app.route("/cube/<int:numberIs>")
def cube(numberIs):
    return {"key": numberIs ** 3}

@app.route("/squ/<int:numberIs>")
def squ(numberIs):
    return {"key": numberIs ** 2}

@app.route("/add/<int:a>/<int:b>")
def add(a, b):
    return {"Your Answer is": a + b}

@app.route("/sub/<int:a>/<int:b>")
def sub(a, b):
    return {"Your Answer is": a - b}

@app.route("/mul/<int:a>/<int:b>")
def mul(a, b):
    return {"Your Answer is": a * b}

@app.route("/div/<int:a>/<int:b>")
def div(a, b):
    if b == 0:
        return {"Error": "Cannot divide by 0"}
    return {"Your Answer is": a / b}

# ----------- NEW ROUTES YOU ASKED FOR -----------

@app.route("/pow/<int:a>/<int:b>")
def power(a, b):
    return {"Your Answer is": a ** b}

@app.route("/sqrt/<int:number>")
def sqrt(number):
    if number < 0:
        return {"Error": "Cannot take sqrt of negative number"}
    return {"Your Answer is": math.sqrt(number)}

@app.route("/fact/<int:number>")
def factorial(number):
    if number < 0:
        return {"Error": "Factorial not defined for negative numbers"}
    return {"Your Answer is": math.factorial(number)}

@app.route("/mod/<int:a>/<int:b>")
def modulus(a, b):
    if b == 0:
        return {"Error": "Modulus by zero is not allowed"}
    return {"Your Answer is": a % b}

# ----------- FIXED SCIENTIFIC FUNCTIONS API -----------

@app.route("/sin/<num>")
def sin_calc(num):
    num = float(num)
    return {"Your Answer is": math.sin(math.radians(num))}

@app.route("/cos/<num>")
def cos_calc(num):
    num = float(num)
    return {"Your Answer is": math.cos(math.radians(num))}

@app.route("/tan/<num>")
def tan_calc(num):
    num = float(num)
    return {"Your Answer is": math.tan(math.radians(num))}

@app.route("/log/<num>")
def log_calc(num):
    num = float(num)
    if num <= 0:
        return {"Error": "Log undefined for 0 or negative"}
    return {"Your Answer is": math.log10(num)}

@app.route("/ln/<num>")
def ln_calc(num):
    num = float(num)
    if num <= 0:
        return {"Error": "ln undefined for 0 or negative"}
    return {"Your Answer is": math.log(num)}

@app.route("/abs/<num>")
def abs_calc(num):
    num = float(num)
    return {"Your Answer is": abs(num)}

@app.route("/cbr/<num>")
def cube_root(num):
    num = float(num)
    return {"Your Answer is": num ** (1/3)}

@app.route("/rand/<num>")
def random_calc(num):
    n = int(num)
    if n <= 0:
        return {"Error": "n must be > 0"}
    return {"Your Answer is": random.randint(1, n)}

# ----------- Homepage -----------

@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
