export type AccountType = 'student' | 'school_admin' | null;

export interface StudentFormData {
    name: string;
    email: string;
}

export interface SchoolAdminFormData {
    adminName: string;
    adminPhone: string;
    adminEmail: string;
    schoolState: string;
    schoolLGA: string;
    schoolName: string;
    schoolAddress: string;
    numberOfStudents: number;
}

export interface RegistrationData {
    admin_email?: string;
    formatted_amount?: string;
    school_name?: string;
    school_code?: string;
    number_of_students?: number;
}
