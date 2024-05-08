function trimTextBox(textBox) {
    textBox.value = textBox.value.trim();
  }
  
  // Usage:
//   const textBox = document.getElementById("myTextBox");
//   textBox.addEventListener("change", () => trimTextBox(textBox));
  
  // Or for onblur event:
//   textBox.addEventListener("blur", () => trimTextBox(textBox));

  
  const text = "  mother fucker  "
  trimTextBox(text)

