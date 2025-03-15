import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

# Load the training dataset
data_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../data/training_dataset.csv')
df = pd.read_csv(data_path)

# Features and target
X = df.drop('target', axis=1)
y = df['target']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save the model
model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'model.pkl')
joblib.dump(model, model_path)
print(f"Model trained and saved as {model_path}")