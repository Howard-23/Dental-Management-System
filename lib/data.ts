import { Patient, Staff, Service, Appointment, TreatmentRecord, Invoice, DashboardStats, MonthlyStats } from './types';
import { v4 as uuidv4 } from 'uuid';

// Sample Staff/Dentists
export const staff: Staff[] = [
  {
    id: 'staff-1',
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@dentalcarepro.com',
    phone: '+1 (555) 101-0001',
    role: 'dentist',
    specialty: 'General Dentistry',
    licenseNumber: 'DEN-NY-12345',
    avatar: '/avatars/sarah.jpg',
    color: '#3b82f6',
    schedule: {
      monday: { start: '09:00', end: '17:00', available: true },
      tuesday: { start: '09:00', end: '17:00', available: true },
      wednesday: { start: '09:00', end: '17:00', available: true },
      thursday: { start: '09:00', end: '17:00', available: true },
      friday: { start: '09:00', end: '15:00', available: true },
      saturday: { start: '10:00', end: '14:00', available: true },
      sunday: { start: '00:00', end: '00:00', available: false },
    },
    status: 'active',
  },
  {
    id: 'staff-2',
    firstName: 'Dr. Michael',
    lastName: 'Chen',
    email: 'michael.chen@dentalcarepro.com',
    phone: '+1 (555) 101-0002',
    role: 'dentist',
    specialty: 'Orthodontics',
    licenseNumber: 'DEN-NY-12346',
    avatar: '/avatars/michael.jpg',
    color: '#10b981',
    schedule: {
      monday: { start: '10:00', end: '18:00', available: true },
      tuesday: { start: '10:00', end: '18:00', available: true },
      wednesday: { start: '10:00', end: '18:00', available: true },
      thursday: { start: '10:00', end: '18:00', available: true },
      friday: { start: '10:00', end: '16:00', available: true },
      saturday: { start: '00:00', end: '00:00', available: false },
      sunday: { start: '00:00', end: '00:00', available: false },
    },
    status: 'active',
  },
  {
    id: 'staff-3',
    firstName: 'Dr. Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@dentalcarepro.com',
    phone: '+1 (555) 101-0003',
    role: 'dentist',
    specialty: 'Cosmetic Dentistry',
    licenseNumber: 'DEN-NY-12347',
    avatar: '/avatars/emily.jpg',
    color: '#8b5cf6',
    schedule: {
      monday: { start: '08:00', end: '16:00', available: true },
      tuesday: { start: '08:00', end: '16:00', available: true },
      wednesday: { start: '08:00', end: '16:00', available: true },
      thursday: { start: '08:00', end: '16:00', available: true },
      friday: { start: '08:00', end: '14:00', available: true },
      saturday: { start: '09:00', end: '13:00', available: true },
      sunday: { start: '00:00', end: '00:00', available: false },
    },
    status: 'active',
  },
  {
    id: 'staff-4',
    firstName: 'Jennifer',
    lastName: 'Williams',
    email: 'jennifer.w@dentalcarepro.com',
    phone: '+1 (555) 101-0004',
    role: 'hygienist',
    color: '#f59e0b',
    schedule: {
      monday: { start: '09:00', end: '17:00', available: true },
      tuesday: { start: '09:00', end: '17:00', available: true },
      wednesday: { start: '09:00', end: '17:00', available: true },
      thursday: { start: '09:00', end: '17:00', available: true },
      friday: { start: '09:00', end: '15:00', available: true },
      saturday: { start: '00:00', end: '00:00', available: false },
      sunday: { start: '00:00', end: '00:00', available: false },
    },
    status: 'active',
  },
  {
    id: 'staff-5',
    firstName: 'Robert',
    lastName: 'Davis',
    email: 'robert.davis@dentalcarepro.com',
    phone: '+1 (555) 101-0005',
    role: 'receptionist',
    color: '#ef4444',
    schedule: {
      monday: { start: '08:00', end: '17:00', available: true },
      tuesday: { start: '08:00', end: '17:00', available: true },
      wednesday: { start: '08:00', end: '17:00', available: true },
      thursday: { start: '08:00', end: '17:00', available: true },
      friday: { start: '08:00', end: '16:00', available: true },
      saturday: { start: '09:00', end: '14:00', available: true },
      sunday: { start: '00:00', end: '00:00', available: false },
    },
    status: 'active',
  },
];

