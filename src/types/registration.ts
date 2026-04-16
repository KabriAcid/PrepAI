export type AccountType = 'student' | 'school_admin' | null;

export interface StudentFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface SchoolAdminFormData {
    adminName: string;
    adminPhone: string;
    adminEmail: string;
    schoolState: string;
    schoolLGA: string;
    schoolAddress: string;
    numberOfStudents: number;
    password: string;
    password_confirmation: string;
}

export interface RegistrationData {
    admin_email?: string;
    formatted_amount?: string;
    school_name?: string;
    school_code?: string;
    number_of_students?: number;
}
