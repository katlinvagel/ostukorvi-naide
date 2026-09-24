"use strict";

let korv = [
    {
        nimi: "Saapad 1",
        hind: 199,
        kogus: 1
    }
];

const korviSisu = document.querySelector(".korv");

// Toote koguse suurendamine
function suurendaArtikkel(toode, korvArtikkelD) {

    korv.forEach(korvArtikkel => {

        if (korvArtikkel.nimi === toode.nimi) {

            korvArtikkel.kogus++;

            korvArtikkelD
                .querySelector(".korv_artikkel_kogus")
                .innerText = korvArtikkel.kogus;

            arvutaKorviSumma();
        }
    });
}

// Toote koguse vähendamine
function vahendaArtikkel(toode, korvArtikkelD) {

    korv.forEach(korvArtikkel => {

        if (korvArtikkel.nimi === toode.nimi) {

            if (korvArtikkel.kogus > 1) {

                korvArtikkel.kogus--;

                korvArtikkelD
                    .querySelector(".korv_artikkel_kogus")
                    .innerText = korvArtikkel.kogus;

                arvutaKorviSumma();
            } else {

                eemaldaArtikkel(toode, korvArtikkelD);
            }
        }
    });
}

// Toote eemaldamine
function eemaldaArtikkel(toode, korvArtikkelD) {

    korvArtikkelD.remove();

    korv = korv.filter(
        korvArtikkel => korvArtikkel.nimi !== toode.nimi
    );

    if (korv.length < 1) {

        const korvJalus = document.querySelector(".korv-jalus");

        if (korvJalus !== null) {
            korvJalus.remove();
        }

    } else {

        arvutaKorviSumma();
    }
}

// Ostukorvi summa
function arvutaKorviSumma() {

    let summa = 0;

    korv.forEach(korvArtikkel => {

        summa += korvArtikkel.hind * korvArtikkel.kogus;
    });

    const valitudTarne = document.querySelector('input[name="tarne"]:checked');

    let tarneHind = 0;

    if (valitudTarne !== null) {
        tarneHind = Number(valitudTarne.value);
    }

    summa = summa + tarneHind;

    const summaElement = document.querySelector(".korv_summa");

    if (summaElement !== null) {

        summaElement.innerText = summa.toFixed(2) + "€";
    }
}

// Ostukorvi tühjendamine
function tuhjendaKorv() {

    korviSisu
        .querySelectorAll(".korv_artikkel")
        .forEach(korvArtikkelD => {

            korvArtikkelD.remove();
        });

    korv = [];

    const korvJalus = document.querySelector(".korv-jalus");

    if (korvJalus !== null) {

        korvJalus.remove();
    }
}

// Taimer
function alustaTaimer(kestvus, kuva) {

    let start = Date.now();

    function taimer() {

        let vahe = kestvus - Math.floor((Date.now() - start) / 1000);

        let minutid = Math.floor(vahe / 60);

        let sekundid = Math.floor(vahe % 60);

        if (minutid < 10) {
            minutid = "0" + minutid;
        }

        if (sekundid < 10) {
            sekundid = "0" + sekundid;
        }

        kuva.textContent = minutid + ":" + sekundid;

        if (vahe <= 0) {
            kuva.innerHTML = "Aeg on läbi";

            clearInterval(intervall);
        }
    }

    taimer();

    const intervall = setInterval(taimer, 1000);
}

// Maksma nupp
function kassa() {

    let taimeriAeg = 60 * 2;

    let kuva = document.getElementById("time");

    alustaTaimer(
        taimeriAeg,
        kuva
    );
}

// Nuppude sündmusekuulajad
const toode = korv[0];

const korvArtikkelD = document.querySelector(".korv_artikkel");

document
    .querySelector('[data-action="suurenda_artikkel"]')
    .addEventListener("click", () => {
        suurendaArtikkel(
            toode,
            korvArtikkelD
        );
    });

document
    .querySelector('[data-action="vahenda_artikkel"]')
    .addEventListener("click", () => {
        vahendaArtikkel(
            toode,
            korvArtikkelD
        );
    });

document
    .querySelector('[data-action="eemalda_artikkel"]')
    .addEventListener("click", () => {
        eemaldaArtikkel(
            toode,
            korvArtikkelD
        );
    });

document
    .querySelector('[data-action="tyhjenda_korv"]')
    .addEventListener("click", () => {
        tuhjendaKorv();
    });

document
    .querySelector('[data-action="kassa"]')
    .addEventListener("click", () => {
        kassa();
    });

// Tarne hinna muutmine
document
    .querySelectorAll('input[name="tarne"]')
    .forEach(tarne => {
        tarne.addEventListener(
            "change",
            () => {
                arvutaKorviSumma();
            }
        );
    });

// Vorm
const form = document.getElementById("tellijaVorm");

const eesnimi = document.getElementById("eesnimi");

const perenimi = document.getElementById("perenimi");

const telefon = document.getElementById("telefon");

const errorMessage = document.getElementById("errorMessage");

// Minu kood
const postiindeks = document.getElementById("postiindeks");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const errors = [];

    if (eesnimi.value.trim() === "") {
        errors.push(
            "Sisesta eesnimi!"
        );
    }

    if (/\d/.test(eesnimi.value)) {
        errors.push(
            "Eesnimi ei tohi sisaldada numbreid!"
        );
    }

    if (perenimi.value.trim() === "") {
        errors.push(
            "Sisesta perekonnanimi!"
        );
    }

    if (/\d/.test(perenimi.value)) {
        errors.push(
            "Perekonnanimi ei tohi sisaldada numbreid!"
        );
    }

    if (telefon.value.length < 6) {
        errors.push(
            "Telefoninumber peab olema vähemalt 6 numbrit pikk!"
        );
    }

    if (!/^\d+$/.test(telefon.value)) {
        errors.push(
            "Telefoninumber tohib sisaldada ainult numbreid!"
        );
    }

    // minu kood
    if (!/^\d{5}$/.test(postiindeks.value)) {
        errors.push(
            "Postiindeks peab koosnema täpselt viiest numbrist!"
        );
    }

    if (errors.length > 0) {
        errorMessage.innerHTML = errors.join("<br>");
    } else {
        errorMessage.innerHTML = "";
    }

});

// Esialgse summa arvutamine
arvutaKorviSumma();
