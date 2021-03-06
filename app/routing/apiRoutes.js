var textToSpeech = require("../utils");
var translate = require("google-translate-api");

module.exports = function(app) {
  app.post("/api/phrase", function(req, res) {
    var data = req.body;
    var language = data.language;
    if (language === "English") {
      language = "en-US";
    } else if (language === "French") {
      language = "fr-FR";
    } else if (language === "Japanese") {
      language = "ja-JP";
    } else if (language === "Spanish") {
      language = "es-ES";
    } else if (language === "Italian") {
      language = "it-IT";
    } else if (language === "German") {
      language = "de-DE";
    }

    var phrase = data.phrase;

    var resultPhrase = translate(phrase, {
      to: language.slice(0, 2)
    })
      .then(res => {
        var translatedPhrase = res.text;
        // console.log(res.text);

        //=> text to speech
        var uniqueId = textToSpeech(translatedPhrase, language);
        return {
          translatedPhrase,
          uniqueId
        };
      })
      .catch(err => {
        console.error(err);
      });

    resultPhrase.then(
      function(result) {
        res.send(result); // "Stuff worked!"
        console.log(result);
      },
      function(err) {
        console.log(err); // Error: "It broke"
      }
    );
  });
};
