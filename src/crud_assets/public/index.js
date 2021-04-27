import crud from 'ic:canisters/crud';

crud.greet(window.prompt("Enter your name:")).then(greeting => {
  window.alert(greeting);
});
