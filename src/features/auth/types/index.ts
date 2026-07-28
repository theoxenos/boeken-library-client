export type TUserLogin = {
    email: string,
    password: string,
}

export type TUserRegistration = {
    name: string,
} & TUserLogin

export type TUserLoginResponse = {
    token: string,
    email: string,
    name: string,
}

export type TUserContextType = {
    user: TUserLoginResponse | null;
    setUser: (value: TUserLoginResponse | null) => void;
};