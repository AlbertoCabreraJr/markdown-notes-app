const axios = require("axios");

exports.checkGrammar = async (content) => {
  const response = await axios.post(
    'https://api.languagetool.org/v2/check',
    new URLSearchParams({ text: content, language: 'en-US' }).toString(),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  return response.data;
}