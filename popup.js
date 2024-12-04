document.addEventListener('DOMContentLoaded', function () {
    const generateBtn = document.getElementById('generate-btn');
    const saveBtn = document.getElementById('save-btn');
    const passwordInput = document.getElementById('generated-password');
    const savedPasswordsList = document.getElementById('saved-passwords');
  
    // Function to generate a secure password
    function generatePassword() {
      const password = generateSecurePassword();
      passwordInput.value = password;
    }
  
    // Function to save the password
    function savePassword() {
      const password = passwordInput.value;
      if (password) {
        chrome.storage.local.get(['savedPasswords'], function(result) {
          let savedPasswords = result.savedPasswords || [];
          savedPasswords.push(password);
          chrome.storage.local.set({savedPasswords: savedPasswords}, function() {
            displaySavedPasswords();
          });
        });
      }
    }
  
    // Display saved passwords
    function displaySavedPasswords() {
      chrome.storage.local.get(['savedPasswords'], function(result) {
        const savedPasswords = result.savedPasswords || [];
        savedPasswordsList.innerHTML = savedPasswords.map(password => {
          return `<li>${password}</li>`;
        }).join('');
      });
    }
  
    // Event Listeners
    generateBtn.addEventListener('click', generatePassword);
    saveBtn.addEventListener('click', savePassword);
  
    // Initial display of saved passwords
    displaySavedPasswords();
  });
  