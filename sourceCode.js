// APIkey and chatGPT model details
const apiKey = "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";
const model = "gpt-3.5-turbo"; 

// Creates a custom menu in Google Docs
function onOpen() {
  DocumentApp.getUi().createMenu("OpenAI ChatGPT")
      .addItem("Generate Blog Post", "generateIdeas")
      .addItem("Generate LinkedIn Post", "linkedInPost")
      .addToUi();
}


// generates texts and adds it to the document
function generateIdeas() {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const paragraphs = body.getParagraphs();
  const selectedText = paragraphs[0].getText();
  const prompt = "generate blog post on " + selectedText;
  const temperature = 0.5;
  const maxTokens = 2060;

  const requestBody = {
    model: model,
    messages: [{role: "user", content: prompt}],
    temperature,
    max_tokens: maxTokens,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKey,
    },
    payload: JSON.stringify(requestBody),
  };


  const response = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", requestOptions);
  const responseText = response.getContentText();
  const json = JSON.parse(responseText);
  const outputResult = json['choices'][0]['message']['content'];
  body.appendParagraph(outputResult.toString());
}

function linkedInPost() {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const paragraphs = body.getParagraphs();
  const selectedText = paragraphs[0].getText();
  const prompt = "generate 5 linkedIn post on " + selectedText;
  const temperature = 0.5;
  const maxTokens = 2060;

  const requestBody = {
    model: model,
    messages: [{role: "user", content: prompt}],
    temperature,
    max_tokens: maxTokens,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKey,
    },
    payload: JSON.stringify(requestBody),
  };


  const response = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", requestOptions);
  const responseText = response.getContentText();
  const json = JSON.parse(responseText);
  const outputResult = json['choices'][0]['message']['content'];
  body.appendParagraph(outputResult.toString());
}