// Sample Services
export const services: Service[] = [
  {
    id: 'svc-001',
    code: 'D0120',
    name: 'Periodic Oral Evaluation',
    description: 'Comprehensive examination of teeth, gums, and oral tissues',
    category: 'preventive',
    duration: 30,
    basePrice: 4675,
    color: '#10b981',
  },
  {
    id: 'svc-002',
    code: 'D0150',
    name: 'Comprehensive Oral Evaluation',
    description: 'Detailed examination for new patients',
    category: 'diagnostic',
    duration: 45,
    basePrice: 6600,
    color: '#3b82f6',
  },
  {
    id: 'svc-003',
    code: 'D1110',
    name: 'Prophylaxis - Adult',
    description: 'Professional teeth cleaning and plaque removal',
    category: 'preventive',
    duration: 60,
    basePrice: 6875,
    color: '#10b981',
  },
  {
    id: 'svc-004',
    code: 'D2330',
    name: 'Resin-Based Composite Filling',
    description: 'Tooth-colored filling for cavities (one surface)',
    category: 'restorative',
    duration: 45,
    basePrice: 9900,
    color: '#f59e0b',
  },
  {
    id: 'svc-005',
    code: 'D2740',
    name: 'Crown - Porcelain/Ceramic',
    description: 'Custom ceramic crown for damaged teeth',
    category: 'restorative',
    duration: 90,
    basePrice: 68750,
    color: '#f59e0b',
  },
  {
    id: 'svc-006',
    code: 'D3310',
    name: 'Endodontic Therapy - Anterior',
    description: 'Root canal treatment for front teeth',
    category: 'surgical',
    duration: 90,
    basePrice: 46750,
    color: '#ef4444',
  },
  {
    id: 'svc-007',
    code: 'D7140',
    name: 'Extraction - Erupted Tooth',
    description: 'Simple tooth extraction',
    category: 'surgical',
    duration: 30,
    basePrice: 11000,
    color: '#ef4444',
  },
  {
    id: 'svc-008',
    code: 'D8080',
    name: 'Comprehensive Orthodontic Treatment',
    description: 'Full braces treatment (initial phase)',
    category: 'orthodontic',
    duration: 120,
    basePrice: 192500,
    color: '#8b5cf6',
  },
  {
    id: 'svc-009',
    code: 'D9972',
    name: 'Bleaching - External',
    description: 'Professional teeth whitening',
    category: 'cosmetic',
    duration: 60,
    basePrice: 24750,
    color: '#ec4899',
  },
  {
    id: 'svc-010',
    code: 'D0274',
    name: 'Bitewings - Four Films',
    description: 'X-ray imaging for diagnostic purposes',
    category: 'diagnostic',
    duration: 15,
    basePrice: 4125,
    color: '#3b82f6',
  },
];

