import numpy as np
from scipy.sparse import coo_matrix
from lightfm import LightFM
from lightfm.data import Dataset
import pickle

# Sample user-item interaction data
users = ['Alice', 'Bob', 'Charlie']
items = ['Item1', 'Item2', 'Item3', 'Item4']

interactions = [
    ('Alice', 'Item1'),
    ('Alice', 'Item2'),
    ('Bob', 'Item2'),
    ('Bob', 'Item3'),
    ('Charlie', 'Item3'),
    ('Charlie', 'Item4')
]

# Prepare dataset
dataset = Dataset()
dataset.fit(users, items)
(interactions_matrix, _) = dataset.build_interactions(interactions)

# Initialize and train the model
model = LightFM(loss='warp')
model.fit(interactions_matrix, epochs=10, num_threads=2)

# Save the model and dataset
with open('lightfm_model.pkl', 'wb') as f:
    pickle.dump((model, dataset), f)

print("Model trained and saved.")
