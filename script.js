const select = document.querySelectorAll('.currency');
const swap = document.getElementById('swap');
const btn = document.getElementById('btn');
const num = document.getElementById('num');
const ans = document.getElementById('ans');

fetch('https://api.frankfurter.app/currencies')
  .then((data) => data.json())
  .then((data) => {
    display(data);
  });

const display = (data) => {
  const entries = Object.entries(data);
  for (let i = 0; i < entries.length; i++) {
    select[0].innerHTML += `<option value = "${entries[i][0]}">${entries[i][0]}</option>`;
    select[1].innerHTML += `<option value = "${entries[i][0]}">${entries[i][0]}</option>`;
  }
};

function switchText() {
  var obj1 = document.getElementById('from').value;
  var obj2 = document.getElementById('to').value;

  var temp = obj1;
  obj1 = obj2;
  obj2 = temp;

  // Save the swapped values to the input element.
  document.getElementById('from').value = obj1;
  document.getElementById('to').value = obj2;
}

btn.addEventListener('click', () => {
  let currency1 = select[0].value;
  let currency2 = select[1].value;
  let value = num.value;
  if (num.value === '') {
    swal('Yo Yo!', 'Please enter the amount!', 'warning');
  } else if (currency1 != currency2) {
    convert(currency1, currency2, value);
  } else {
    swal('Yo Yo!', 'Choose Different Currency!', 'warning');
  }
});

function convert(currency1, currency2, value) {
  console.log('hello');
  const host = 'api.frankfurter.app';
  fetch(
    `https://${host}/latest?amount=${value}&from=${currency1}&to=${currency2}`
  )
    .then((val) => val.json())
    .then((val) => {
      let answer = Object.values(val.rates)[0];
      ans.innerHTML = `${answer}`;
    });
}
