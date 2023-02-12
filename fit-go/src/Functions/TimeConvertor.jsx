import { fromSeconds } from 'from-seconds';

export default function TimeConvertor({seconds}) {
    const time = () => {
        const result = fromSeconds(seconds);
        var time = '';
        const resultToHour = result.toHours();
        if(resultToHour.hours > 0){
            time = time + resultToHour.hours + 'h' + ((resultToHour.minutes !== 0) ? resultToHour.minutes : '');
        } else {
            if(resultToHour.minutes > 0){
                time = time + resultToHour.minutes + 'min' + ((resultToHour.seconds !== 0) ? resultToHour.seconds : '');
            } else {
                time = time + resultToHour.seconds + 's';
            }
        }
        return time;
    }


  return (
    time()
  );
};
