function autocomplete(input, latInput, lngInput) {
    //Skip this fn if there is no input on the page
    if(!input) return;

    const dropdown = new google.maps.places.Autocomplete(input);

    dropdown.addListener('place-changed', () => {
        const place = dropdown.getPlace();
        
        latInput.value = place.geometry.location.lat();
        lngInput.value = place.geometry.location.lng();
    })
    //If user hits 'enter' dont submit
    input.om('keydown', (e) => {
        if(e.keyCode === 13) e.preventDefault();
    })
}

export default autocomplete;