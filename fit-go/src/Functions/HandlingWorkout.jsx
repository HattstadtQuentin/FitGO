const address = "https://fit-go.herokuapp.com"
const headers = { 'Content-Type': 'application/json' }

export async function getWorkouts() {
    let workouts = [];
    let url = new URL(address + '/programmes');

    const response = await fetch(url,{
        method: 'GET',
        headers: headers
    });
    workouts = await response.json();

    return workouts;
}

export async function getWorkoutById(idProgramme) {
    let workout = [];
    let url = new URL(address + '/programme_id');
    url.searchParams.append("idProgramme",idProgramme);

    const response = await fetch(url,{
        method: 'GET',
        headers: headers
    });
    workout = await response.json();

    return workout.data[0];
}

export async function createWorkout(nom, type, nbExo, duree, cal, exo1, exo2, exo3, exo4, exo5, exo6, exo7, exo8, exo9, exo10) {
    let url = new URL(address + '/programme');

    const response = await fetch(url,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ nom: nom, type: type, nbExo: nbExo, duree: duree, cal: cal, exo1: exo1, exo2: exo2, exo3: exo3, exo4: exo4, exo5: exo5, exo6: exo6, exo7: exo7, exo8: exo8, exo9: exo9, exo10: exo10})
    });
    await response.json();
}

export async function deleteWorkout(idProgramme) {
    let url = new URL(address + '/programme');

    const response = await fetch(url,{
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify({ idProgramme: idProgramme})
    });
    await response.json();
}


export async function getExercices() {
    let workouts = [];
    let url = new URL(address + '/exercices');

    const response = await fetch(url,{
        method: 'GET',
        headers: headers
    });
    workouts = await response.json();

    return workouts;
}

export async function getExerciceById(idExercice) {
    let exercice = [];
    let url = new URL(address + '/exercice_id');
    url.searchParams.append("idExercice",idExercice);

    const response = await fetch(url,{
        method: 'GET',
        headers: headers
    });
    exercice = await response.json();

    return exercice.data ? exercice.data[0]? exercice.data[0] : null : null;
}

 