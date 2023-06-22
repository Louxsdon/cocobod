import classNames from "classnames";
export const generateSlug = (text) => {
    const noSpecialChars = text.replace(/[^\w\s-]/g, "");
    const noWhitespace = noSpecialChars.trim().replace(/\s+/g, "-");
    return noWhitespace.toLowerCase();
};

export function toCurrency(currency) {
    return Number(currency).toLocaleString("en-US", {
        style: "currency",
        currency: "GHS",
    });
}

export const cn = classNames;

export const currencyCode = "&#x20B5";
