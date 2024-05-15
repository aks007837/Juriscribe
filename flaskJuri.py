from flask import Flask, render_template, jsonify, request
from flask_cors import CORS, cross_origin
import openai
import os
from dotenv import load_dotenv
from pathlib import Path
import json
dotenv_path = Path('.env')
load_dotenv(dotenv_path=dotenv_path)

openai.organization = os.getenv('OPENAI_ORG')
openai.api_key = os.getenv('OPENAI_API_KEY')
openai.Model.list()

app = Flask(__name__)
CORS(app)

context = [{'role': 'system', 'content': """You are Juri, a Legal expert and adviser with atmost knowledge of Indian Laws and an excellent communicator, 
            your task is to clarify users law related queries and nothing else. 
            Begin by asking the user, 'Hello I'm Juri, How can I help you?' 
            """}]

chats = context
chatHistory = []
response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=chats)
botRes = response.choices[0].message["content"]
chats.append({'role': 'assistant', 'content': f"{botRes}"})


@app.route("/")
@cross_origin
def home():
    return render_template("index.html",
                           bot_response=botRes,)


@app.route("/chatbot", methods=["GET", "POST"])
def chatbot():
    if request.method == "POST":
        # pass
        # Get the messag input from user
        user_input = request.form["key"]
        # use openai API to generate a aresponse
        chats.append({'role': 'user', 'content': f"{user_input}"})
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=chats,
            temperature=0,
            max_tokens=750
        )
        bot_response = response.choices[0].message["content"]

        chatHistory.append("User: {user_input}\nChatbot: {bot_response}")
        # Add the user Input and bot response to the chat history

        chats.append({'role': 'assistant', 'content': f"{bot_response}"})

        # Render te chatbot template with the response text
        return jsonify(bot_response), 200
    else:
        return jsonify(chats)


# satrt the flask app
if __name__ == "__main__":
    app.run(debug=True,)
