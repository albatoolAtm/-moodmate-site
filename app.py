from flask import Flask, request, jsonify, render_template
import pandas as pd
from transformers import pipeline
from lightfm import LightFM
import numpy as np
import pickle

app = Flask(__name__)

# Load movie database
try:
    movies_df = pd.read_csv('imdb_clean.csv')
except FileNotFoundError:
    print("Error: 'imdb_clean.csv' not found.")
    movies_df = pd.DataFrame(columns=['title', 'genre'])

# Load LightFM model and dataset
try:
    with open('lightfm_model.pkl', 'rb') as f:
        model, dataset = pickle.load(f)
    user_mapping, _, item_mapping, _ = dataset.mapping()
    reverse_item_mapping = {v: k for k, v in item_mapping.items()}
    lightfm_enabled = True
except:
    print("Warning: LightFM model not loaded.")
    model = dataset = None
    user_mapping = item_mapping = {}
    reverse_item_mapping = {}
    lightfm_enabled = False

# Load HuggingFace sentiment pipeline
sentiment_pipeline = pipeline("sentiment-analysis")

# Map emotions to genres
def feelings_to_genre(feeling):
    feeling_map = {
        'happy': 'Comedy',
        'sad': 'Drama',
        'excited': 'Action',
        'scared': 'Horror',
        'romantic': 'Romance',
        'angry': 'Thriller',
        'surprised': 'Adventure'
    }
    return feeling_map.get(feeling.lower())

# Analyze emotion from text input
def analyze_feeling(user_input):
    result = sentiment_pipeline(user_input)[0]
    if result['label'] == 'POSITIVE':
        return 'happy'
    elif result['label'] == 'NEGATIVE':
        return 'sad'
    else:
        return 'neutral'

# Recommend a movie based on genre
def suggest_movie_by_genre(feeling):
    genre = feelings_to_genre(feeling)
    if genre:
        suggestions = movies_df[movies_df['genre'].str.contains(genre, na=False)]
        if not suggestions.empty:
            return suggestions.sample(n=1)['title'].values[0]
    return "No suggestions found."

# Recommend using LightFM if user is known
def suggest_movie_by_lightfm(username, topn=3):
    if not lightfm_enabled or username not in user_mapping:
        return None

    user_id = user_mapping[username]
    n_items = len(item_mapping)
    scores = model.predict(user_id, np.arange(n_items))
    top_items = np.argsort(-scores)[:topn]
    return [reverse_item_mapping[i] for i in top_items]

# Frontend route
@app.route('/')
def home():
    return render_template('index.html')

# API route: POST-based emotion analysis
@app.route('/analyze', methods=['POST'])
def analyze():
    user_input = request.json.get('input')
    username = request.json.get('user')

    feeling = analyze_feeling(user_input)

    if username and username in user_mapping:
        recommendations = suggest_movie_by_lightfm(username)
    else:
        recommendations = [suggest_movie_by_genre(feeling)]

    return jsonify({'recommendations': recommendations, 'feeling': feeling})

# Optional GET route: mood-only or user-based
@app.route('/recommend', methods=['GET'])
def recommend():
    feeling = request.args.get('feeling')
    username = request.args.get('user')

    if username and username in user_mapping:
        recommendations = suggest_movie_by_lightfm(username)
    elif feeling:
        recommendations = [suggest_movie_by_genre(feeling)]
    else:
        recommendations = ["No user or feeling provided."]

    return jsonify({'recommendations': recommendations})

if __name__ == '__main__':
    app.run(debug=True)
