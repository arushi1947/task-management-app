import smtplib
from email.mime.text import MIMEText
import os

def send_email(receiver, subject, body):

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = os.getenv("EMAIL_USER")
    msg["To"] = receiver

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(
            os.getenv("EMAIL_USER"),
            os.getenv("EMAIL_PASSWORD")
        )
        server.send_message(msg)