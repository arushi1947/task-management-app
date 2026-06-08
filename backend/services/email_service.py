import resend
import os

resend.api_key = os.getenv("RESEND_API_KEY")

def send_email(receiver, subject, body):

    params = {
        "from": "Task Manager <onboarding@resend.dev>",
        "to": [receiver],
        "subject": subject,
        "text": body,
    }

    resend.Emails.send(params)