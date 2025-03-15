# app/shared_state.py
import threading

class SharedState:
    def __init__(self):
        self.latest_message = None
        self.prediction_result = None  # Add prediction result
        self.lock = threading.Lock()

# Create a global instance of SharedState
shared_state = SharedState()