import streamlit as st
import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder
from sklearn.metrics.pairwise import cosine_similarity

import matplotlib.pyplot as plt
import seaborn as sns


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


    return top_matches_indices, top_matches_scores, similarity_matrix

# Function to display elderly charts
def display_elderly_charts(elderly_df):
    st.header("Elderly Data Visualization")

    # Gender distribution - Pie Chart
    gender_counts = elderly_df['Gender'].value_counts()
    fig1, ax1 = plt.subplots(figsize=(6, 4))
    ax1.pie(gender_counts.values, labels=gender_counts.index, autopct='%1.1f%%', colors=sns.color_palette("pastel"))
    ax1.set_title('Gender Distribution')

    # Disability distribution - Bar Chart
    disability_counts = elderly_df['Disabilities'].value_counts()
    fig2, ax2 = plt.subplots(figsize=(6, 4))
    sns.barplot(x=disability_counts.index, y=disability_counts.values, palette="muted", ax=ax2)
    ax2.set_title('Disability Distribution')
    ax2.set_ylabel('Count')
    ax2.set_xlabel('Disabilities')

    # Row 1
    col1, col2 = st.columns(2)
    with col1:
        st.pyplot(fig1)
    with col2:
        st.pyplot(fig2)

    # Disease distribution - Line Chart
    disease_counts = elderly_df['Diseases'].value_counts()
    fig3, ax3 = plt.subplots(figsize=(6, 4))
    sns.lineplot(x=disease_counts.index, y=disease_counts.values, marker='o', ax=ax3)
    ax3.set_title('Disease Distribution')
    ax3.set_ylabel('Count')
    ax3.set_xlabel('Disease')
    ax3.set_xticklabels(disease_counts.index, rotation=45)

    # Likes distribution - Bar Chart
    likes_counts = elderly_df['Likes'].value_counts()
    fig4, ax4 = plt.subplots(figsize=(6, 4))
    sns.barplot(x=likes_counts.index, y=likes_counts.values, palette="bright", ax=ax4)
    ax4.set_title('Likes Distribution')
    ax4.set_ylabel('Count')
    ax4.set_xlabel('Likes')
    ax4.set_xticklabels(likes_counts.index, rotation=45)

    # Row 2
    col3, col4 = st.columns(2)
    with col3:
        st.pyplot(fig3)
    with col4:
        st.pyplot(fig4)

    # Dislikes distribution - Pie Chart
    dislikes_counts = elderly_df['Dislikes'].value_counts()
    fig5, ax5 = plt.subplots(figsize=(6, 4))
    ax5.pie(dislikes_counts.values, labels=dislikes_counts.index, autopct='%1.1f%%', colors=sns.color_palette("colorblind"))
    ax5.set_title('Dislikes Distribution')

    # Hobbies distribution - Line Chart
    hobbies_counts = elderly_df['Hobbies'].value_counts()
    fig6, ax6 = plt.subplots(figsize=(6, 4))
    sns.lineplot(x=hobbies_counts.index, y=hobbies_counts.values, marker='o', ax=ax6)
    ax6.set_title('Hobbies Distribution')
    ax6.set_ylabel('Count')
    ax6.set_xlabel('Hobbies')
    ax6.set_xticklabels(hobbies_counts.index, rotation=45)

    # Row 3
    col5, col6 = st.columns(2)
    with col5:
        st.pyplot(fig5)
    with col6:
        st.pyplot(fig6)

# Streamlit app
st.title("Orphanage and Elderly Home Match Finder & Elderly Data Visualization")

    return top_matches_indices, top_matches_scores


# st.title("Orphanage and Elderly Home Match Finder")
# st.write("Upload the CSV files and input the name of the child or elderly person to find the top 5 matches.")


# Upload CSV files
children_file = st.file_uploader("Upload Children CSV", type=["csv"])
elderly_file = st.file_uploader("Upload Elderly CSV", type=["csv"])

if children_file and elderly_file:
    children_df = pd.read_csv(children_file)
    elderly_df = pd.read_csv(elderly_file)

    st.write("Children and Elderly data loaded successfully!")

    # Find top matches

    top_matches_indices, top_matches_scores, similarity_matrix = find_top_matches(children_df, elderly_df)


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

    # Display charts for elderly data
    display_elderly_charts(elderly_df)

            st.write("Name not found in the datasets.")

