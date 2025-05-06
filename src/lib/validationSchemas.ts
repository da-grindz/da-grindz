import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const PreferencesSchema = Yup.object({
  allergies: Yup.array().of(Yup.string().required()).required().default([]),
  mood: Yup.string().required('Choose your mood'),
  owner: Yup.string().required(),
});

export const allowedAllergies = [
  'Peanuts',
  'Tree Nuts',
  'Milk',
  'Fish',
  'Shellfish',
  'Wheat',
  'Gluten',
  'Sesame',
  'Mustard',
];

export const AddVendorItemSchema = Yup.object({
  image: Yup.string()
    .url('Please provide a valid URL for the image.')
    .required('Image URL is required.'),
  alt: Yup.string().required('Alt text is required for accessibility.'),
  calories: Yup.number()
    .transform((value, originalValue) => (originalValue.trim() === '' ? null : value)) // Handle empty strings
    .nullable() // Allow null values
    .min(0, 'Calories must be 0 or more.')
    .required('Please specify the number of calories.'),
  protein: Yup.number()
    .transform((value, originalValue) => (originalValue.trim() === '' ? null : value))
    .nullable()
    .min(0, 'Protein must be 0 or more.')
    .required('Please specify the amount of protein.'),
  fat: Yup.number()
    .transform((value, originalValue) => (originalValue.trim() === '' ? null : value))
    .nullable()
    .min(0, 'Fat must be 0 or more.')
    .required('Please specify the amount of fat.'),
  carbs: Yup.number()
    .transform((value, originalValue) => (originalValue.trim() === '' ? null : value))
    .nullable()
    .min(0, 'Carbohydrates must be 0 or more.')
    .required('Please specify the amount of carbohydrates.'),
  name: Yup.string().required('The item name is required.'),
  price: Yup.number()
    .transform((value, originalValue) => (originalValue.trim() === '' ? null : value))
    .nullable()
    .positive('Price must be a positive number.')
    .required('Please specify the price of the item.'),
  description: Yup.string().required('A description of the item is required.'),
  allergies: Yup.array()
    .of(Yup.string().oneOf(allowedAllergies, 'Please select a valid allergy.'))
    .default([]),
  vendorId: Yup.string().required('Vendor ID is required.'),
});

export const EditVendorItemSchema = Yup.object({
  id: Yup.number().required('Item ID is required'),
  image: Yup.string().url('Image must be a valid URL').required('Image URL is required'),
  alt: Yup.string().required('Alt text is required'),
  calories: Yup.number().min(0, 'Calories must be 0 or more').required('Calories are required'),
  protein: Yup.number().min(0, 'Protein must be 0 or more').required('Protein is required'),
  fat: Yup.number().min(0, 'Fat must be 0 or more').required('Fat is required'),
  carbs: Yup.number().min(0, 'Carbs must be 0 or more').required('Carbohydrates are required'),
  name: Yup.string().required('Item name is required'),
  price: Yup.number().positive('Price must be a positive number').required('Price is required'),
  description: Yup.string().required('Description is required'),
  allergies: Yup.array()
    .of(Yup.string().oneOf(allowedAllergies))
    .default([]),
  vendorId: Yup.string().required('Vendor ID is required'),
});
