// Wait for the document to be ready
$(document).ready(function() {
    // Get the current date and display it at the top of the calendar
    const currentDate = dayjs().format('dddd, MMMM D, YYYY');
    $('#currentDay').text(currentDate);
  
    // Loop to dynamically generate timeblocks for standard business hours
    for (let hour = 9; hour <= 17; hour++) {
      // Create timeblock elements (e.g., divs for each hour)
      const timeblock = $('<div>').addClass('time-block row');
      const hourLabel = $('<div>').addClass('hour col-md-1').text(hour + ':00 AM');
      const eventInput = $('<textarea>').addClass('description col-md-10');
      const saveButton = $('<button>').addClass('saveBtn col-md-1').html('<i class="fas fa-save"></i>');
  
      // Add classes for past, present, or future timeblocks
      if (hour < dayjs().hour()) {
        timeblock.addClass('past');
      } else if (hour === dayjs().hour()) {
        timeblock.addClass('present');
      } else {
        timeblock.addClass('future');
      }
  
      // Add event listeners for saving events
      saveButton.on('click', function() {
        const eventText = eventInput.val();
        localStorage.setItem(`event-${hour}`, eventText);
      });
  
      // Load saved events from local storage
      const savedEvent = localStorage.getItem(`event-${hour}`);
      if (savedEvent) {
        eventInput.val(savedEvent);
      }
  
      // Append elements to the container
      timeblock.append(hourLabel, eventInput, saveButton);
      $('.container').append(timeblock);
    }
  });
  