function utils(){
  return{
    convertTimestamp: convertTimestamp,
    convertDatestamp: convertDatestamp
  }
  function convertTimestamp(unix_timestamp) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp.seconds * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime;
  }

  function convertDatestamp(unix_timestamp) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp.seconds * 1000);
    // Days part from the timestamp
    var day = date.getDate();
    // Month part from the timestamp
    var month = date.getMonth();
    // Year part from the timestamp
    var year = date.getFullYear();
    // Will display time in 10:30:23 format
    var formattedDay = `${day}/${month}/${year}`

    return formattedDay;
  }
}
export default utils;