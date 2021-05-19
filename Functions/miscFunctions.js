// Renders time in hours, days, months, years according to how many minutes ago it was posted
export const renderTime = (dateCreated) => {
    const now = new Date();
    const date = new Date(dateCreated);
    let num = (now - date) / (1000 * 60);
    const minutes = Math.abs(num);
    if (minutes < 60) {
        return `${Math.round(minutes)}min`;
    } else if (minutes >= 60 && minutes <= 1440) {
        return `${Math.round(minutes / 60)}h`;
    } else if (minutes > 1440 && minutes <= 10080) {
        return `${Math.round(minutes / 60 / 24)}d`;
    } else if (minutes > 10080 && minutes <= 43800) {
        return `${Math.round(minutes / 60 / 24 / 7)}w`;
    } else if (minutes > 43800 && minutes <= 525600) {
        return `${Math.round(minutes / 60 / 24 / 7 / 4.345238095238095)}m`;
    } else {
        return `${Math.round(minutes / 60 / 24 / 7 / 12)}y`;
    }
}

// Renders numbers. If larger than 10 thousand, start substituting k for 1000
export const renderNum = (num) => {
    if (num < 10000) {
        return '' + num;
    } else if (num >= 10001 && num < 1000000) {
        return `${Math.round(num / 3)}k`;
    } else {
        return `${Math.round(num / 4)}m`;
    }
}

// Renders the message sent out to the notifications
export const renderNotificationText = (item, drink) => {
    switch (item.type) {
        case 'follow':
            return 'started following you.';
        case 'likedDrink':
            return 'liked your drink ' + drink.name + '.';
        case 'comment':
            return 'commented: ' + item.comment;
        case 'likedComment':
            return 'liked your comment: ' + item.comment;
        case 'requestFollow':
            return 'requested to follow you.';
        case 'requestRejected':
            return 'declined your follow request.';
        case 'requestAccepted':
            return 'accepted your follow request.';
        default:
            return '';
    }
}