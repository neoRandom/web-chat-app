type UserModel = {
    _id: string;
    email: string;
    fullName: string;
    profilePic: string;
    createdAt: string;
    updatedAt: string;
};

type MessageModel = {
    _id: string;
    senderId: string;
    receiverId: string;
    text: string | null;
    image: string | null;
    createdAt: string;
    updatedAt: string;
};

type SignUpForm = {
    fullName: string;
    email: string;
    password: string;
};

type LoginForm = {
    email: string;
    password: string;
};

type AuthStore = {
    authUser: UserModel | null;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;

    checkAuth: () => Promise<void>;

    signup: (data: SignUpForm) => Promise<void>;

    logout: () => Promise<void>;

    login: (data: LoginForm) => Promise<void>;

    updateProfile: (data: FormData) => Promise<void | any>;
};

type ThemeStore = {
    theme: string;

    setTheme: (theme?: string) => void
}

type AuthImagePatternParams = {
    title: string;
    subtitle: string;
};

export type {
    UserModel,
    MessageModel,
    SignUpForm,
    LoginForm,
    AuthStore,
    ThemeStore,
    AuthImagePatternParams,
};
