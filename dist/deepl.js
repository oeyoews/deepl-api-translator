function translateText() {
  var DEEPL_API_KEY = "Your api key";
  var textToTranslate = process.argv[2] || "你好吗?";
  var targetLanguage = process.argv[3] || "en";
  var url = "https://api-free.deepl.com/v2/translate";
  var params = new URLSearchParams();
  params.append("auth_key", DEEPL_API_KEY);
  params.append("text", textToTranslate);
  params.append("target_lang", targetLanguage);
  fetch(url, {
    method: "POST",
    body: params,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var translatedText = data.translations[0].text;
      console.log(
        "Original Text: "
          .concat(textToTranslate, "\nTranslated Text: ")
          .concat(translatedText)
      );
    });
}
translateText();
export {};
