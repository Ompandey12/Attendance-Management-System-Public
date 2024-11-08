let config = {};
let attempts = 0;
const maxAttempts = 3;

// Fetch configuration data from server
fetch('/api/config')
    .then(response => response.json())
    .then(data => {
        config = data;
        console.log("Fetched config:", config);
    })
    .catch(error => console.error('Error fetching config:', error));

async function validateLogin() {
    const passwordInput = document.getElementById('passwordInput').value;
    console.log("Entered Password:", passwordInput);

    try {
        // Validate password against fetched config data
        if (passwordInput === config.loginPassword) {
            document.getElementById('loginPage').classList.remove('active');
            document.getElementById('mainPage').classList.add('active');
        } else {
            attempts++;
            if (attempts >= maxAttempts) {
                alert('You have exceeded the maximum number of login attempts.');
                document.querySelector('.button').disabled = true;
            } else {
                alert('Incorrect password. Please try again.');
            }
        }
    } catch (error) {
        console.error('Error validating login:', error);
    }
}

function populateSecondDropdown() {
    const mainDropdown = document.getElementById('locationDropdown');
    const subDropdown = document.getElementById('subLocationDropdown');
    const selectedLocation = mainDropdown.value;

    // Clear and reset sub-location dropdown
    subDropdown.innerHTML = '<option value="" disabled selected>Select a sub-location</option>';

    if (selectedLocation && config.locations[selectedLocation]) {
        subDropdown.disabled = false;
        Object.keys(config.locations[selectedLocation]).forEach(subLocation => {
            const option = document.createElement('option');
            option.value = config.locations[selectedLocation][subLocation];
            option.textContent = subLocation;
            subDropdown.appendChild(option);
        });
    } else {
        subDropdown.disabled = true;
    }
}

function navigateToLocation() {
    const subDropdown = document.getElementById('subLocationDropdown');
    const selectedValue = subDropdown.value;

    if (selectedValue) {
        window.location.href = selectedValue;
    } else {
        alert('Please select a sub-location!');
    }
}
