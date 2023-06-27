export function convertDateObjectToString(dateTimeString: Date) {
    const year = dateTimeString.getFullYear();
    const month = (dateTimeString.getMonth() + 1).toString()
        .padStart(2, "0");
    const day = dateTimeString.getDate().toString()
        .padStart(2, "0");
    const hours = dateTimeString.getHours().toString()
        .padStart(2, "0");
    const minutes = dateTimeString.getMinutes().toString()
        .padStart(2, "0");
    const seconds = dateTimeString.getSeconds().toString()
        .padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function sanitisePrismaObject(data: any) {
    if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            const keys = Object.keys(data[i]);
            keys.forEach(key => {
                if (data[i][key] instanceof Date) {
                    data[i][key] = convertDateObjectToString(data[i][key]);
                }
                else if (typeof data[i][key] === "object") {
                    sanitisePrismaObject(data[i][key]);
                }
            })
        }
    }
    else {
        const keys = Object.keys(data);
        keys.forEach(key => {
            if (data[key] instanceof Date) {
                data[key] = convertDateObjectToString(data[key]);
            }
            else if (typeof data[key] === typeof Object) {
                sanitisePrismaObject(data[key]);
            }
        });
    }
}