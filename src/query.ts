import config from '../config.json';
import * as tf from '@tensorflow/tfjs-node';
import {Tensor} from '@tensorflow/tfjs-node';
import {calculateFeatures, readLineAsync} from './utils';
import {SIZE_FEATURES} from './constants';

const predictFromModel = async (postcode: string, propertyType: string, isItNew: string, model: tf.LayersModel) => {
    const currentDate = new Date();

    const xsValue = calculateFeatures(postcode, propertyType, isItNew, currentDate);

    const b = tf.tensor([xsValue], [1, SIZE_FEATURES]);
    const tensor = model.predict(b) as Tensor;

    const dataPrediction = await tensor.data();
    console.log(`The predictive price for your property is ${dataPrediction[0]}`);
};

const predictLoadingModel = async () => {
    console.log('House Price Predictor');
    const postcode = await readLineAsync('What is the full postcode (eg. MK7 8LE): ');
    const propertyType = await readLineAsync('What is the property type (D = Detached, S = Semi-Detached, T = Terraced, F = Flats/Maisonettes, O = Other): ');
    const isItNew = await readLineAsync('Is it a new property (Y = a newly built property, N = an established residential building): ');

    const model = await tf.loadLayersModel(`file://${config.pathToModel}/model.json`);
    await predictFromModel(postcode, propertyType, isItNew, model);
};

predictLoadingModel().then(() => console.log('Prediction finished')).catch((e) => console.log(e));
