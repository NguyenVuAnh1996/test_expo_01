import getLunarDate from "./lunarCalendar"

declare type LunarDate = {
  day: number
  month: number
  year: number
  leap: number
  jd: number
}

declare type GetLunarDate = (dd: number, mm: number, yyyy: number) => LunarDate

declare const getLunarDate: GetLunarDate

export default getLunarDate;