// Patient Types
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: {
    allergies: string[];
    conditions: string[];
    medications: string[];
    previousSurgeries: string[];
  };
  dentalHistory: {
    previousDentist?: string;
    lastVisit?: Date;
    concerns: string[];
  };
  insurance?: {
    provider: string;
    policyNumber: string;
    groupNumber?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'inactive' | 'archived';
}

// Staff/Dentist Types
export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'dentist' | 'hygienist' | 'assistant' | 'receptionist' | 'admin';
  specialty?: string;
  licenseNumber?: string;
  avatar?: string;
  schedule: {
    monday: { start: string; end: string; available: boolean };
    tuesday: { start: string; end: string; available: boolean };
    wednesday: { start: string; end: string; available: boolean };
    thursday: { start: string; end: string; available: boolean };
    friday: { start: string; end: string; available: boolean };
    saturday: { start: string; end: string; available: boolean };
    sunday: { start: string; end: string; available: boolean };
  };
  color: string;
  status: 'active' | 'on_leave' | 'inactive';
}

// Service/Treatment Types
export interface Service {
  id: string;
  code: string;
  name: string;
  description: string;
  category: 'preventive' | 'restorative' | 'cosmetic' | 'orthodontic' | 'surgical' | 'diagnostic';
  duration: number;
  basePrice: number;
  requirements?: string[];
  contraindications?: string[];
  color: string;
}

// Appointment Types
export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  dentistId: string;
  dentistName: string;
  serviceIds: string[];
  services: string[];
  date: Date;
  startTime: string;
  endTime: string;
  duration: number;
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  room?: string;
  notes?: string;
  chiefComplaint?: string;
  treatmentNotes?: string;
  prescribedMedications?: string[];
  followUpRequired?: boolean;
  followUpDate?: Date;
  cost: number;
  paid: number;
  paymentStatus: 'pending' | 'partial' | 'paid' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

// Treatment Record Types
export interface TreatmentRecord {
  id: string;
  patientId: string;
  appointmentId: string;
  dentistId: string;
  date: Date;
  diagnosis: string;
  procedures: Procedure[];
  notes: string;
  attachments?: string[];
  nextVisitRecommendation?: string;
}

export interface Procedure {
  serviceId: string;
  serviceName: string;
  teeth: number[];
  description: string;
  materials?: string[];
  cost: number;
}

// Invoice/Billing Types
export interface Invoice {
  id: string;
  patientId: string;
  patientName: string;
  appointmentId?: string;
  invoiceNumber: string;
  date: Date;
  dueDate: Date;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paid: number;
  balance: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  paymentMethod?: 'cash' | 'card' | 'check' | 'insurance' | 'online';
  insuranceClaim?: {
    submitted: boolean;
    claimNumber?: string;
    approved?: boolean;
    approvedAmount?: number;
  };
}

export interface InvoiceItem {
  id: string;
  serviceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// Analytics Types
export interface DashboardStats {
  totalPatients: number;
  newPatientsThisMonth: number;
  totalAppointments: number;
  appointmentsToday: number;
  revenueThisMonth: number;
  revenueLastMonth: number;
  outstandingPayments: number;
  treatmentCompletionRate: number;
}

export interface MonthlyStats {
  month: string;
  appointments: number;
  revenue: number;
  newPatients: number;
}

// Calendar Types
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  patientId?: string;
  patientName?: string;
  dentistId?: string;
  dentistName?: string;
  service?: string;
  status: Appointment['status'];
  color: string;
}

// Form Data Types
export type PatientFormData = Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>;
export type AppointmentFormData = Omit<Appointment, 'id' | 'createdAt' | 'updatedAt' | 'patientName' | 'dentistName' | 'services'>;
export type StaffFormData = Omit<Staff, 'id'>;
