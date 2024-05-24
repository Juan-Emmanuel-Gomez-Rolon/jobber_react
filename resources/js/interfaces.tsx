interface IOffer {
    id: number;
    user_id: number;
    title: string;
    description: string;
    category: string;
    created_at: string;
    updated_at: string;
    applications_count: number;
    created_at_human: string;
    created_long_ago: string;
    updated_at_human: string;
    updated_long_ago: string;
    applications?: IApplication[];
    recruiter?: IUser;
    is_applied?: boolean;
    application?: IApplication;
}

const emptyOffer: IOffer = {
    id: 0,
    user_id: 0,
    title: "",
    description: "",
    category: "",
    created_at: "",
    updated_at: "",
    applications_count: 0,
    created_at_human: "",
    created_long_ago: "",
    updated_at_human: "",
    updated_long_ago: "",
};

interface IApplication {
    id: number;
    offer_id: number;
    user_id: number;
    status: string;
    created_at: string;
    updated_at: string;
    created_at_human: string;
    created_long_ago: string;
    updated_at_human: string;
    updated_long_ago: string;
    user?: IUser;
    offer?: IOffer;
}

const emptyApplication: IApplication = {
    id: 0,
    offer_id: 0,
    user_id: 0,
    status: "",
    created_at: "",
    updated_at: "",
    created_at_human: "",
    created_long_ago: "",
    updated_at_human: "",
    updated_long_ago: "",
};

interface IUser {
    id: number;
    name: string;
    email: string;
    phone?: any;
    password?: any;
    description?: any;
    account_type: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    created_at_human: string;
    created_long_ago: string;
    updated_at_human: string;
    updated_long_ago: string;
}

const emptyUser: IUser = {
    id: 0,
    name: "",
    email: "",
    phone: "",
    password: "",
    description: "",
    account_type: "",
    email_verified_at: "",
    created_at: "",
    updated_at: "",
    created_at_human: "",
    created_long_ago: "",
    updated_at_human: "",
    updated_long_ago: "",
};

export { IOffer, IApplication, IUser, emptyOffer, emptyApplication, emptyUser };
