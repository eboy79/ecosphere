import {
    initWordStack,
    initTickerRows
} from '../animations';

export default function() {
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof wordStackData !== 'undefined') {
            console.log('wordStackData:', wordStackData);
            const words = wordStackData.words;
            console.log('Initializing word stack with:', words);
            initWordStack(words);
            initTickerRows([
                ["THIS", true],
                ["SHIT", true],
                ["RIGHT", true],
                ["HERE", true]
            ]);
        }
    });
}
