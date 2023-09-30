var input1 = document.getElementById("input1");
    var input2 = document.getElementById("input2");
    var input3 = document.getElementById("input3");
    var input4 = document.getElementById("input4");

    // Pobieramy elementy wynikowe
    var sumaElement = document.getElementById("suma");
    var sredniaElement = document.getElementById("srednia");
    var minimumElement = document.getElementById("minimum");
    var maksimumElement = document.getElementById("maksimum");

    // Funkcja do obliczania sumy, średniej, minimum i maksimum
    function oblicz() {
      var val1 = parseFloat(input1.value) || 0;
      var val2 = parseFloat(input2.value) || 0;
      var val3 = parseFloat(input3.value) || 0;
      var val4 = parseFloat(input4.value) || 0;

      var suma = val1 + val2 + val3 + val4;
      var srednia = suma / 4;
      var minimum = Math.min(val1, val2, val3, val4);
      var maksimum = Math.max(val1, val2, val3, val4);

      sumaElement.textContent = suma;
      sredniaElement.textContent = srednia;
      minimumElement.textContent = minimum;
      maksimumElement.textContent = maksimum;
    }

    // Dodajemy obsługę zdarzenia input do pól tekstowych
    input1.addEventListener("input", oblicz);
    input2.addEventListener("input", oblicz);
    input3.addEventListener("input", oblicz);
    input4.addEventListener("input", oblicz);
    