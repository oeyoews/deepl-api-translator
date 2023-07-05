function translateText(textToTranslate: "Hello", targetLanguage: "ZH") {
  const apiKey = "eaaa775e-c347-582b-b1b2-80ccd8f60b13:fx";

  const url = "https://api-free.deepl.com/v2/translate";
  const params = new URLSearchParams();
  params.append("auth_key", apiKey);
  params.append("text", textToTranslate);
  params.append("target_lang", targetLanguage);

  fetch(url, {
    method: "POST",
    body: params,
  })
    .then((response) => response.json())
    .then((data) => {
      const translatedText = data.translations[0].text;
      console.log("Translated text:", translatedText);
    })
    .catch((error) => console.log(error));
}

translateText();