function translateText() {
    const DEEPL_API_KEY = "YOUR_API_KEY";
    const textToTranslate = process.argv[2] || "你好吗?";
    const targetLanguage = process.argv[3] || "en";
    const url = "https://api-free.deepl.com/v2/translate";
    const params = new URLSearchParams();
    params.append("auth_key", DEEPL_API_KEY);
    params.append("text", textToTranslate);
    params.append("target_lang", targetLanguage);
    fetch(url, {
        method: "POST",
        body: params,
    })
        .then((response) => response.json())
        .then((data) => {
        const translatedText = data.translations[0].text;
        console.log(`Original Text: ${textToTranslate}\nTranslated Text: ${translatedText}`);
    });
}
translateText();
export {};
