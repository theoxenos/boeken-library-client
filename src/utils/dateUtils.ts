type TFormatOptions = {
    locale?: string;
    options?: Intl.DateTimeFormatOptions;
}

export const formatDateToLocale = (date: Date, {locale, options}: TFormatOptions = {}) => {
    return new Intl.DateTimeFormat(locale, options).format(date);
};