export default function timeLeft(start){
    const startTimestamp = new Date(start).getTime();
    const currentTimestamp = new Date().getTime();
    const timeLeft = (startTimestamp - currentTimestamp)/1000; //in seconds
    const hoursLeft = Math.floor(timeLeft / (3600));
    const minutesLeft = Math.floor((timeLeft - hoursLeft*3600)/60);
    const secondsLeft = Math.floor(timeLeft - hoursLeft*3600 - minutesLeft*60);

    return {
        hours:('0'+hoursLeft).slice(-2),
        minutes:('0'+minutesLeft).slice(-2),
        seconds:('0'+secondsLeft).slice(-2)
    }
}