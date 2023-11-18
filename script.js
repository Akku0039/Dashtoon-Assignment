
let panelCount = 0;

document.getElementById('comicForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const panelTexts = Array.from({ length: panelCount }, (_, i) => {
    const inputId = `comicText${i + 1}`;
    return document.getElementById(inputId).value;
  });

  generateComic(panelTexts);
});

function generateComic(panelTexts) {
  const comicOutput = document.getElementById('comicOutput');
  comicOutput.innerHTML = '';

  panelTexts.forEach(async (text, index) => {
    const imageURL = await query({ "inputs": text });
    const imageElement = document.createElement('img');
    imageElement.src = imageURL;
    comicOutput.appendChild(imageElement);
  });
}

function createPanelInput(index) {
  const inputContainer = document.createElement('div');
  inputContainer.classList.add('panel-input');

  const label = document.createElement('label');
  label.for = `comicText${index}`;
  label.textContent = `Enter Comic Text (Panel ${index}):`;

  const textarea = document.createElement('textarea');
  textarea.id = `comicText${index}`;
  textarea.rows = '4';
  textarea.cols = '30';
  textarea.required = true;

  inputContainer.appendChild(label);
  inputContainer.appendChild(textarea);

  return inputContainer;
}

function addPanel() {
  if (panelCount < 10) {
    panelCount++;
    const panelContainer = document.getElementById('panels');
    const panelInput = createPanelInput(panelCount);
    panelContainer.appendChild(panelInput);
  } else {
    alert('You can add up to 10 panels.');
  }
}

async function query(data) {
    const response = await fetch(
      "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
      {
        headers: {
          "Accept": "image/png",
          "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to generate comic');
    }
    const result = await response.blob();
    return result;
  }
  

// Initial setup with one panel
addPanel();
