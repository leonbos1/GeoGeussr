var europeanCountries = {
    "Austria": "Vienna",
    "Belgium": "Brussels",
    "Bulgaria": "Sofia",
    "Croatia": "Zagreb",
    "Cyprus": "Nicosia",
    "Czech Republic": "Prague",
    "Denmark": "Copenhagen",
    "Estonia": "Tallinn",
    "Finland": "Helsinki",
    "France": "Paris",
    "Germany": "Berlin",
    "Greece": "Athens",
    "Hungary": "Budapest",
    "Ireland": "Dublin",
    "Italy": "Rome",
    "Latvia": "Riga",
    "Lithuania": "Vilnius",
    "Luxembourg": "Luxembourg",
    "Malta": "Valletta",
    "Netherlands": "Amsterdam",
    "Poland": "Warsaw",
    "Portugal": "Lisbon",
    "Romania": "Bucharest",
    "Slovakia": "Bratislava",
    "Slovenia": "Ljubljana",
    "Spain": "Madrid",
    "Sweden": "Stockholm",
    "United Kingdom": "London"
};

class Countries {
    constructor() {
        this.countries = {};
        this.removedCountries = {};
    }

    addCountries(countries) {
        //input is an object with {country: capital}
        for (var country in countries) {
            this.countries[country] = countries[country];
        }
    }

    addCountry(country, capital) {
        this.countries[country] = capital;
    }

    removeCountry(country) {
        this.removedCountries[country] = this.countries[country];
        delete this.countries[country];
    }

    getCapital(country) {
        return this.countries[country];
    }

    getCountry(capital) {
        for (var country in this.countries) {
            if (this.countries[country] == capital) {
                return country;
            }
        }
    }

    getRandomCountry() {
        var countries = Object.keys(this.countries);
        return countries[Math.floor(Math.random() * countries.length)];
    }

    getRandomCapital() {
        var capitals = Object.values(this.countries);
        var randomCapital = capitals[Math.floor(Math.random() * capitals.length)];
        this.removeCountry(this.getCountry(randomCapital));
        return randomCapital;
    }

    resetCountries() {
        for (var country in this.removedCountries) {
            this.countries[country] = this.removedCountries[country];
        }
        this.removedCountries = {};
    }
}

window.onload = function () {
    var button = document.getElementById("guess");

    var countries = new Countries();

    button.addEventListener("click", function () {
        handleGuessPress(countries);
    });

    countries.addCountries(europeanCountries);

    populateOptions(countries);

    let options = document.getElementById("options");

    for (let i = 0; i < options.children.length; i++) {
        let child = options.children[i];

        console.log(child);

        child.addEventListener("click", function () {
            handleOptionChange();
        });
    }

};

function handleGuessPress(countries) {
    var input1 = document.getElementById("option1");
    var input2 = document.getElementById("option2");
    var input3 = document.getElementById("option3");

    var country = document.getElementById("country").innerHTML;

    if (input1.checked) {
        var capital = document.getElementById("option1Label").innerHTML;
    } else if (input2.checked) {
        var capital = document.getElementById("option2Label").innerHTML;
    } else if (input3.checked) {
        var capital = document.getElementById("option3Label").innerHTML;
    }

    //uncheck all radio buttons
    input1.checked = false;
    input2.checked = false;
    input3.checked = false;

    if (capital == countries.getCapital(country)) {
        alert("Correct!");
    } else {
        alert("Wrong!");
    }

    populateOptions(countries);
}

function populateOptions(countries) {
    input1 = document.getElementById("option1");
    input2 = document.getElementById("option2");
    input3 = document.getElementById("option3");

    var wrongAnswer1;
    var wrongAnswer2;

    var random = Math.floor(Math.random() * 3) + 1;

    if (random == 1) {
        wrongAnswer1 = 2;
        wrongAnswer2 = 3;
    } else if (random == 2) {
        wrongAnswer1 = 1;
        wrongAnswer2 = 3;
    } else {
        wrongAnswer1 = 1;
        wrongAnswer2 = 2;
    }

    var country = countries.getRandomCountry();
    var capital = countries.getCapital(country);

    var rightAnswer = document.getElementById("option" + random + "Label");
    rightAnswer.innerHTML = capital;

    var wrongAnswer1 = document.getElementById("option" + wrongAnswer1 + "Label");
    wrongAnswer1.innerHTML = countries.getRandomCapital();

    var wrongAnswer2 = document.getElementById("option" + wrongAnswer2 + "Label");
    wrongAnswer2.innerHTML = countries.getRandomCapital();

    var countryTitle = document.getElementById("country");
    countryTitle.innerHTML = country;
}

handleOptionChange = function () {
    var input1 = document.getElementById("option1");
    var input2 = document.getElementById("option2");
    var input3 = document.getElementById("option3");

    if (input1.checked) {
        var option = document.getElementById("option1Label");
        let parent = option.parentElement;
        parent.classList.add("checked");

    }
    else {
        var option = document.getElementById("option1Label");
        let parent = option.parentElement;
        parent.classList.remove("checked");
    }

    if (input2.checked) {
        var option = document.getElementById("option2Label");
        let parent = option.parentElement;
        parent.classList.add("checked");
    }
    else {
        var option = document.getElementById("option2Label");
        let parent = option.parentElement;
        parent.classList.remove("checked");
    }

    if (input3.checked) {
        var option = document.getElementById("option3Label");
        let parent = option.parentElement;
        parent.classList.add("checked");
    }
    else {
        var option = document.getElementById("option3Label");
        let parent = option.parentElement;
        parent.classList.remove("checked");
    }
}

