from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def form():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    user_input = request.form['user_input']
    # You can process the input here, for example, save to a file or database
    with open("output.txt", "w") as f:
        f.write(user_input)
    return f'You entered: {user_input}. The input has been saved to output.txt.'

if __name__ == '__main__':
    app.run(debug=True)
