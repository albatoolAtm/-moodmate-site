from flask import Flask, request, jsonify, render_template
import pandas as pd
from transformers import pipeline

app = Flask(__name__)

# Load the movie database
movies_df = pd.read_csv('imdb_clean.csv')  # Update the filename

# Initialize the sentiment analysis pipeline
sentiment_pipeline = pipeline("sentiment-analysis")

def feelings_to_genre(feeling):
    feeling_map = {
        'happy': 'Comedy',
        'sad': 'Drama',
        'excited': 'Action',
        'scared': 'Horror',
        'romantic': 'Romance'
    }
    return feeling_map.get(feeling.lower(), None)

def analyze_feeling(user_input):
    result = sentiment_pipeline(user_input)[0]
    if result['label'] == 'POSITIVE':
        return 'happy'
    elif result['label'] == 'NEGATIVE':
        return 'sad'
    else:
        return 'neutral'

def suggest_movie(feeling):
    genre = feelings_to_genre(feeling)
    if genre:
        suggestions = movies_df[movies_df['genre'].str.contains(genre, na=False)]  # Ensure 'genre' matches column name
        return suggestions.sample(n=1)['title'].values[0] if not suggestions.empty else "No suggestions found."
    return "No valid feeling detected."

@app.route('/')
def home():
    return render_template('index.html')  # Ensure index.html is in templates folder

@app.route('/analyze', methods=['POST'])
def analyze():
    user_input = request.json.get('input')
    feeling = analyze_feeling(user_input)
    suggestion = suggest_movie(feeling)
    return jsonify({'suggestion': suggestion})

if __name__ == '__main__':
    app.run(debug=True)