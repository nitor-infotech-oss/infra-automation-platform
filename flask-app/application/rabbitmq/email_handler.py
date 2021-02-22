import smtplib, ssl

class EmailHandler():
    def __init__(self, reciverEMail):
        port = 465  # For SSL
        smtp_server = "smtp.gmail.com"
        sender_email = "santoshkolekar99@gmail.com"
        receiver_email = reciverEMail
        password = "gysepwqiwfpuuttw"

        message = """Subject: [Alert] - Automatic VM Creation and Monitoring.

        Your request for VM creation is successfully submitted.
        You can expect an email in next 2-3 hours.

        Please reach out to IT helpdesk team if you do not recieve any updates.

        Regards,
        System Admin.
        """

        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, message)
