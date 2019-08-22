'use strict';
//formatQueryParams
function displayResults (responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  responseJson.data.forEach(element => {
    $('#results-list').append(
      `<li>
      <h3><a href="${element.url}">${element.fullName}</a></h3>
      <p>${element.description}</p>
      </li>`
      // if time: find address
    );
  });
}

function getParks(stateAbbrs, maxResults) {
  const states = stateAbbrs.join('&stateCode=');
  const allStates = `?stateCode=${states}`;
  const url = `https://developer.nps.gov/api/v1/parks${allStates}&limit=${maxResults}&api_key=zalg3DmlQbLGIgXCgheFMeeG63jYjj3QkVKBwU4r`;

  // const options = {
  //   headers: {
  //     "X-Api-Key": "zalg3DmlQbLGIgXCgheFMeeG63jYjj3QkVKBwU4r"
  //   }
  // };

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
  
}

function watchForm () {
  $('.park-finder').submit(event => {
    event.preventDefault();
    const stateAbbrs = $('#js-search-terms').val().split(' ');
    let maxResults = $('#js-max-results').val();
    if (!maxResults) {
      maxResults = 10;
    }
    getParks(stateAbbrs, maxResults);

  });}


$(watchForm)