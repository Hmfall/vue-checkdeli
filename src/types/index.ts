export type Theme = 'light' | 'dark';

export interface User {
    id: Id;
    name: string;
}

export interface Product {
    id: Id;
    name: string;
    price: Nullable<number>;
    payer: User;
    users: User[];
}

export interface DebtorCreditor {
    debtor: User;
    creditor: User;
    bill: number;
}

export interface MappedByCreditor {
    creditor: User;
    debtors: DebtorCreditor[];
}

export interface MappedByDebtor {
    debtor: User;
    creditors: DebtorCreditor[];
}
