import ora, { oraPromise } from "ora";
import dotenv from "dotenv";
import prompts from "prompts";
import chalk from "chalk";

dotenv.config();

const oraSpinner = ora();

async function translateText() {
  const DEEPL_API_KEY = process.env["DEEPL_API_KEY"];
  if (!DEEPL_API_KEY) {
    // TODO: use chalk
    oraSpinner.fail("⚠ Your DEEPL_API_KEY is not set");
    return;
  }

  const languageChoices = [
    { title: "English", value: "en" },
    { title: "Chinese", value: "zh" },
    { title: "退出", value: "exit" },
  ];

  let continueTranslation = true;

  while (continueTranslation) {
    const response = await prompts([
      {
        type: "select",
        name: "targetLanguage",
        message: "Select the target language:",
        choices: languageChoices,
        initial: 0,
      },
      {
        type: (prev) => (prev == "exit" ? null : "text"),
        name: "textToTranslate",
        message: "Enter the text to translate:",
        initial: "你好",
      },
    ]);

    if (response.targetLanguage === "exit") {
      continueTranslation = false;
      break;
    }

    const targetLanguage = response.targetLanguage;
    const textToTranslate = response.textToTranslate;

    const url = "https://api-free.deepl.com/v2/translate";
    const params = new URLSearchParams();
    params.append("auth_key", DEEPL_API_KEY as string);
    params.append("text", textToTranslate);
    params.append("target_lang", targetLanguage);

    await oraPromise(
      fetch(url, {
        method: "POST",
        body: params,
      })
        .then((response) => response.json())
        .then((data) => {
          const translatedText = data.translations[0].text;
          console.log(
            `Original Text ⧐ ${chalk.bgYellow.black(
              textToTranslate
            )}\nTranslated Text ⇢ ${chalk.bgGreen.black(translatedText)}`
          );
        })
        .catch(() => oraSpinner.fail("程序异常"))
        .finally(() => oraSpinner.stop())
    );
  }
}

translateText();