// Sample Patients
export const patients: Patient[] = [
  {
    id: 'pat-001',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 201-0001',
    dateOfBirth: new Date('1985-03-15'),
    gender: 'male',
    address: '123 Main Street, Apt 4B, New York, NY 10001',
    emergencyContact: {
      name: 'Mary Smith',
      phone: '+1 (555) 201-0002',
      relationship: 'Spouse',
    },
    medicalHistory: {
      allergies: ['Penicillin'],
      conditions: ['Hypertension'],
      medications: ['Lisinopril'],
      previousSurgeries: ['Appendectomy 2010'],
    },
    dentalHistory: {
      previousDentist: 'Dr. Anderson',
      lastVisit: new Date('2023-06-15'),
      concerns: ['Teeth grinding', 'Sensitivity to cold'],
    },
    insurance: {
      provider: 'Delta Dental',
      policyNumber: 'DD123456789',
      groupNumber: 'GRP001',
    },
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2024-01-15'),
    status: 'active',
  },
  {
    id: 'pat-002',
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'maria.garcia@email.com',
    phone: '+1 (555) 202-0001',
    dateOfBirth: new Date('1992-07-22'),
    gender: 'female',
    address: '456 Oak Avenue, Brooklyn, NY 11201',
    emergencyContact: {
      name: 'Carlos Garcia',
      phone: '+1 (555) 202-0002',
      relationship: 'Brother',
    },
    medicalHistory: {
      allergies: [],
      conditions: [],
      medications: [],
      previousSurgeries: [],
    },
    dentalHistory: {
      concerns: ['Want whiter teeth'],
    },
    insurance: {
      provider: 'Cigna Dental',
      policyNumber: 'CI987654321',
    },
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2024-02-10'),
    status: 'active',
  },
  {
    id: 'pat-003',
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert.j@email.com',
    phone: '+1 (555) 203-0001',
    dateOfBirth: new Date('1978-11-08'),
    gender: 'male',
    address: '789 Pine Road, Queens, NY 11375',
    emergencyContact: {
      name: 'Susan Johnson',
      phone: '+1 (555) 203-0002',
      relationship: 'Wife',
    },
    medicalHistory: {
      allergies: ['Latex'],
      conditions: ['Type 2 Diabetes'],
      medications: ['Metformin'],
      previousSurgeries: ['Knee replacement 2019'],
    },
    dentalHistory: {
      previousDentist: 'Dr. Williams',
      lastVisit: new Date('2023-09-20'),
      concerns: ['Missing tooth #19', 'Difficulty chewing'],
    },
    insurance: {
      provider: 'Aetna',
      policyNumber: 'AE456789123',
    },
    createdAt: new Date('2023-03-05'),
    updatedAt: new Date('2024-01-20'),
    status: 'active',
  },
  {
    id: 'pat-004',
    firstName: 'Emily',
    lastName: 'Chen',
    email: 'emily.chen@email.com',
    phone: '+1 (555) 204-0001',
    dateOfBirth: new Date('2000-05-30'),
    gender: 'female',
    address: '321 Elm Street, Manhattan, NY 10016',
    emergencyContact: {
      name: 'David Chen',
      phone: '+1 (555) 204-0002',
      relationship: 'Father',
    },
    medicalHistory: {
      allergies: ['Sulfa drugs'],
      conditions: ['Asthma'],
      medications: ['Albuterol inhaler'],
      previousSurgeries: [],
    },
    dentalHistory: {
      concerns: ['Crowded teeth', 'Considering braces'],
    },
    createdAt: new Date('2023-04-12'),
    updatedAt: new Date('2024-02-05'),
    status: 'active',
  },
  {
    id: 'pat-005',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@email.com',
    phone: '+1 (555) 205-0001',
    dateOfBirth: new Date('1965-09-18'),
    gender: 'male',
    address: '654 Cedar Lane, Bronx, NY 10458',
    emergencyContact: {
      name: 'Lisa Brown',
      phone: '+1 (555) 205-0002',
      relationship: 'Daughter',
    },
    medicalHistory: {
      allergies: ['Codeine'],
      conditions: ['High cholesterol', 'Arthritis'],
      medications: ['Atorvastatin', 'Ibuprofen as needed'],
      previousSurgeries: ['Gallbladder removal 2015'],
    },
    dentalHistory: {
      previousDentist: 'Dr. Martinez',
      lastVisit: new Date('2022-12-10'),
      concerns: ['Dentures fitting poorly', 'Sore spots'],
    },
    insurance: {
      provider: 'Medicare Advantage',
      policyNumber: 'MA789123456',
    },
    createdAt: new Date('2023-05-20'),
    updatedAt: new Date('2024-01-30'),
    status: 'active',
  },
];

// Sample Appointments
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

