from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import threading
import subprocess
import os
from app.producer import produce_kafka_messages
from app.consumer import consume_kafka_messages
from app.shared_state import shared_state  # Import the shared state
from twilio.rest import Client

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Twilio configuration
account_sid = os.getenv('TWILIO_ACCOUNT_SID')
auth_token = os.getenv('TWILIO_AUTH_TOKEN')
client = Client(account_sid, auth_token)

class SMSRequest(BaseModel):
    body: str
    to: str

@app.post("/send-sms")
def send_sms(request: SMSRequest):
    try:
        message = client.messages.create(
            body=request.body,
            messaging_service_sid='MGfff225b2af7598acf22f3fdddb01b3ac',
            to=request.to
        )
        return {"message_sid": message.sid}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Function to start ZooKeeper
def start_zookeeper():
    print("Starting ZooKeeper")  # Debugging
    zookeeper_script = os.path.join("bin", "zookeeper-server-start.sh")
    zookeeper_config = os.path.join("config", "zookeeper.properties")
    subprocess.run([zookeeper_script, zookeeper_config])

# Function to start Kafka
def start_kafka():
    print("Starting Kafka")  # Debug
    kafka_script = os.path.join("bin", "kafka-server-start.sh")
    kafka_config = os.path.join("config", "server.properties")
    subprocess.run([kafka_script, kafka_config])

# Shared variable to store the latest Kafka message
latest_message = None

# Start Kafka producer and consumer in separate threads
def start_kafka_producer():
    produce_kafka_messages()

def start_kafka_consumer():
    consume_kafka_messages()

# Start threads
threading.Thread(target=start_kafka_producer, daemon=True).start()
threading.Thread(target=start_kafka_consumer, daemon=True).start()

# API endpoint to fetch the latest Kafka message
@app.get("/latest-message")
def get_latest_message():
    print("Latest message endpoint called")  # Debugging
    with shared_state.lock:
        if shared_state.latest_message:
            print("Current latest_message:", shared_state.latest_message)  # Debugging
            print("Current prediction_result:", shared_state.prediction_result)  # Debugging
            return {
                "message": shared_state.latest_message,
                "prediction_result": shared_state.prediction_result
            }
        else:
            raise HTTPException(status_code=404, detail="No messages received yet")

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)