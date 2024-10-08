import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

export const StyledCalendar = styled(Calendar)`
  width: 100%;
  height: 100%;
  margin: 0 auto;

  .react-calendar__month-view__weekdays__weekday abbr {
    color: black;
    text-decoration: none;
  }
`;
