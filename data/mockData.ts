// app/data/mockData.ts

export const MY_PETS = [
  { id: 'p1', name: 'Buddy', breed: 'Golden Retriever', userId: 'fake-user-uid' },
  { id: 'p2', name: 'Whiskers', breed: 'Siamese Cat', userId: 'fake-user-uid' },
];

export const REGULATIONS = [
  { 
    id: 'r1', 
    name: 'American Airlines', 
    type: 'airline',
    requirements: ['Crate (IATA compliant)', 'Health Certificate (10 days)', 'Rabies Vaccine']
  },
  { 
    id: 'r2', 
    name: 'United Kingdom', 
    type: 'destination',
    requirements: ['Rabies Vaccine', 'Tapeworm Treatment (24-120 hours before entry)', 'Microchip']
  },
  { 
    id: 'r3', 
    name: 'Delta', 
    type: 'airline',
    requirements: ['Crate (IATA compliant)', 'Up-to-date Vaccines']
  },
];

// A static checklist for *any* trip you create
export const MOCK_CHECKLIST = [
  { id: 'c1', name: 'Crate (IATA compliant)', status: 'verified' },
  { id: 'c2', name: 'Health Certificate (10 days)', status: 'pending' },
  { id: 'c3', name: 'Rabies Vaccine', status: 'verified' },
  { id: 'c4', name: 'Microchip', status: 'pending' },
];

// The fake user we will log in as
export const FAKE_USER = {
  uid: 'fake-user-uid',
  email: 'user@test.com',
  name: 'Demo User',
};