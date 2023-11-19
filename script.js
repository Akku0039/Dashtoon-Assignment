
let panelCount = 0;

document.getElementById('comicForm').addEventListener('submit', function (e) {
  e.preventDefault();
 // Extract panel text from inputs
  const panelTexts = Array.from({ length: panelCount }, (_, i) => {
    const inputId = `comicText${i + 1}`;
    return document.getElementById(inputId).value;
  });
// Generate comic using extracted panel texts
  generateComic(panelTexts);
});

// Define function to generate comic
function generateComic(panelTexts) {
  // Get comic output element
  const comicOutput = document.getElementById('comicOutput');
  // Clear previous comic output
  comicOutput.innerHTML = '';
  // Loop through panel texts and create comic panel for each text
  panelTexts.forEach(async (text, index) => {
    
    const imageURL = await query({ "inputs": text });
        // Create image element with the generated URL
    const imageElement = document.createElement('img');
    imageElement.src = imageURL;
     // Append image element to the comic output element
    comicOutput.appendChild(imageElement);
  });
}

// Function to create input element
function createPanelInput(index) {
   // Create container for input element
  const inputContainer = document.createElement('div');
  inputContainer.classList.add('panel-input');

// Create label for input element
  const label = document.createElement('label');
  label.for = `comicText${index}`;//Set 'for' attribute for label
  label.textContent = `Enter Comic Text (Panel ${index}):`;// Set label text

  // Create textarea for input element
  const textarea = document.createElement('textarea');
  textarea.id = `comicText${index}`; // Set 'id' attribute for textarea
  textarea.rows = '4';// Set number of rows for textarea
  textarea.cols = '30';// Set number of columns for textarea
  textarea.required = true;// Set 'required' attribute for textarea

  // Append label and textarea to input container
  inputContainer.appendChild(label);
  inputContainer.appendChild(textarea);

  // Return input container element
  return inputContainer;
}

//Check panel count
function addPanel() {
  if (panelCount < 10) { // Limit of 10 panels
    panelCount++;
    const panelContainer = document.getElementById('panels');
    const panelInput = createPanelInput(panelCount);
    panelContainer.appendChild(panelInput);
  } else {
    alert('You can add up to 10 panels.');
  }
}

// Query API with comic data
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
