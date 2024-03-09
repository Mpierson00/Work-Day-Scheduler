$(function () {
  // Add a listener for click events on the save button
  $('.saveBtn').on('click', function () {
    var eventText = $(this).siblings('.description').val();
    var eventId = $(this).parent().attr('id');
    localStorage.setItem(eventId, eventText);
  });
})
  // Function to create a time block
  function createTimeBlock(hour, container) {
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

// Function to create time blocks for past, present, and future times
function generateTimeBlocks() {
  var container = $('.container-lg');
  var currentHour = dayjs().hour();

  // Clear the container
  container.empty();

  // Append past time blocks
  for (var hour = 9; hour < currentHour; hour++) {
    createTimeBlock(hour, container);
    $('.time-block').last().addClass('past');
  }

  // Append present time block
  if (currentHour >= 9 && currentHour <= 17) {
    createTimeBlock(currentHour, container);
    $('.time-block').last().addClass('present');
  }

  // Append future time blocks
  for (var hour = currentHour + 1; hour <= 17; hour++) {
    createTimeBlock(hour, container);
    $('.time-block').last().addClass('future');
  }
  // Display the current date and time in the header
  var currentDateTime = dayjs().format('dddd, MMMM D, h:mm A');
  $('#currentDay').text(currentDateTime);
}

// Get user input saved in localStorage and set values of corresponding textarea elements
function loadEvents() {
  $('.time-block').each(function () {
    var eventId = $(this).attr('id');
    var savedEvent = localStorage.getItem(eventId);
    if (savedEvent !== null) {
      $(this).find('textarea').val(savedEvent);
    }
  });
}

// Call functions to initialize the application
generateTimeBlocks();
loadEvents();

// Update time blocks and current time every minute
setInterval(generateTimeBlocks, 60000);

