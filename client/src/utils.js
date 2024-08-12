export const formatTimeRemaining = (totalSeconds) => {
    if (totalSeconds <= 0) return '0 seconds left';

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const hourText = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '';
    const minuteText = minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : '';
    const secondText = seconds > 0 ? `${seconds} second${seconds > 1 ? 's' : ''}` : '';

    return [hourText, minuteText, secondText].filter(Boolean).join(' ') + ' left';
};