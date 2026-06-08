import smtplib
from email.mime.text import MIMEText
import os

def send_email(receiver, subject, body):
    try:
        msg = MIMEText(body)
        msg["Subject"] = subject
        msg["From"] = os.getenv("EMAIL_USER")
        msg["To"] = receiver

        print("Connecting to Gmail SMTP...")

        with smtplib.SMTP("smtp.gmail.com", 587, timeout=10) as server:
            server.starttls()
            print("TLS started")

            server.login(
                os.getenv("EMAIL_USER"),
                os.getenv("EMAIL_PASSWORD")
            )
            print("Login successful")

            server.send_message(msg)
            print("Email sent successfully")

    except Exception as e:
        print("EMAIL ERROR:", str(e))
        raise