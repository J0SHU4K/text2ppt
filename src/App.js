import './App.css';
import pptxgen from "pptxgenjs";
import React from 'react';

// cache
let lyrics;

// reader
const reader = new FileReader();  
const fileInput = document.getElementById('input-file');
if (fileInput) {
  fileInput.addEventListener('change', function() {
    reader.onload = function() {  
      FileInput.updateInput(reader.result);
    }
    reader.readAsText(this.files[0]);
  });
}

if (true) {
  let x = 0;
}

class FileInput extends React.Component {
  state = {
    input: ""
  };
  
  updateInput(fileInput) {
    this.setState({input: fileInput});
  }

}

function convert() { 
  lyrics = document.getElementById('input').value;
  
  // debugger
  // file reader listener
  if (document.getElementById("input-file").files.length !== 0 ) {
    readFile();
  } 
  if(!lyrics) {
    return;
  }

  alert(lyrics);
  
  let arr = lyrics.split(/\r\n\r\n|\n\r\n\r|\n\n|\r\r/);  
  
  // filter extra newline
  arr = arr.filter(text => text !== '');

  // 1. Create a Presentation
  let pres = new pptxgen();
  
  for (let i = 0; i < arr.length; ++i) {
    // 2. Add a Slide to the presentation
    let slide = pres.addSlide();

    // 3. Add 1+ objects (Tables, Shapes, etc.) to the Slide
    slide.addText(arr[i], {
      x: 1.5,
      y: 1.5,
      color: "f1f1f1",
      align: pres.AlignH.center,
      fontSize: 20
    });

    slide.background = {
      color: '1e1e1e',
      transparency: 50
    };
  }

  // 4. Save the Presentation
  // pres.writeFile({ fileName: "Worship.pptx" });

  // reset file storage to blank
  document.getElementById('temp').value = '';
}

function readFile() {
  // const [file] = document.querySelector("input[type=file]").files;

  // if (file) {
  //   reader.readAsText(file);
  // }

  // reader.onload = () => {
  //   document.getElementById('temp').value = reader.result;
  // }

  lyrics = FileInput.state.input;
}

// generate preview
function preview() {
  // put something here
}

function App() {  
  return (
    <div className="App">
      <div className='content'>
        <h1>Text to PPT Converter</h1>
        <h3>Paste the lyrics and separate them with an empty line to make them into individual slides.</h3>
        <textarea id='input' name="paragraph_text" cols="50" rows="30"></textarea>
        <div>
          <label htmlFor="input-file">Or you can also specify a txt file:</label>
          <br></br>
          <input type="file" id="input-file"  accept="text/*" />
          <br></br>
          <button type='button' id='clear'>Clear file</button>
          <br/><br/>
          <button type='button' onClick={convert}>Convert</button>
          <br/><br/>
          <button type='button' onClick={preview}>Preview</button>
          <br></br>
        </div>
        <div id='temp'></div>
      </div>
    </div>
  );
}

export default App;