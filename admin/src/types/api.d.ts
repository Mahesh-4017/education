interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  role: {
    _id: string;
    name: string;
    permission: string[]
  }
}
interface Role {
  _id: string;
  name: string;
  permissions: string[]
}
interface AdminInitialState {
  user?: User;
  admins: User[]
  auth: boolean;
}

interface RoleInitialState {
  roles: Role[]
}
interface ErrorResponse {
  success: false;
  message: string;
}

interface Astrologer {
  _id: string;
  email: string;
  applicationStatus: "UNVERIFIED" | "DRAFT" | "SUBMITTED" | "WFA" | "APPROVED" | "REJECTED" | "BANNED";
  personal?: {
    fullName?: string;
    gender?: string;
    dob?: string;
    phone?: string;
    country?: string;
    timezone?: string;
  };
  professionalInfo?: {
    displayName: string;
    username?: string;
    skill: { _id: string; name: string }[];
    languages: { _id: string; name: string }[];
    about?: string;
    experienceYears?: number;
    ppm?: number;
    avatar?: {
      url: string;
      public_id?: string;
    };
  };
}
interface AstrologerInitialState {
  newApplication: Astrologer[]
}

