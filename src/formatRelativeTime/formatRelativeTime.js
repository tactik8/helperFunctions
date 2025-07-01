// Function to format a date into a relative time string
/**
 * Formats a date into a human-readable string representing the time difference from now.
 * @param {any} dateInput - The input date/time. Can be a Date object, a number (timestamp), or a string convertible to a Date.
 * @returns {string} A human-readable string representing the time difference, or "Invalid Date" if the input cannot be converted.
 * @example
 * // Assuming current time is 2023-10-27 10:00:00
 * formatRelativeTime(new Date()); // Returns "just now"
 * formatRelativeTime(new Date(Date.now() - 15 * 1000)); // Returns "just now" (15 seconds ago)
 * formatRelativeTime(new Date(Date.now() - 45 * 1000)); // Returns "less than a minute ago" (45 seconds ago)
 * formatRelativeTime(new Date(Date.now() - 30 * 60 * 1000)); // Returns "30 minutes ago"
 * formatRelativeTime(new Date(Date.now() - 5 * 60 * 60 * 1000)); // Returns "5 hours ago"
 * // Assuming checked on 2023-10-28 10:00:00
 * formatRelativeTime(new Date("2023-10-27T11:00:00Z")); // Returns "yesterday" (calendar day check)
 * // Assuming checked on 2023-11-15 10:00:00
 * formatRelativeTime(new Date("2023-10-15T10:00:00Z")); // Returns "last month" (calendar month check)
 * // Assuming checked on 2024-10-15 10:00:00
 * formatRelativeTime(new Date("2023-10-15T10:00:00Z")); // Returns "last year" (calendar year check)
 * formatRelativeTime(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)); // Returns "10 days ago"
 * formatRelativeTime(new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000)); // Returns "6 months ago" (approx)
 * formatRelativeTime(new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000)); // Returns "2 years ago" (approx)
 * formatRelativeTime("invalid date string"); // Returns "Invalid Date"
 */
function formatRelativeTime(dateInput) {
    // Attempt to convert the input to a Date object
    const dateObject = new Date(dateInput);

    // Check if the date is valid (isNaN(dateObject.getTime()) is the reliable way)
    if (isNaN(dateObject.getTime())) {
        return "Invalid Date";
    }

    const now = Date.now();
    // Calculate the difference in milliseconds. Positive for past dates, negative for future.
    const diff = now - dateObject.getTime();

    // Handle future dates as per requirements: return "just now".
    if (diff < 0) {
        return "just now";
    }

    // --- Calculate durations in various units based on milliseconds difference ---
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    // Duration days calculated from hours difference
    const daysDuration = Math.floor(hours / 24);
    // Approximate duration months (using 30 days/month)
    const monthsDuration = Math.floor(daysDuration / 30);
    // Approximate duration years (using 365 days/year)
    const yearsDuration = Math.floor(daysDuration / 365);

    // --- Prepare for calendar-based checks (yesterday, last month, last year) ---
    // Create Date objects set to midnight for current day and input day
    const todayMidnight = new Date(now);
    todayMidnight.setHours(0, 0, 0, 0);
    const inputMidnight = new Date(dateObject);
    inputMidnight.setHours(0, 0, 0, 0);

    // Calculate the difference in calendar days (midnight to midnight)
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysDiffCalendar = Math.floor((todayMidnight.getTime() - inputMidnight.getTime()) / msPerDay);

    // Get calendar year and month for last month/year checks
    const currentYear = new Date(now).getFullYear();
    const inputYear = dateObject.getFullYear();
    const currentMonth = new Date(now).getMonth(); // 0-indexed (0=Jan, 11=Dec)
    const inputMonth = dateObject.getMonth(); // 0-indexed

    // --- Apply formatting rules in the specified prioritized order ---

    // Rule 1: Less than 30 seconds ago (duration)
    if (seconds < 30) {
        return "just now";
    }
    // Rule 2: Less than 60 seconds ago (duration)
    if (seconds < 60) {
        return "less than a minute ago";
    }
    // Rule 3: Less than 60 minutes ago (duration)
    if (minutes < 60) {
        return `${minutes} minutes ago`;
    }
    // Rule 4: Less than 24 hours ago (duration)
    if (hours < 24) {
        return `${hours} hours ago`;
    }

    // Rule 5: If the input date's calendar day is exactly one day before the current date's calendar day (calendar)
    if (daysDiffCalendar === 1) {
       return "yesterday";
    }

    // Rule 6: Less than 30 days ago (duration)
    // Note: This comes AFTER the calendar "yesterday" check.
    if (daysDuration < 30) {
        return `${daysDuration} days ago`;
    }

    // Rule 7: If the input date's calendar month is exactly one month before the current date's calendar month (calendar)
    // Check across year boundary (Dec -> Jan) as well.
    if ((currentYear === inputYear && currentMonth === inputMonth + 1) ||
        (currentYear === inputYear + 1 && currentMonth === 0 && inputMonth === 11)) {
        return "last month";
    }

    // Rule 8: Less than 12 months ago (duration, approx 30 days/month)
    // Note: This comes AFTER the calendar "last month" check.
    if (monthsDuration < 12) {
        return `${monthsDuration} months ago`;
    }

    // Rule 9: If the input date's calendar year is exactly one year before the current date's calendar year (calendar)
    if (currentYear === inputYear + 1) {
        return "last year";
    }

    // Rule 10: 1 year or more ago (duration, approx 365 days/year)
    // This is the final catch-all for older dates based on duration.
     if (yearsDuration >= 1) {
        return `${yearsDuration} years ago`;
     }

     // This return should ideally not be reached for any valid date in the past,
     // as the previous conditions cover all durations >= 0.
     // Returning "Invalid Date" as a safe fallback, though it implies an issue
     // if reached with a seemingly valid past date.
    return "Invalid Date";
}
