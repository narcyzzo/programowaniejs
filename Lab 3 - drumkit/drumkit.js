const audioFiles = {
    kick: 'kick.wav',
    snare: 'snare.wav',
    hihat: 'hihat.wav'
};

let isRecording = false;
let recordedTracks = [[], [], [], []];

function playSound(sound) {
    const audio = new Audio(audioFiles[sound]);
    audio.play();

    if (isRecording) {
        const time = Date.now();
        recordedTracks.forEach((track, index) => {
            if (index === 0) track.push({ sound, time });
            else track.push(null);
        });
    }
}

function startRecording() {
    isRecording = true;
    recordedTracks = [[], [], [], []];
}

function stopRecording() {
    isRecording = false;
}

function playRecording() {
    recordedTracks.forEach(track => {
        track.forEach(event => {
            if (event) {
                setTimeout(() => {
                    playSound(event.sound);
                }, event.time - recordedTracks[0][0].time);
            }
        });
    });
}
