import * as moment from 'moment';
import { AppointmentStatus } from '../app-models/enums';
import { Appointment } from '../app-models/interfaces';

export const DataConverters = {
  Appointments: {
    fromText: (scheduleText: string): Appointment[] => {
      const returnList: Appointment[] = [];
      const allLines = scheduleText.split(/\r|\n/);
      for (const line of allLines) {
        if (!line || line.length === 0) continue;
        const dataItem = line.split('-');
        const start = DataConverters.Time.to24hFormat(dataItem[0]);
        const patient = dataItem[1];
        const doctor = dataItem[2];
        returnList.push({
          id: `${start}-${patient}-${doctor}`,
          startTime: start,
          patientCode: patient,
          doctorCode: doctor,
          durationMins: 0,
          status: AppointmentStatus.NotStarted,
        });
      }
      return returnList;
    },
  },
  Enums: {
    toKeyStrings<TEnum>(instance: TEnum): string[] {
      return Object.keys(instance)
        .map((key) => instance[key])
        .filter((value) => typeof value === 'string') as string[];
    },
  },
  Time: {
    to24hFormat: (input: string): string => {
      let hourValue = 0;
      let minuteValue = '00';
      const ampm = input.slice(input.length - 2, input.length);

      if (input.length === 3) {
        hourValue = Number(input.substring(0, 1));
      }

      if (input.length === 4) {
        hourValue = Number(input.substring(0, 2));
      }

      if (input.length === 5) {
        hourValue = Number(input.substring(0, 1));
        minuteValue = input.substring(1, 3);
      }

      if (input.length === 6) {
        hourValue = Number(input.substring(0, 2));
        minuteValue = input.substring(2, 4);
      }

      if (ampm === 'pm' && hourValue < 12) {
        hourValue += 12;
      }

      return `${hourValue.toString().padStart(2, '0')}${minuteValue}`;
    },
    toNowHHmm: (): string => {
      return moment().format('HHmm');
    },
    fromDateToHHmm: (input: moment.Moment): string => {
      return input.format('HHmm');
    },
    fromHHmmToAmPm: (input: string): string => {
      return input.length === 4
        ? moment(input, 'HHmm').format('hh:mm a')
        : input;
    },
  },
};
