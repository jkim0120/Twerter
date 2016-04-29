$(document).ready(function() {
  $('.delete-user').on('click', function(e) {
    e.preventDefault();

    var confirmation = confirm('Are you sure?');

    if(confirmation) {
      $.ajax({
        type: 'DELETE',
        url: '/user/' + $('.delete-user').data('user')
      }).done(function(response) {
        window.location.replace('/users');
      });
    } else {
      return false;
    }
  });
});