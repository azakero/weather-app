const weatherForm   = document.querySelector( 'form' );
const search        = document.querySelector( 'input' );
const messageOne    = document.querySelector( '#message-1' );
const dataContainer = document.querySelector( '.dataContainer' );

weatherForm.addEventListener( 'submit', async ( e ) => {
    e.preventDefault();

    const searchInput = search.value;
    const url         = '/';

    if ( searchInput === '' ) {
        messageOne.textContent  = 'You need to provide a location!';
        return;
    }

    dataContainer.innerHTML = '';
    messageOne.textContent  = 'Retrieving weather data...';

    const data = await fetch( url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            input: searchInput 
        })
    });

    const response = await data.json();
    let html = '';

    if ( response.data ) { 

        html = `
            <p>
                ${response.data.daily.data[ 0 ].summary} 
            </p>
            <p>
                It is currently ${response.data.currently.temperature} degrees out. 
            </p>
            <p>
                There is ${response.data.currently.precipProbability}% chance of rain!
            </p>
            <p>
                The current high of the day is ${response.data.daily.data[ 0 ].temperature} and the current low is ${response.data.daily.data[ 0 ].temperature}.
            </p>
        `;
        
    } else { 
        html = `<p>
            ${response.error} 
        </p>`
    } 
    
    messageOne.textContent  = '';
    dataContainer.innerHTML = html;
    
})