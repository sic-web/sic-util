declare const val_number: (_: any, value: any) => Promise<void>;
declare const val_two_percent: (_: any, value: any) => Promise<void>;
declare const val_three_percent: (_: any, value: any) => Promise<void>;
declare const val_amount: (_: any, value: any) => Promise<void>;
declare const val_idcard: (_rule: any, value: any) => Promise<void>;
declare const val_phone: (_: any, value: any) => Promise<void>;
declare const val_landline: (_: any, value: any) => Promise<void>;
declare const val_email: (_: any, value: any) => Promise<void>;
declare const val_space: (_: any, value: any) => Promise<void>;
declare const val_beforeAfter_space: (_: any, value: any) => Promise<void>;

export { val_amount, val_beforeAfter_space, val_email, val_idcard, val_landline, val_number, val_phone, val_space, val_three_percent, val_two_percent };
