from kafka import KafkaProducer
import pandas as pd
import json
from time import sleep
import os

def produce_kafka_messages():
    print("Producer started")
    producer = KafkaProducer(
        bootstrap_servers=['16.171.57.107:9092'],
        value_serializer=lambda x: json.dumps(x).encode('utf-8'))
    
    # Correct file path
    data_path = "F:/BITS PILANI MTECH/health-monitoring-project/backend/data/merged_dataset_2022484408.csv"
    
    # Load the CSV file into a DataFrame
    df = pd.read_csv(data_path)
    
    # Iterate over rows and send messages to Kafka
    for index, row in df.iterrows():
        dict_heart = row.to_dict()
        producer.send('test-topic-1', value=dict_heart)
        print(f"Sent: {dict_heart}")
        sleep(2)
    
    # Flush and close the producer
    producer.flush()
    producer.close()

if __name__ == "__main__":
    produce_kafka_messages()