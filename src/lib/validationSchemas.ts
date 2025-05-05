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

const allowedAllergies = [
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
  name: Yup.string().required('Item name is required'),
  price: Yup.number().positive('Price must be a positive number').required('Price is required'),
  description: Yup.string().required('Description is required'),
  allergies: Yup.array()
    .of(Yup.string().oneOf(allowedAllergies))
    .required()
    .default([]),
  vendorId: Yup.string().required('Vendor ID is required'),
});

export const EditVendorItemSchema = Yup.object({
  name: Yup.string().required('Item name is required'),
  price: Yup.number().positive('Price must be a positive number').required('Price is required'),
  description: Yup.string().required('Description is required'),
  allergies: Yup.array()
    .of(Yup.string().oneOf(allowedAllergies))
    .required()
    .default([]),
  vendorId: Yup.string().required('Vendor ID is required'),
  itemId: Yup.string().required('Item ID is required'),
});
