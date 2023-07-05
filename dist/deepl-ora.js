import ora from "ora";
import dotenv from "dotenv";
dotenv.config();
const oraSpinner = ora();
function translateText() {
    const DEEPL_API_KEY = process.env["DEEPL_API_KEY"];
    const textToTranslate = process.argv[2] || "你好";
    const targetLanguage = process.argv[3] || "en";
    const url = "https://api-free.deepl.com/v2/translate";
    const params = new URLSearchParams();
    params.append("auth_key", DEEPL_API_KEY);
    params.append("text", textToTranslate);
    params.append("target_lang", targetLanguage);
    oraSpinner.start("Translating");
    fetch(url, {
        method: "POST",
        body: params,
    })
        .then((response) => response.json())
        .then((data) => {
        const translatedText = data.translations[0].text;
        console.log(`Original Text: ${textToTranslate}\nTranslated Text: ${translatedText}`);
    })
        .catch(() => oraSpinner.fail("程序异常"))
        .finally(() => oraSpinner.stop());
}
translateText();
