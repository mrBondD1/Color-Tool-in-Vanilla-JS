'use strict';

// Selecting the elements
const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');
const sliderText = document.getElementById('slidertext');
const slider = document.getElementById('slider');
const alterbox = document.getElementById('alteredColor');
const alterColorText = document.getElementById('alteredColorText');
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');



// // Toggling the button
toggleBtn.addEventListener('click', () => {

  if(toggleBtn.classList.contains('toggled')){
    toggleBtn.classList.remove('toggled');
    lightenText.classList.remove('unselected');
    darkenText.classList.add('unselected');
  } 
  else {
    toggleBtn.classList.add('toggled');
    lightenText.classList.add('unselected');
    darkenText.classList.remove('unselected');
  } 

  reset();
})


// Changing the Slider Percentage value
slider.addEventListener('input', () => {

    // Check if hex is valid
    if(!isValidHex(hexInput.value)) return;

    sliderText.textContent = `${slider.value}%`;

    const valueAddition = toggleBtn.classList.contains('toggled') ? -slider.value : slider.value

    //get the altered hex value
    const alteredValue = alterColor(hexInput.value, valueAddition);

    //update the altered color
    alterbox.style.backgroundColor = alteredValue;
    alterColorText.innerText = `Altered Color ${alteredValue}`
})


// adding event of Input
hexInput.addEventListener('keyup', () => {
    const hex = hexInput.value;

    if(!isValidHex(hex)) return;

    const strippedHex = hex.replace('#', '');
    inputColor.style.backgroundColor = '#' + strippedHex;

})


// Checking the input hex value is valid or not
const isValidHex = value => {
    if(!value) return false;

    const strippedHex = value.replace('#', '');
    return strippedHex.length === 3 || strippedHex.length === 6;
}


// Converting Hex to RGB
const convertHexToRGB = hex => {
    if(!isValidHex(hex)) return null;

    let strippedHex = hex.replace('#', '');

    if(strippedHex.length === 3){
        strippedHex = strippedHex[0] +strippedHex[0] +  strippedHex[1] +strippedHex[1] +  strippedHex[2] +strippedHex[2];
    }
    const r = parseInt(strippedHex.substring(0,2), 16);
    const g = parseInt(strippedHex.substring(2,4), 16);
    const b = parseInt(strippedHex.substring(4,6), 16);
    return{r,g,b};
}

// console.log(convertHexToRGB('fff'));


const convertRGBToHex = (r,g,b) => {
   const firstPair = ('0' + r.toString(16)).slice(-2);
   const secondPair = ('0' + g.toString(16)).slice(-2);
   const theidPair = ('0' + b.toString(16)).slice(-2);

   const hex = '#' + firstPair + secondPair + theidPair;
   return hex;
}

console.log(convertRGBToHex(255,255,255));


// Alter color based on given percentage
const alterColor = (hex, percentage) => {
    const {r,g,b} = convertHexToRGB(hex);

    const amount = Math.floor((percentage/100)*255);

    const newR = withinRange(r, amount);
    const newG = withinRange(g, amount);
    const newB = withinRange(b, amount);

    return convertRGBToHex(newR, newG, newB);
}


const withinRange  = (hex, amount) => {

   return Math.min(255, Math.max(0, hex + amount));
}

const reset = () => {
    slider.value = 0;
    sliderText.innerText = '0%'
    alterbox.style.backgroundColor = hexInput.value;
    alterColorText.innerText = `Altered Color ${hexInput.value}` ;
}