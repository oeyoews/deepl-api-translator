import ora from "ora";
import dotenv from "dotenv";
import prompts from "prompts";

dotenv.config();

const oraSpinner = ora();

async function translateText() {
  const DEEPL_API_KEY = process.env["DEEPL_API_KEY"];
  const targetLanguage = process.argv[3] || "en";

  const response = await prompts([
    {
      type: "text",
      name: "textToTranslate",
      message: "Enter the text to translate:",
      initial: "你好",
    },
  ]);

  const textToTranslate = response.textToTranslate;

  const url = "https://api-free.deepl.com/v2/translate";
  const params = new URLSearchParams();
  params.append("auth_key", DEEPL_API_KEY as string);
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
      console.log(
        `Original Text: ${textToTranslate}\nTranslated Text: ${translatedText}`
      );
    })
    .catch(() => oraSpinner.fail("程序异常"))
    .finally(() => oraSpinner.stop());
}

translateText();
