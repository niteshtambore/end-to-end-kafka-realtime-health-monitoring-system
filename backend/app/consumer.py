from kafka import KafkaConsumer
import json
import joblib
from app.shared_state import shared_state  # Import the shared state

# Load the trained model
model = joblib.load('app/models/model.pkl')

def consume_kafka_messages():
    consumer = KafkaConsumer(
        'test-topic-1',
        bootstrap_servers=['16.171.57.107:9092'],
        value_deserializer=lambda x: json.loads(x.decode('utf-8')))
    
    for message in consumer:
        data = message.value
        print("Received message:", data)  # Debugging
        
        # Prepare the data for prediction
        features = [
            data['age'], data['gender'], data['cp'], data['trestbps'],
            data['chol'], data['fbs'], data['restecg'], data['current_thalach'],
            data['exang'], data['oldpeak'], data['slope'], data['ca'], data['thal']
        ]
        prediction = model.predict([features])
        
        # Determine the prediction result
        prediction_result = "at risk" if prediction[0] == 1 else "safe"
        print(f"Patient {data['id']} is {prediction_result}.")
        
        # Update the shared state
        with shared_state.lock:
            shared_state.latest_message = data
            shared_state.prediction_result = prediction_result
            print("Updated latest_message:", shared_state.latest_message)  # Debugging
            print("Updated prediction_result:", shared_state.prediction_result)  # Debugging