export let appointments: Appointment[] = [
  {
    id: 'apt-001',
    patientId: 'pat-001',
    patientName: 'John Smith',
    dentistId: 'staff-1',
    dentistName: 'Dr. Sarah Johnson',
    serviceIds: ['svc-003'],
    services: ['Prophylaxis - Adult'],
    date: today,
    startTime: '09:00',
    endTime: '10:00',
    duration: 60,
    status: 'scheduled',
    room: 'Room 1',
    chiefComplaint: 'Regular cleaning',
    cost: 6875,
    paid: 0,
    paymentStatus: 'pending',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    createdBy: 'staff-5',
  },
  {
    id: 'apt-002',
    patientId: 'pat-002',
    patientName: 'Maria Garcia',
    dentistId: 'staff-3',
    dentistName: 'Dr. Emily Rodriguez',
    serviceIds: ['svc-009'],
    services: ['Bleaching - External'],
    date: today,
    startTime: '10:30',
    endTime: '11:30',
    duration: 60,
    status: 'confirmed',
    room: 'Room 2',
    chiefComplaint: 'Teeth whitening consultation',
    cost: 24750,
    paid: 12375,
    paymentStatus: 'partial',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-25'),
    createdBy: 'staff-5',
  },
  {
    id: 'apt-003',
    patientId: 'pat-003',
    patientName: 'Robert Johnson',
    dentistId: 'staff-1',
    dentistName: 'Dr. Sarah Johnson',
    serviceIds: ['svc-005', 'svc-010'],
    services: ['Crown - Porcelain/Ceramic', 'Bitewings - Four Films'],
    date: today,
    startTime: '14:00',
    endTime: '15:45',
    duration: 105,
    status: 'scheduled',
    room: 'Room 1',
    chiefComplaint: 'Crown placement tooth #19',
    cost: 72875,
    paid: 0,
    paymentStatus: 'pending',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
    createdBy: 'staff-5',
  },
  {
    id: 'apt-004',
    patientId: 'pat-004',
    patientName: 'Emily Chen',
    dentistId: 'staff-2',
    dentistName: 'Dr. Michael Chen',
    serviceIds: ['svc-008'],
    services: ['Comprehensive Orthodontic Treatment'],
    date: tomorrow,
    startTime: '11:00',
    endTime: '13:00',
    duration: 120,
    status: 'scheduled',
    room: 'Room 3',
    chiefComplaint: 'Braces consultation',
    cost: 192500,
    paid: 0,
    paymentStatus: 'pending',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
    createdBy: 'staff-5',
  },
  {
    id: 'apt-005',
    patientId: 'pat-005',
    patientName: 'Michael Brown',
    dentistId: 'staff-1',
    dentistName: 'Dr. Sarah Johnson',
    serviceIds: ['svc-001'],
    services: ['Periodic Oral Evaluation'],
    date: tomorrow,
    startTime: '15:30',
    endTime: '16:00',
    duration: 30,
    status: 'scheduled',
    room: 'Room 1',
    chiefComplaint: 'Denture adjustment',
    cost: 4675,
    paid: 0,
    paymentStatus: 'pending',
    createdAt: new Date('2024-01-26'),
    updatedAt: new Date('2024-01-26'),
    createdBy: 'staff-5',
  },
];

// Sample Treatment Records
export const treatmentRecords: TreatmentRecord[] = [
  {
    id: 'tr-001',
    patientId: 'pat-001',
    appointmentId: 'apt-prev-001',
    dentistId: 'staff-1',
    date: new Date('2023-06-15'),
    diagnosis: 'Generalized mild gingivitis, multiple caries',
    procedures: [
      {
        serviceId: 'svc-003',
        serviceName: 'Prophylaxis - Adult',
        teeth: [],
        description: 'Full mouth scaling and polishing',
        materials: ['Prophy paste', 'Fluoride varnish'],
        cost: 125,
      },
      {
        serviceId: 'svc-004',
        serviceName: 'Resin-Based Composite Filling',
        teeth: [14, 15],
        description: 'Two-surface composite restorations',
        materials: ['Composite resin', 'Bonding agent'],
        cost: 360,
      },
    ],
    notes: 'Patient responded well to treatment. Advised to improve flossing technique.',
    nextVisitRecommendation: 'Follow-up cleaning in 6 months',
  },
];

