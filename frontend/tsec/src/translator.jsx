const translateText = async (text, targetLang) => {
  const apiKey = '9vzcvkVOwRzE8mmhD9CzpN4B6EZsZE79'; // Your API key
  const myHeaders = new Headers();
  myHeaders.append('apikey', apiKey);

  // Prepare the request body
  const raw = JSON.stringify({ text: text });

  const requestOptions = {
    method: 'POST',
    redirect: 'follow',
    headers: myHeaders,
    body: raw,
  };

  console.log("Target language:", targetLang); // Debugging log
  try {
    // Perform the API call
    const response = await fetch(
      `https://api.apilayer.com/language_translation/translate?target=${targetLang}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Translation API Response:", result); // Debugging log

    // Ensure that result and result.translations are valid before accessing
    if (result && result.translations && result.translations.length > 0) {
      return extractTranslatedText(result.translations[0].translation) || text;
    } else {
      console.error('Invalid response structure:', result);
      return text; // Fallback to original text on error
    }
  } catch (error) {
    console.error('Error during translation:', error);
    return text; // Fallback to original text on error
  }
};

// export default translateText;


const extractTranslatedText = (jsonString) => {
  try {
    // Find the indices of the third and last double quotes
    const firstQuoteIndex = jsonString.indexOf('"');
    const secondQuoteIndex = jsonString.indexOf('"', firstQuoteIndex + 1);
    const thirdQuoteIndex = jsonString.indexOf('"', secondQuoteIndex + 1);
    const lastQuoteIndex = jsonString.lastIndexOf('"');
    
    // Ensure indices are valid before extracting
    if (thirdQuoteIndex !== -1 && lastQuoteIndex !== -1 && lastQuoteIndex > thirdQuoteIndex) {
      return jsonString.substring(thirdQuoteIndex + 1, lastQuoteIndex);
    } else {
      throw new Error('Invalid JSON format or quotes not found as expected');
    }
  } catch (error) {
    console.error('Error extracting text:', error);
    return ''; // Return an empty string in case of error
  }
};


export default translateText;
