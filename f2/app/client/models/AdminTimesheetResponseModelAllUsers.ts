/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClockTimesResponseModel } from './ClockTimesResponseModel';
import type { UserResponseModel } from './UserResponseModel';
import type { UserTimeZoneResponseModel } from './UserTimeZoneResponseModel';

export type AdminTimesheetResponseModelAllUsers = {
    clock_times?: Array<ClockTimesResponseModel>;
    users?: Array<UserResponseModel>;
    user_time_zones?: Array<UserTimeZoneResponseModel>;
    all_users?: Array<UserResponseModel>;
};

