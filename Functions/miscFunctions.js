// Renders time in hours, days, months, years according to how many minutes ago it was posted
export const renderTime = (dateCreated) => {
    const now = new Date();
    const date = new Date(dateCreated);
    const minutes = (now - date) / (1000 * 60);

    if (minutes < 60) {
        return `${Math.round(minutes)}m`;
    } else if (minutes >= 60 && minutes <= 1440) {
        return `${Math.round(minutes / 60)}h`;
    } else if (minutes > 1440 && minutes <= 10080) {
        return `${Math.round(minutes / 60 / 24)}d`;
    } else if (minutes > 10080 && minutes <= 43800) {
        return `${Math.round(minutes / 60 / 24 / 7)}m`;
    } else {
        return `${Math.round(minutes / 60 / 24 / 7 / 12)}y`;
    }
}