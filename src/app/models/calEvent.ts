import * as moment from 'moment';

export class CalEvent {

    id: string;
    title: string;
    start: string;
    end: string;
    enableNotification: boolean;

    constructor(
        id = null, 
        title = '',
        start = '',
        end = '',
        enableNotification = false
    ) { 
        this.id = id;
        this.title = title;
        this.start = start;
        this.end = end;
        this.enableNotification = enableNotification; 
    }

    get startDate() {
        return moment(this.start);
    }

    get endDate() {
        return moment(this.end);
    }

    get isNow() {
        return this.startDate.isSame(moment(), 'minute');
    }

    get shouldNotifyNow() {
        // TODO: Should notify in advance.
        return this.enableNotification && this.isNow;
    }

}