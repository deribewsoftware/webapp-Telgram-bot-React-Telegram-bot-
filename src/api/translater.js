import translate from 'google-translate-api'

const sourceText = 'Hello, world!';
const targetLanguage = 'am';  // Amharic language code


translate(sourceText, { to: targetLanguage }).then(response => {
    console.log(`Original text:- ${sourceText}`);
    console.log(`Translated text:- ${response.text}`);
}).catch(error => {
    console.error('Error:-', error);
});