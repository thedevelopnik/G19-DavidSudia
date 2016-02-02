var calHTML = '<h2 class="removeWidget">Upcoming Events</h2><div id="authorize-div"><span>Authorize access to Google Calendar API</span><!--Button for the user to click to initiate auth sequence --><button id="authorize-button" onclick="handleAuthClick(event)">Authorize</button></div><article id="output"></article>';

function makeCal() {
  var cal = new Calendar('723061971439-dv1pbtq741e2dk5n05psbrnufa99p4cj', ["https://www.googleapis.com/auth/calendar.readonly"]);
  cal.checkAuth();
  cal.handleAuthResult();
  cal.handleAuthClick();
  cal.loadCalendarApi();
  cal.listUpcomingEvents();
  cal.appendCalList();
}

var Calendar = function(apiKey, scope) {
  this.CLIENT_ID = apiKey;
  this.SCOPES = scope;
  var self = this;

  this.checkAuth = function() {
    gapi.auth.authorize(
    {
      'client_id': self.CLIENT_ID,
      'scope': self.SCOPES.join(' '),
      'immediate': true
    }, self.handleAuthResult);
  }

  this.handleAuthResult = function(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    authorizeDiv.style.display = 'none';
    self.loadCalendarApi();
    } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    authorizeDiv.style.display = 'inline';
    }
  }

  this.handleAuthClick = function(event) {
    gapi.auth.authorize(
      {client_id: self.CLIENT_ID, scope: self.SCOPES, immediate: false},
      self.handleAuthResult);
    return false;
  }

  this.loadCalendarApi = function() {
    gapi.client.load('calendar', 'v3', self.listUpcomingEvents);
  }

  this.listUpcomingEvents = function() {
    var request = gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 7,
      'orderBy': 'startTime'
    });

    request.execute(function(resp) {
      var events = resp.items;
      self.appendCalList('Your upcoming events:');
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
          self.appendCalList('<p>' + event.summary + ' (' + eventDate + ')</p>');
        }
      } else {
        self.appendCalList('No upcoming events found.');
      }

    });
  }

  this.appendCalList = function(message) {
    var art = document.getElementById('output');
    var newListItem = document.createElement('p');
    newListItem.innerHTML = message;
    art.appendChild(newListItem);
    msnry.layout();
  }
}