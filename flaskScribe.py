from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin
import openai
import os
from dotenv import load_dotenv
import re
import markdown
import pdfkit
from pathlib import Path

dotenv_path = Path('path/to/.env')
load_dotenv(dotenv_path=dotenv_path)
wkhtmltopdf_path = './py_utils/wkhtmltopdf/bin/wkhtmltopdf.exe'
config = pdfkit.configuration(wkhtmltopdf=wkhtmltopdf_path)

openai.organization = os.getenv('OPENAI_ORG')
openai.api_key = os.getenv('OPENAI_API_KEY')
openai.Model.list()

app = Flask(__name__)
CORS(app)

context = [{'role': 'system', 'content': """You are Scribe, a Legal Documentation Expert and an excellent communicator, 
            your task is to assist users in detailed legal documentation and nothing else. 
            Begin by asking the user, 'Hello I'm Scribe, What kind of document do you want to create?' 
            Then, proceed to ask a series of short and all required number of relevant follow-up questions, one question at a time. 
            Your goal is to gather all the necessary information to draft the requested legal document with atmost details using those questions. 
            Ensure that your communication and the document you create is in layman's terms while also adhering to all relevant laws and regulations.
            The generated document should be structured according to legal standards and practices, including appropriate sections, headings, and formatting in Markup.
            End by saying the user, 'Final_doc: ' **Add Your generated document** """}]

chats = context
chatHistory = []
response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=chats)
botRes = response.choices[0].message["content"]
# chatHistory.append("Chatbot: {botRes}")
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
        pattern = r"```(.*?)```"
        bot_response = response.choices[0].message["content"]
        matches = re.findall(pattern, bot_response, re.DOTALL)
        if (len(matches) > 0):
            doc = "Have a look at your document and let me know if you need any changes"
            chatHistory.append("User: {user_input}\nChatbot: {doc}")
            # Convert Markdown to html
            html_text = markdown.markdown(matches[0].strip())
            # Convert HTML to pdf
            # Make sure you have the wkhtmltopdf binary installed on your system, as pdfkit depends on it for PDF conversion.
            pdfkit.from_string(
                html_text, 'promissory_note.pdf', configuration=config)
            return jsonify(doc), 200
        # Add the user Input and bot response to the chat history
        chatHistory.append("User: {user_input}\nChatbot: {bot_response}")
        chats.append({'role': 'assistant', 'content': f"{bot_response}"})

        # Render te chatbot template with the response text
        return jsonify(bot_response), 200
    else:
        return jsonify(chats)


# satrt the flask app
if __name__ == "__main__":
    app.run(debug=True, port=8001)
