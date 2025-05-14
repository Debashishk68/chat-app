function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader(); // Built-in browser API
  
      reader.readAsDataURL(file); // Converts file to Base64
      reader.onload = () => resolve(reader.result); // Returns Base64 string
      reader.onerror = error => reject(error); // Handles error
    });
  }
  export default convertToBase64;