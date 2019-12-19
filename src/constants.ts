export const COLUMN_NAMES = [
    'identifier',
    'price',
    'date',
    'postcode',
    'propertyType', // D = Detached, S = Semi-Detached, T = Terraced, F = Flats/Maisonettes, O = Other
    'oldNew', // Y = a newly built property, N = an established residential building
    'duration',
    'PAON',
    'SAON',
    'street',
    'locality',
    'town',
    'district',
    'county',
    'PPD',
    'RecordStatus'
];

export const MAX_SIZE_POSTCODE = 8;
const SIZE_OF_PROPERTY_TYPES = 5;
const SIZE_OF_DATE = 1;
const SIZE_OF_IS_NEW = 1;
export const SIZE_FEATURES = MAX_SIZE_POSTCODE + SIZE_OF_PROPERTY_TYPES + SIZE_OF_DATE + SIZE_OF_IS_NEW;
