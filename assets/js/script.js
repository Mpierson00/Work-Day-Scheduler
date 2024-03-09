$(function () {
  // Function to update time blocks and current time every minute
  function updateTimeBlocksAndCurrentTime() {
    generateTimeBlocks();
    colorCodeTimeBlocks();
    displayCurrentDate();
  }

  // Display current date at the top of the calendar
  function displayCurrentDate() {
    var currentDateTime = dayjs().format('dddd, MMMM D, YYYY');
    $('#currentDay').text(currentDateTime);
  }

  // Create time blocks for standard business hours
  function generateTimeBlocks() {
    var container = $('.container-lg');
    container.empty(); // Clear existing time blocks

    for (var hour = 9; hour <= 17; hour++) {
      var timeBlock = $('<div>')
        .addClass('row time-block')
        .attr('id', 'hour-' + hour);

      var hourDisplay = $('<div>')
        .addClass('col-2 col-md-1 hour text-center py-3')
        .text(hour > 12 ? hour - 12 + 'PM' : hour + 'AM');

      var textarea = $('<textarea>')
        .addClass('col-8 col-md-10 description')
        .attr('rows', 3);

      var saveBtn = $('<button>')
        .addClass('btn saveBtn col-2 col-md-1')
        .attr('aria-label', 'save')
        .html('<i class="fas fa-save" aria-hidden="true"></i>');

      timeBlock.append(hourDisplay, textarea, saveBtn);
      container.append(timeBlock);
    }
  }

  // Color code time blocks based on current time
  function colorCodeTimeBlocks() {
    var currentHour = dayjs().hour();

    $('.time-block').each(function() {
      var hour = parseInt($(this).attr('id').split('-')[1]);
      $(this).removeClass('past present future');
      if (hour < currentHour) {
        $(this).addClass('past');
      } else if (hour === currentHour) {
        $(this).addClass('present');
      } else {
        $(this).addClass('future');
      }
    });
  }

  // Load saved events from local storage
  function loadEvents() {
    $('.time-block').each(function() {
      var eventId = $(this).attr('id');
      var savedEvent = localStorage.getItem(eventId);
      $(this).find('textarea').val(savedEvent);
    });
  }

  // Save event to local storage
  $('.container-lg').on('click', '.saveBtn', function() {
    var eventText = $(this).siblings('.description').val();
    var eventId = $(this).parent().attr('id');
    localStorage.setItem(eventId, eventText);
  });

  // Initialize the application
  displayCurrentDate();
  generateTimeBlocks();
  colorCodeTimeBlocks();
  loadEvents();

  // Update time blocks and current time every minute
  setInterval(updateTimeBlocksAndCurrentTime, 60000);
});
