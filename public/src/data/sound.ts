// export class Sound {
//     constructor() {
//         this.soundFiles = loadJSON('Sound_Effects/soundlist.json')
//         this.soundEffects = []
//     }

//     loadSounds(s) {

//         // sound files
//         let soundEffects = []
//         let soundFiles;
//         let SOUNDS;
//         let sounds;
//         let filteredSounds;


//         SOUNDS = Object.values(s);

//         // Store the array containing the file paths

//         sounds = SOUNDS[0]

//         filteredSounds = sounds.filter(item => item.endsWith('.wav'))
//         // console.log(filteredSounds)
//         for (let i = 0; i < filteredSounds.length; i++) {
//             this.soundEffects[i] = loadSound('/Sound_Effects/' + filteredSounds[i])
//             // console.log(`[${i}]/Sound_Effects/` + filteredSounds[i])
//         }
//     }
// }