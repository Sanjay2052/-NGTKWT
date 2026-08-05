export const JOBS_BY_CATEGORY = {
  'Construction & Civil': [
    'Civil Engineer',
    'Site Engineer',
    'Project Engineer',
    'Construction Manager',
    'Site Supervisor',
    'Foreman',
    'Mason',
    'Carpenter',
    'Steel Fixer',
    'Scaffolder',
    'Painter',
    'Plumber',
    'Pipe Fitter',
    'Welder (MIG, TIG, ARC)',
    'Fabricator',
    'Rigger',
    'Surveyor',
    'Concrete Worker',
    'Tile Mason',
    'Gypsum Installer',
    'Glass Installer',
    'Waterproofing Technician'
  ],
  'Electrical & Electronics': [
    'Electrical Engineer',
    'Electrical Supervisor',
    'Electrician',
    'Industrial Electrician',
    'Maintenance Electrician',
    'Electrical Helper',
    'Instrument Technician',
    'Instrument Engineer',
    'Electronics Technician',
    'Control Panel Technician',
    'Cable Jointer'
  ],
  'Mechanical': [
    'Mechanical Engineer',
    'Mechanical Supervisor',
    'Mechanical Technician',
    'Maintenance Technician',
    'HVAC Technician',
    'Chiller Technician',
    'AC Technician',
    'Refrigeration Technician',
    'Pump Technician',
    'Compressor Technician',
    'Generator Technician',
    'Diesel Mechanic',
    'Auto Electrician',
    'Heavy Equipment Mechanic',
    'Machine Operator'
  ],
  'Oil & Gas': [
    'Pipeline Technician',
    'Pipe Fitter',
    'Mechanical Fitter',
    'Instrument Fitter',
    'Valve Technician',
    'Rotating Equipment Technician',
    'Static Equipment Technician',
    'QA/QC Inspector',
    'NDT Technician',
    'HSE Officer',
    'Fire Watch',
    'Gas Tester'
  ],
  'Land & Offshore Drilling': [
    'Senior Tool Pusher',
    'Night Tool Pusher',
    'Driller',
    'Assistant Driller',
    'Derrickman',
    'Floorman',
    'Senior Electrician',
    'Senior Mechanic',
    'Mechanical Helper',
    'Electrical Helper',
    'Instrumentation Technician (IT)',
    'Welder',
    'Radio Operator'
  ],
  'Manufacturing & Factory': [
    'Production Operator',
    'Assembly Technician',
    'CNC Operator',
    'CNC Programmer',
    'Lathe Operator',
    'Milling Machine Operator',
    'Press Machine Operator',
    'Forklift Operator',
    'Warehouse Operator',
    'Packing Staff',
    'Quality Inspector',
    'Production Supervisor'
  ],
  'Logistics & Warehouse': [
    'Warehouse Supervisor',
    'Storekeeper',
    'Inventory Controller',
    'Forklift Driver',
    'Reach Truck Operator',
    'Material Handler',
    'Picker',
    'Packer',
    'Dispatcher',
    'Logistics Coordinator'
  ],
  'Transportation': [
    'Light Vehicle Driver',
    'Heavy Vehicle Driver',
    'Bus Driver',
    'Truck Driver',
    'Trailer Driver',
    'Crane Operator',
    'Excavator Operator',
    'Bulldozer Operator',
    'Grader Operator',
    'Roller Operator',
    'Bobcat Operator',
    'Loader Operator'
  ],
  'Hospitality': [
    'Hotel Manager',
    'Receptionist',
    'Front Office Executive',
    'Housekeeping Supervisor',
    'Housekeeping Staff',
    'Room Attendant',
    'Waiter',
    'Waitress',
    'Barista',
    'Chef',
    'Cook',
    'Kitchen Helper',
    'Dishwasher',
    'Steward',
    'Baker'
  ],
  'Healthcare': [
    'Doctor',
    'Registered Nurse',
    'Nursing Assistant',
    'Caregiver',
    'Physiotherapist',
    'Pharmacist',
    'Lab Technician',
    'Radiographer',
    'Medical Receptionist',
    'Ambulance Driver'
  ],
  'Office & Administration': [
    'Office Administrator',
    'Administrative Assistant',
    'Secretary',
    'Executive Assistant',
    'Data Entry Operator',
    'Document Controller',
    'HR Executive',
    'HR Assistant',
    'Recruiter',
    'Payroll Executive',
    'Accountant',
    'Accounts Assistant',
    'Procurement Officer',
    'Purchase Executive'
  ],
  'Human Resources & Administration': [
    'HR Manager',
    'HR Supervisor',
    'HR Coordinator'
  ],
  'Sales & Marketing': [
    'Sales Executive',
    'Sales Representative',
    'Business Development Executive',
    'Business Development Manager',
    'Marketing Executive',
    'Digital Marketing Executive',
    'Social Media Executive',
    'Telemarketing Executive',
    'Customer Service Representative',
    'Call Center Agent'
  ],
  'IT': [
    'IT Support Technician',
    'Help Desk Executive',
    'Network Engineer',
    'System Administrator',
    'Software Developer',
    'Web Developer',
    'Mobile App Developer',
    'Database Administrator',
    'Cybersecurity Analyst',
    'Cloud Engineer'
  ],
  'Security': [
    'Security Guard',
    'Security Supervisor',
    'CCTV Operator',
    'Access Control Operator',
    'Security Officer'
  ],
  'Cleaning & Facility Management': [
    'Cleaner',
    'Janitor',
    'Housekeeper',
    'Office Cleaner',
    'Industrial Cleaner',
    'Pest Control Technician',
    'Laundry Staff',
    'Waste Management Worker'
  ],
  'Retail': [
    'Cashier',
    'Sales Associate',
    'Store Manager',
    'Store Supervisor',
    'Merchandiser',
    'Inventory Assistant'
  ],
  'Agriculture & Landscaping': [
    'Gardener',
    'Landscaper',
    'Irrigation Technician',
    'Farm Worker',
    'Greenhouse Worker'
  ],
  'Marine': [
    'Marine Engineer',
    'Deckhand',
    'Seaman',
    'Welder',
    'Ship Electrician',
    'Ship Fitter'
  ],
  'Aviation': [
    'Ground Staff',
    'Baggage Handler',
    'Aircraft Cleaner',
    'Aircraft Technician',
    'Cargo Handler'
  ],
  'Telecommunications': [
    'Fiber Optic Technician',
    'Telecom Technician',
    'Tower Climber',
    'Network Installation Technician'
  ],
  'General Labor': [
    'General Laborer',
    'Helper',
    'Skilled Laborer',
    'Semi-skilled Worker',
    'Unskilled Worker',
    'Loading & Unloading Staff'
  ],
  'Management & Professional': [
    'Project Manager',
    'Operations Manager',
    'Facility Manager',
    'Maintenance Manager',
    'QA/QC Manager',
    'HSE Manager',
    'Procurement Manager',
    'Finance Manager',
    'HR Manager',
    'Business Manager'
  ]
};

export const JOB_CATEGORIES = Object.keys(JOBS_BY_CATEGORY);

export const WORKER_POSITIONS = Array.from(
  new Set(Object.values(JOBS_BY_CATEGORY).flat())
);
