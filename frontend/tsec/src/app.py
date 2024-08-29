import streamlit as st
import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder
from sklearn.metrics.pairwise import cosine_similarity

# Function to process and find top matches
def find_top_matches(children_df, elderly_df, num_matches=5):
    all_likes_dislikes_hobbies = pd.concat([elderly_df[['Likes', 'Dislikes', 'Hobbies']], 
                                            children_df[['Likes', 'Dislikes', 'Hobbies']]], 
                                           ignore_index=True)

    # Initialize the OneHotEncoder
    encoder = OneHotEncoder(handle_unknown='ignore', sparse_output=False)
    encoded_features = encoder.fit_transform(all_likes_dislikes_hobbies)

    # Split the encoded features back into elderly and children data
    num_elderly = elderly_df.shape[0]
    elderly_features = encoded_features[:num_elderly]
    children_features = encoded_features[num_elderly:]

    # Calculate the cosine similarity
    similarity_matrix = cosine_similarity(children_features, elderly_features)

    # Find the top 5 matches for each child
    top_matches_indices = similarity_matrix.argsort(axis=1)[:, -num_matches:]
    top_matches_scores = np.take_along_axis(similarity_matrix, top_matches_indices, axis=1)

    return top_matches_indices, top_matches_scores

# Streamlit app
st.title("Orphanage and Elderly Home Match Finder")
st.write("Upload the CSV files and input the name of the child or elderly person to find the top 5 matches.")

# Upload CSV files
children_file = st.file_uploader("Upload Children CSV", type=["csv"])
elderly_file = st.file_uploader("Upload Elderly CSV", type=["csv"])

if children_file and elderly_file:
    children_df = pd.read_csv(children_file)
    elderly_df = pd.read_csv(elderly_file)

    st.write("Children and Elderly data loaded successfully!")

    # Find top matches
    top_matches_indices, top_matches_scores = find_top_matches(children_df, elderly_df)

    # Get the name from user input
    name = st.text_input("Enter the name of the child or elderly person:")

    if name:
        if name in children_df['Name'].values:
            child_index = children_df[children_df['Name'] == name].index[0]
            st.write(f"Top 5 elderly matches for {name}:")
            for rank, idx in enumerate(reversed(top_matches_indices[child_index])):
                elderly_name = elderly_df.iloc[idx]['Name']
                score = top_matches_scores[child_index, len(top_matches_indices[child_index]) - 1 - rank]
                st.write(f"  Rank {rank + 1}: {elderly_name} with similarity score {score:.2f}")

        elif name in elderly_df['Name'].values:
            elderly_index = elderly_df[elderly_df['Name'] == name].index[0]
            st.write(f"Top 5 child matches for {name}:")
            children_similarity_scores = similarity_matrix[:, elderly_index]
            top_children_indices = children_similarity_scores.argsort()[-num_matches:]
            for rank, idx in enumerate(reversed(top_children_indices)):
                child_name = children_df.iloc[idx]['Name']
                score = children_similarity_scores[idx]
                st.write(f"  Rank {rank + 1}: {child_name} with similarity score {score:.2f}")
        else:
            st.write("Name not found in the datasets.")