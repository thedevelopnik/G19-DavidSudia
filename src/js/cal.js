// establish HTML to populate into DOM
var calHTML = '<h2 class="removeWidget">Upcoming Events</h2><div id="authorize-div"><span>Authorize access to Google Calendar API</span><!--Button for the user to click to initiate auth sequence --><button id="authorize-button" onclick="handleAuthClick(event)">Authorize</button></div><article id="output"></article>';

// API key
var CLIENT_ID = '723061971439-dv1pbtq741e2dk5n05psbrnufa99p4cj';

// set scopes for google API that client allows site to use
var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  var authorizeDiv = document.getElementById('authorize-div');
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    authorizeDiv.style.display = 'none';
    loadCalendarApi();
  } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    authorizeDiv.style.display = 'inline';
  }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

/**
 * Load Google Calendar client library. List upcoming events
 * once client library is loaded.
 */
function loadCalendarApi() {
  gapi.client.load('calendar', 'v3', listUpcomingEvents);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  var request = gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 7,
    'orderBy': 'startTime'
  });

  // what to do with data
  request.execute(function(resp) {
    var events = resp.items;

    // add header to events
    appendCalList('Your upcoming events:');

    // change date from ISO to standard format
    function convertDate(date) {
      var dateStr = date.toString();
      var formattedDate = new Date(dateStr);
      var forDateStr = formattedDate.toString();
      var dateTime = forDateStr.slice(0, 21);
      return dateTime;
    }
    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.date;
        if (!when) {
          when = event.start.dateTime;
          var eventDate = convertDate(when);
        }
        // append events
        appendCalList('<p>' + event.summary + ' (' + eventDate + ')</p>');
      }
      // if no events, append message
    } else {
      appendCalList('No upcoming events found.');
    }

  });
}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */


// how to create the list on the DOM
function appendCalList(message) {
  var art = document.getElementById('output');
  var newListItem = document.createElement('p');
  newListItem.innerHTML = message;
  art.appendChild(newListItem);
  msnry.layout();
}
