import { generateModel } from './train';

generateModel(5000000).then(() => console.log('Model has finished training')).catch((e) => console.log(e));
