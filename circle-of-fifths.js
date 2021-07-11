/*
 *** ECHARTS CIRCLE OF FIFTHS - PIE *** 
*/

import Recording from './assets/recording/1_Bb_circle.js'; 
const toneMidiNotes = Recording.tracks[0].notes;

//////////////////
// MIDI MAPPING //
//////////////////

let counter = 1;
const filteredNotes = toneMidiNotes.map((note) => {
    note.fullNote = Tonal.Note.fromMidi(note.midi);
    note.info = Tonal.Note.get(note.fullNote);
    note.octave = note.info.oct;
    note.count = 1;
    counter++;
    return note;
});

////////////
// AUDIO //
///////////

Tone.Transport.bpm.value = 120;

const polySynth = new Tone.PolySynth(Tone.Synth).toDestination();

const recordingPart = new Tone.Part(function(time, datum){
    polySynth.triggerAttackRelease(datum.fullNote, "8n", time, datum.velocity);
    updateCircleData(datum, time);
}, toneMidiNotes);
recordingPart.start(0);

// setTimeout(() => {
//     Tone.Transport.start();
// }, 3000);

//////////////////
// MAJOR CIRCLE //
//////////////////

let circleFifthsMajorId = document.getElementById('circle-of-fifths-major');
const graphCircleFifthsMajor = echarts.init(circleFifthsMajorId, 'tech-blue');

const circleOfFifthsMajorOrderedNotes = ['C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
const circleOfFifthsMinorOrderedNotes = ['Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'D#m', 'Bbm', 'Fm', 'Cm', 'Gm', 'Dm'];

const noteInactiveColor =  '#C1ECFD'; // Baby Blue
const noteActiveColor =  '#AE4DAF'; // Orchid

function generateCircleNotes(noteLetters, octave=4) {
    const octaveNoteData = [];
    noteLetters.forEach((note, index) => {
        const fullNote = note + octave;
        const notesDataTemplate = {
            value: 1,
            itemStyle: {
                color: noteInactiveColor,
            },
            info: Tonal.Note.get(note + octave),
        };
        octaveNoteData.push(notesDataTemplate);
    });
    return octaveNoteData;
}

const fullCircleData = [];
for (let i=0; i<=8; i++) {
    const tempOctaveData = generateCircleNotes(circleOfFifthsMajorOrderedNotes, i);
    fullCircleData.push(tempOctaveData);
}

const majorOption = {
    title: {
        show: false,
        text: 'Circle of Fifths',
        left: 'center',
        textStyle: {
            color: '#333',
            fontFamily: '"Roboto Condensed", Verdana, sans-serif',
            fontWeight: 600,
            fontSize: 16,
        },
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        },
    },
    legend: {
        show: false,
        type: 'plain', // 'scroll'
        data: ['Octave 0', 'Octave 1', 'Octave 2', 'Octave 3', 'Octave 4', 'Octave 5', 'Octave 6', 'Octave 7', 'Octave 8'],
    },
    grid: {},
    polar: {
        center: ['50%', '50%'], 
        radius: ['45%', '82%'],
    },
    radiusAxis: {
        type: 'value',
        show: false,
        axisTick: {
            show: false,
        },
    },
    angleAxis: {
        type: 'category',
        show: true,
        data: circleOfFifthsMajorOrderedNotes,
        clockwise: true,
        startAngle: 105,
        splitArea: {
            show: false,
        },
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false,
        },
        axisLabel: {
            interval: 0,
            margin: 10,
            color: '#234468',
            color: '#ffffff',
            fontFamily: '"Roboto Condensed", Verdana, sans-serif',
            fontWeight: 600,
            fontSize: 44,
            formatter: (value, index) => {
                ['C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
                ['C', 'G', 'D', 'A', 'E', 'B', 'G♭', 'D♭', 'A♭', 'E♭', 'B♭', 'F']; // undef ♭
                ['C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'F']; // undef ♯
                switch (value) {
                    case 'Gb':
                        return 'G♭';
                    case 'Db':
                            return 'D♭';
                    case 'Ab':
                            return 'A♭';
                    case 'Eb':
                        return 'E♭';
                    case 'Bb':
                        return 'B♭';
                    default:
                        return value;
                }
            }
        }
    },
    series: [
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 0',
            stack: 'total',
            barCategoryGap: 1,
            data: fullCircleData[0],
        },
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 1',
            stack: 'total',
            data: fullCircleData[1],
        },
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 2',
            stack: 'total',
            data: fullCircleData[2],
        },
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 3',
            stack: 'total',
            data: fullCircleData[3],
        },
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 4',
            stack: 'total',
            data: fullCircleData[4],
        },
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 5',
            stack: 'total',
            data: fullCircleData[5],
        },
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 6',
            stack: 'total',
            data: fullCircleData[6],
        },
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 7',
            stack: 'total',
            data: fullCircleData[7],
        },
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 8',
            stack: 'total',
            data: fullCircleData[8],
        },
    ]
};

graphCircleFifthsMajor.setOption(majorOption);

//////////////////
// MINOR CIRCLE //
//////////////////
let circleFifthsMinorId = document.getElementById('circle-of-fifths-minor');
const graphCircleFifthsMinor = echarts.init(circleFifthsMinorId, 'tech-blue');

const minorOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        },
    },
    legend: {
        show: false,
        data: ['Octave 0', 'Octave 1', 'Octave 2', 'Octave 3', 'Octave 4', 'Octave 5', 'Octave 6', 'Octave 7', 'Octave 8'],
    },
    grid: {},
    polar: {
        center: ['50%', '50%'],
        radius: ['25%', '40%'],
    },
    radiusAxis: {
        type: 'value',
        show: false,
        axisTick: {
            show: false,
        },
    },
    angleAxis: {
        type: 'category',
        data: circleOfFifthsMinorOrderedNotes,
        clockwise: true,
        startAngle: 105,
    },
    series: [
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 0',
            stack: 'total',
            label: {
                show: true
            },
            data: [1, 3, 2, 4, 1, 3, 5, 2, 3, 2, 4, 1],
        },
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 1',
            stack: 'total',
            label: {
                show: true
            },
            data: [2, 1, 2, 3, 1, 2, 3, 5, 2, 1, 3, 2],
        },
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 2',
            stack: 'total',
            label: {
                show: true
            },
            data: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        },
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 3',
            stack: 'total',
            label: {
                show: true
            },
            data: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        },
    ]
};

// graphCircleFifthsMinor.setOption(minorOption);

//////////////////
// CHORD CENTER //
//////////////////

let circleFifthsChordsId = document.getElementById('circle-of-fifths-chords');
const graphCircleFifthsChords = echarts.init(circleFifthsChordsId, 'tech-blue');

const chordsOption = {
    grid: {},
    color: ['#FFFFE0'], // ltyellow
    series: [
        {
            type: 'pie',
            radius: ['43%', '44%'],
            center: ['50%', '50%'],
            animationDuration: 25, // default: 1000
            animationEasing: 'linear', // default: 'cubicOut'
            label: {
                show: true,
                position: 'center',
                formatter: '{chordName|{b}}',
                rich: {
                    chordName: {
                        color: '#FFFFE0', // ltyellow
                        fontFamily: '"Roboto Condensed", Verdana, sans-serif',
                        fontSize: 50,
                        lineHeight: 50,
                        fontWeight: 'bold',
                    },
                }
            },
            data: [
                {
                    name: '',
                    value: 1,
                }
            ],
            silent: true,
        },
    ]
};
graphCircleFifthsChords.setOption(chordsOption);

let allPlayedNotes = [];
let chordsPlayed = [];
let lastTime = 0;
let tempNotes = [];
function updateChordDisplay(noteData, time) {
    const timeDifference = time - lastTime;

    if ((time - lastTime) < 1.0) { 
        tempNotes.push(noteData.fullNote);
    } else {
        tempNotes = [];
    }

    if (tempNotes.length > 2 && tempNotes.length < 10) {
        let currentChord = Tonal.Chord.detect(tempNotes);
        if (currentChord.length) {
            let currentChordNoRoot = currentChord[0].slice(0, currentChord[0].length - 2);
            let currentChordSplit = currentChord[0].split('/');
            let currentChordInfo = Tonal.Chord.get(currentChordSplit[0]);
            let currentChordDisplayName = currentChordInfo.name;
            if (currentChordDisplayName) {
                currentChordInfo = currentChordInfo;
                chordsPlayed.push(currentChordDisplayName);
            }
            tempNotes = [];
        } else {
            tempNotes = [];
        }
    }
    lastTime = time;
}

////////////
// UPDATE //
////////////

function updateCircleData(noteData, time) {
    updateChordDisplay(noteData, time);

    const newMajorOption = majorOption;

    const millisecondsNoteDuration = noteData.duration * 1000; // or use noteData.durationTicks ???

    const currentOctavePlayed = majorOption.series[noteData.octave];
    
    currentOctavePlayed.data.forEach((octaveData, index) => {
        if (octaveData.info.midi === noteData.midi) {
            newMajorOption.series[noteData.octave].data[index].itemStyle.color = noteActiveColor;
            setTimeout(() => {
                newMajorOption.series[noteData.octave].data[index].itemStyle.color = noteInactiveColor;
            }, millisecondsNoteDuration);
        }
    });

    graphCircleFifthsMajor.setOption(newMajorOption);

    allPlayedNotes.push(noteData.name);

    const newChordsOption = chordsOption;

    if (chordsPlayed.length > 0) {
        const formattedChordLabel = labelFormatter(chordsPlayed[0], 14);
        newChordsOption.series[0].data[0].name = formattedChordLabel;
        chordsPlayed.pop();
    }
    
    graphCircleFifthsChords.setOption(newChordsOption);
}

function labelFormatter(label, maxLength, lineBreakStyle = 'endline') {
    if (label.length <= maxLength) {
        return label;
    }

    let lineBreakText = '\n';
    if (lineBreakStyle === 'html') {
        lineBreakText = '<br />';
    }

    let trunc;
    let useIndex = maxLength;
    // Find last space before maxLength
    for (let i = 0; i <= maxLength; i++) {
        if (label.charAt(i) === ' ') {
            useIndex = i;
        }
    }
    if (useIndex < maxLength) {
        trunc = _.truncate(label.substring(useIndex + 1), { 'length': maxLength, 'separator': ' ' });
        return `${label.substring(0, useIndex)}${lineBreakText}${trunc}`;
    } else {
        trunc = _.truncate(label.substring(maxLength), { 'length': maxLength, 'separator': ' ' });
        return `${label.substring(0, maxLength)}${lineBreakText}${trunc}`;
    }
}

///////////////////
// UI - SETTINGS //
///////////////////

const elemStartSong = document.getElementById('start-song');
elemStartSong.onclick = () => {
    Tone.Transport.start();
}
