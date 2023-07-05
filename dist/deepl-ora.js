var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ora from "ora";
import dotenv from "dotenv";
import prompts from "prompts";
import chalk from "chalk";
dotenv.config();
const oraSpinner = ora();
function translateText() {
    return __awaiter(this, void 0, void 0, function* () {
        const DEEPL_API_KEY = process.env["DEEPL_API_KEY"];
        const languageChoices = [
            { title: "English", value: "en" },
            { title: "Chinese", value: "zh" },
        ];
        const response = yield prompts([
            {
                type: "select",
                name: "targetLanguage",
                message: "Select the target language:",
                choices: languageChoices,
                initial: 0,
            },
            {
                type: "text",
                name: "textToTranslate",
                message: "Enter the text to translate:",
                initial: "你好",
            },
        ]);
        const targetLanguage = response.targetLanguage;
        const textToTranslate = response.textToTranslate;
        const url = "https://api-free.deepl.com/v2/translate";
        const params = new URLSearchParams();
        params.append("auth_key", DEEPL_API_KEY);
        params.append("text", textToTranslate);
        params.append("target_lang", targetLanguage);
        oraSpinner.start("Translating text ... ");
        fetch(url, {
            method: "POST",
            body: params,
        })
            .then((response) => response.json())
            .then((data) => {
            const translatedText = data.translations[0].text;
            console.log(`Original Text: ${chalk.bgYellow.black(textToTranslate)}\nTranslated Text: ${chalk.bgGreen.black(translatedText)}`);
        })
            .catch(() => oraSpinner.fail("程序异常"))
            .finally(() => oraSpinner.stop());
    });
}
translateText();
