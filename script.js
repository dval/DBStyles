//script.js

// list of colors to choose from
const colors = [
  '#000000', '#000080', '#0000FF', '#008000', '#008080',
  '#00FF00', '#00FFFF', '#191970', '#2E8B57', '#2F4F4F',
  '#3A5FCD', '#4682B4', '#483D8B', '#4B0082', '#556B2F',
  '#5D478B', '#5F9EA0', '#663399', '#6A5ACD', '#708090',
  '#7F0000', '#800000', '#800080', '#808000', '#808080',
  '#8B0000', '#8B008B', '#8B4513', '#A9A9A9', '#ADD8E6',
  '#AED581', '#B0E0E6', '#B2B2FF', '#B4EEB4', '#C0C0C0',
  '#CD5C5C', '#CD853F', '#D2B48C', '#D3D3D3', '#D8BFD8',
  '#DAB3E6', '#E0FFFF', '#E6E6FA', '#E89A74', '#F08080',
  '#F0F0F0', '#F2B077', '#F5F5DC', '#FAD02E', '#FAEBD7',
  '#FF6347', '#FF69B4', '#FF7F50', '#FF8C00', '#FFA07A',
  '#FFA500', '#FFB6C1', '#FFC0CB', '#FFD700', '#FFE4B5',
  '#FFEFD5', '#FFF5E1', '#FFFFFF'
];

// what happens when user selects a color
function selectColor(color) {
  // get the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (tab) {
      // set local storage
      chrome.storage.local.set({ DBStylesSelectColor: color });
      // send a message to the content script
      chrome.tabs.sendMessage(tab.id, {
        action: 'changeColor',
        color: color
      });
    }
  });
}

// when this page is loaded, build the color picker
window.addEventListener('DOMContentLoaded', (event) => {
  const colorPicker = document.getElementById('color-picker');
  colors.forEach((color) => {
    const colorBox = document.createElement('div');
    colorBox.className = 'color-box';
    colorBox.style.backgroundColor = color;
    colorBox.addEventListener('click', () => selectColor(color));
    colorPicker.appendChild(colorBox);
  });
});