// Sample Invoices
export const invoices: Invoice[] = [
  {
    id: 'inv-001',
    patientId: 'pat-001',
    patientName: 'John Smith',
    appointmentId: 'apt-prev-001',
    invoiceNumber: 'INV-2024-0001',
    date: new Date('2023-06-15'),
    dueDate: new Date('2023-07-15'),
    items: [
      { id: 'item-001', serviceId: 'svc-003', description: 'Prophylaxis - Adult', quantity: 1, unitPrice: 125, total: 125 },
      { id: 'item-002', serviceId: 'svc-004', description: 'Resin-Based Composite Filling (2 teeth)', quantity: 2, unitPrice: 180, total: 360 },
    ],
    subtotal: 485,
    tax: 2134,
    discount: 0,
    total: 28809,
    paid: 28809,
    balance: 0,
    status: 'paid',
    paymentMethod: 'card',
  },
  {
    id: 'inv-002',
    patientId: 'pat-002',
    patientName: 'Maria Garcia',
    appointmentId: 'apt-002',
    invoiceNumber: 'INV-2024-0002',
    date: new Date('2024-02-13'),
    dueDate: new Date('2024-03-13'),
    items: [
      { id: 'item-003', serviceId: 'svc-009', description: 'Bleaching - External', quantity: 1, unitPrice: 450, total: 450 },
    ],
    subtotal: 24750,
    tax: 1980,
    discount: 0,
    total: 26730,
    paid: 12375,
    balance: 14355,
    status: 'sent',
  },
];

// Dashboard Stats
export const dashboardStats: DashboardStats = {
  totalPatients: 847,
  newPatientsThisMonth: 23,
  totalAppointments: 156,
  appointmentsToday: 8,
  revenueThisMonth: 2488750,
  revenueLastMonth: 1739500,
  outstandingPayments: 708900,
  treatmentCompletionRate: 94,
};

// Monthly Stats for Charts
export const monthlyStats: MonthlyStats[] = [
  { month: 'Aug', appointments: 142, revenue: 2117500, newPatients: 18 },
  { month: 'Sep', appointments: 138, revenue: 1991000, newPatients: 15 },
  { month: 'Oct', appointments: 156, revenue: 2315500, newPatients: 22 },
  { month: 'Nov', appointments: 148, revenue: 2189000, newPatients: 19 },
  { month: 'Dec', appointments: 134, revenue: 1958000, newPatients: 16 },
  { month: 'Jan', appointments: 156, revenue: 1739500, newPatients: 20 },
  { month: 'Feb', appointments: 168, revenue: 2488750, newPatients: 23 },
];

// Helper Functions
export const getDentists = () => staff.filter(s => s.role === 'dentist');

export const getActivePatients = () => patients.filter(p => p.status === 'active');

export const getTodaysAppointments = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    aptDate.setHours(0, 0, 0, 0);
    return aptDate.getTime() === today.getTime();
  }).sort((a, b) => a.startTime.localeCompare(b.startTime));
};

export const getUpcomingAppointments = (days: number = 7) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const future = new Date(today);
  future.setDate(future.getDate() + days);
  
  return appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    return aptDate >= today && aptDate <= future;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getPatientById = (id: string) => patients.find(p => p.id === id);

export const getServiceById = (id: string) => services.find(s => s.id === id);

export const addAppointment = (appointment: Appointment) => {
  appointments.push(appointment);
};

export const updateAppointment = (id: string, updates: Partial<Appointment>) => {
  const index = appointments.findIndex(a => a.id === id);
  if (index !== -1) {
    appointments[index] = { ...appointments[index], ...updates, updatedAt: new Date() };
  }
};

export const deleteAppointment = (id: string) => {
  appointments = appointments.filter(a => a.id !== id);
};

export const generateInvoiceNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  return `INV-${year}-${random}`;
};
