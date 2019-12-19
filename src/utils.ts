import * as tf from '@tensorflow/tfjs-node';
import * as readline from 'readline';
import {MAX_SIZE_POSTCODE} from './constants';

const encodeString = (srt: string, maxLength: number) => tf.util.encodeString(srt.padStart(maxLength, '*'));

export const calculateFeatures = (postcode: string, propertyType: string, oldNew: string, date: Date) => {
    const encodedString = encodeString(postcode, MAX_SIZE_POSTCODE);

    // https://en.wikipedia.org/wiki/One-hot
    const isItDetached = propertyType === 'D' ? 1 : 0;
    const isItSemiDetached = propertyType === 'S' ? 1 : 0;
    const isItTerraced = propertyType === 'T' ? 1 : 0;
    const isItFlat = propertyType === 'F' ? 1 : 0;
    const isItOther = propertyType === 'O' ? 1 : 0;

    const propertyTypeOneHot = [isItDetached, isItSemiDetached, isItTerraced, isItFlat, isItOther];

    const isNew = oldNew === 'Y' ? 1 : 0;

    return [...encodedString, date.getTime(), ...propertyTypeOneHot, isNew];
};

export const readLineAsync = (question: string): Promise<string> => {
    return new Promise((resolve) => {

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(question, (answer) => {
            resolve(answer);
            rl.close();
        });
    });
};
