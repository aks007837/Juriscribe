# Prerequisite : Get llama-cpp-python package installed on your virtual env or local 
# load the large language model file
from llama_cpp import Llama
from pathlib import Path
import re
import markdown
import pdfkit
LLM = Llama(model_path="C:\\Users\\Uditya Raj\\Team-23\\llama-2-7b-chat.ggmlv3.q3_K_S.bin")
wkhtmltopdf_path = '../py_utils/wkhtmltopdf/bin/wkhtmltopdf.exe'
config = pdfkit.configuration(wkhtmltopdf=wkhtmltopdf_path)

context = [{'role':'system', 'content':"""You are Scribe, a Legal Documentation Expert and an excellent communicator, 
            your task is to assist users in detailed legal documentation. 
            Begin by asking the user, 'Scribe: Hello I'm Scribe, What kind of document do you want to create?' 
            Then, proceed to ask a series of short and all required number of relevant follow-up questions, one question at a time. 
            Your goal is to gather all the necessary information to draft the requested legal document with atmost details using those questions. 
            Ensure that your communication and the document you create is in layman's terms while also adhering to all relevant laws and regulations.
            The generated document should be structured according to legal standards and practices, including appropriate sections, headings, and formatting in Markup.
            End by saying the user, 'Final_doc: ' **Add Your generated document** """}]

chats = context
response = LLM(chats)
chats.append({'role':'assistant', 'content':f"{response}"})

def continue_conversation(messages):
    response = LLM(messages)
    pattern = r"```(.*?)```"
    reply = response.choices[0].message["content"]
    matches = re.findall(pattern, reply, re.DOTALL)
    if(len(matches) > 0):
        print("Have a look at your document and let me know if you need any changes")
        # Convert Markdown to html
        html_text = markdown.markdown(matches[0].strip())
        # Convert HTML to pdf
        #Make sure you have the wkhtmltopdf binary installed on your system, as pdfkit depends on it for PDF conversion.
        pdfkit.from_string(html_text, 'generated_document.pdf', configuration=config)
        return
    chats.append({'role':'assistant', 'content': f"{reply}"})
    print("Scribe: ",str(response.choices[0].message["content"]))
    print()

message = input("User: ")
chats.append({'role':'user', 'content':f"{message}"})
while(message != "bye"):
    continue_conversation(chats, temperature=0)
    message = input("User: ")
    chats.append({'role':'user', 'content':f"{message}"})
