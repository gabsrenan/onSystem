$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

  $(".alert").alert()
  $('#myAlert').on('closed.bs.alert', function () {
    // do something…
  })