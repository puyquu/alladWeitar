export default function Build(value) {
    const startDay = value.clone().startOf("month").startOf("week");
    const endDay = value.clone().endOf("month").endOf("week");
    const day = startDay.clone().subtract(1, "day");

    const calendar = [];

    while(day.isBefore(endDay, "day")){
        calendar.push(Array(7).fill().map(() => day.add(1, "day").clone()));
    }

    return calendar
 }