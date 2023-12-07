<script setup>
import { onMounted, ref } from "vue";
import Resource from "@/api/resource.js";
import { computed } from "vue";
import { bookingdashboard } from "@/api/dataApi.js";
import { useDisplay } from "vuetify";
const { width } = useDisplay();
onMounted(async () => {
  fetchData();
});
//COCW_DAY
const cocw_sport_pending_day = ref([]);
const cocw_sport_confirm_day = ref([]);
const cocw_sport_ongoing_day = ref([]);
const cocw_sport_done_day = ref([]);
const cocw_sport_cancel_day = ref([]);
//COCW_WEEK
const cocw_sport_pending_week = ref([]);
const cocw_sport_confirm_week = ref([]);
const cocw_sport_ongoing_week = ref([]);
const cocw_sport_done_week = ref([]);
const cocw_sport_cancel_week = ref([]);
//COCW_MONTH
const cocw_sport_pending_month = ref([]);
const cocw_sport_confirm_month = ref([]);
const cocw_sport_ongoing_month = ref([]);
const cocw_sport_done_month = ref([]);
const cocw_sport_cancel_month = ref([]);
//COCW_YEAR
const cocw_sport_pending_year = ref([]);
const cocw_sport_confirm_year = ref([]);
const cocw_sport_ongoing_year = ref([]);
const cocw_sport_done_year = ref([]);
const cocw_sport_cancel_year = ref([]);
//COGL_DAY
const cogl_sport_pending_day = ref([]);
const cogl_sport_confirm_day = ref([]);
const cogl_sport_ongoing_day = ref([]);
const cogl_sport_done_day = ref([]);
const cogl_sport_cancel_day = ref([]);
//COGL_WEEK
const cogl_sport_pending_week = ref([]);
const cogl_sport_confirm_week = ref([]);
const cogl_sport_ongoing_week = ref([]);
const cogl_sport_done_week = ref([]);
const cogl_sport_cancel_week = ref([]);
//COGL_MONTH
const cogl_sport_pending_month = ref([]);
const cogl_sport_confirm_month = ref([]);
const cogl_sport_ongoing_month = ref([]);
const cogl_sport_done_month = ref([]);
const cogl_sport_cancel_month = ref([]);
//COGL_YEAR
const cogl_sport_pending_year = ref([]);
const cogl_sport_confirm_year = ref([]);
const cogl_sport_ongoing_year = ref([]);
const cogl_sport_done_year = ref([]);
const cogl_sport_cancel_year = ref([]);
//COJW_DAY
const cojw_sport_pending_day = ref([]);
const cojw_sport_confirm_day = ref([]);
const cojw_sport_ongoing_day = ref([]);
const cojw_sport_done_day = ref([]);
const cojw_sport_cancel_day = ref([]);
//COJW_WEEK
const cojw_sport_pending_week = ref([]);
const cojw_sport_confirm_week = ref([]);
const cojw_sport_ongoing_week = ref([]);
const cojw_sport_done_week = ref([]);
const cojw_sport_cancel_week = ref([]);
//COJW_MONTH
const cojw_sport_pending_month = ref([]);
const cojw_sport_confirm_month = ref([]);
const cojw_sport_ongoing_month = ref([]);
const cojw_sport_done_month = ref([]);
const cojw_sport_cancel_month = ref([]);
//COJW_YEAR
const cojw_sport_pending_year = ref([]);
const cojw_sport_confirm_year = ref([]);
const cojw_sport_ongoing_year = ref([]);
const cojw_sport_done_year = ref([]);
const cojw_sport_cancel_year = ref([]);
//COBPI_DAY
const cobpi_sport_pending_day = ref([]);
const cobpi_sport_confirm_day = ref([]);
const cobpi_sport_ongoing_day = ref([]);
const cobpi_sport_done_day = ref([]);
const cobpi_sport_cancel_day = ref([]);
//COBPI_WEEK
const cobpi_sport_pending_week = ref([]);
const cobpi_sport_confirm_week = ref([]);
const cobpi_sport_ongoing_week = ref([]);
const cobpi_sport_done_week = ref([]);
const cobpi_sport_cancel_week = ref([]);
//COBPI_MONTH
const cobpi_sport_pending_month = ref([]);
const cobpi_sport_confirm_month = ref([]);
const cobpi_sport_ongoing_month = ref([]);
const cobpi_sport_done_month = ref([]);
const cobpi_sport_cancel_month = ref([]);
//COBPI_YEAR
const cobpi_sport_pending_year = ref([]);
const cobpi_sport_confirm_year = ref([]);
const cobpi_sport_ongoing_year = ref([]);
const cobpi_sport_done_year = ref([]);
const cobpi_sport_cancel_year = ref([]);
//CGDPI_DAY
const cgdpi_sport_pending_day = ref([]);
const cgdpi_sport_confirm_day = ref([]);
const cgdpi_sport_ongoing_day = ref([]);
const cgdpi_sport_done_day = ref([]);
const cgdpi_sport_cancel_day = ref([]);
//CGDPI_WEEK
const cgdpi_sport_pending_week = ref([]);
const cgdpi_sport_confirm_week = ref([]);
const cgdpi_sport_ongoing_week = ref([]);
const cgdpi_sport_done_week = ref([]);
const cgdpi_sport_cancel_week = ref([]);
//CGDPI_MONTH
const cgdpi_sport_pending_month = ref([]);
const cgdpi_sport_confirm_month = ref([]);
const cgdpi_sport_ongoing_month = ref([]);
const cgdpi_sport_done_month = ref([]);
const cgdpi_sport_cancel_month = ref([]);
//CGDPI_YEAR
const cgdpi_sport_pending_year = ref([]);
const cgdpi_sport_confirm_year = ref([]);
const cgdpi_sport_ongoing_year = ref([]);
const cgdpi_sport_done_year = ref([]);
const cgdpi_sport_cancel_year = ref([]);

const selectedDay = ref("Day");
const selectedStatus = ref("Pending");
const item = ref();
const loading = ref(false);
const status = {
  Today: ref([]),
  ThisWeek: ref([]),
  ThisMonth: ref([]),
  ThisYear: ref([]),
};
const cocwToday = ref([]);
const cobpiToday = ref([]);
const coglToday = ref([]);
const cojwToday = ref([]);
const cgdpiToday = ref([]);
const cocwThisWeek = ref([]);
const coglThisWeek = ref([]);
const cojwThisWeek = ref([]);
const cobpiThisWeek = ref([]);
const cgdpiThisWeek = ref([]);
const cocwThisMonth = ref([]);
const coglThisMonth = ref([]);
const cojwThisMonth = ref([]);
const cobpiThisMonth = ref([]);
const cgdpiThisMonth = ref([]);
const cocwThisYear = ref([]);
const coglThisYear = ref([]);
const cojwThisYear = ref([]);
const cobpiThisYear = ref([]);
const cgdpiThisYear = ref([]);

const cocwTodayBasketball = ref([]);
const cocwTodayBadminton = ref([]);

const fetchData = async () => {
  loading.value = true;
  // setTimeout(async () => {
  const { data } = await bookingdashboard();
  // console.log(data);
  item.value = data;

  const statuses = ["pending", "confirm", "ongoing", "done", "cancel"];

  for (const period of ["Today", "ThisWeek", "ThisMonth", "ThisYear"]) {
    status[period].value = statuses.map(
      (status) => item.value[`${status}${period}`]
    );
  }

  bookingStatus.value.series = status.Today.value;

  const cocw = ref([]);
  const cobpi = ref([]);
  const cogl = ref([]);
  const cojw = ref([]);
  const cgbpi = ref([]);

  //FACILITY_BY_COCW_DAY
  cocw_sport_pending_day.value = item.value.day.b1[0].pending;
  cocw_sport_confirm_day.value = item.value.day.b1[1].confirm;
  cocw_sport_ongoing_day.value = item.value.day.b1[2].ongoing;
  cocw_sport_done_day.value = item.value.day.b1[3].done;
  cocw_sport_cancel_day.value = item.value.day.b1[4].cancel;

  //FACILITY_BY_COCW_WEEK
  cocw_sport_pending_week.value = item.value.week.b1[0].pending;
  cocw_sport_confirm_week.value = item.value.week.b1[1].confirm;
  cocw_sport_ongoing_week.value = item.value.week.b1[2].ongoing;
  cocw_sport_done_week.value = item.value.week.b1[3].done;
  cocw_sport_cancel_week.value = item.value.week.b1[4].cancel;

  //FACILITY_BY_COCW_MONTH
  cocw_sport_pending_month.value = item.value.month.b1[0].pending;
  cocw_sport_confirm_month.value = item.value.month.b1[1].confirm;
  cocw_sport_ongoing_month.value = item.value.month.b1[2].ongoing;
  cocw_sport_done_month.value = item.value.month.b1[3].done;
  cocw_sport_cancel_month.value = item.value.month.b1[4].cancel;

  //FACILITY_BY_COCW_YEAR
  cocw_sport_pending_year.value = item.value.year.b1[0].pending;
  cocw_sport_confirm_year.value = item.value.year.b1[1].confirm;
  cocw_sport_ongoing_year.value = item.value.year.b1[2].ongoing;
  cocw_sport_done_year.value = item.value.year.b1[3].done;
  cocw_sport_cancel_year.value = item.value.year.b1[4].cancel;

  //FACILITY_BY_COGL_DAY
  cogl_sport_pending_day.value = item.value.day.b2[0].pending;
  cogl_sport_confirm_day.value = item.value.day.b2[1].confirm;
  cogl_sport_ongoing_day.value = item.value.day.b2[2].ongoing;
  cogl_sport_done_day.value = item.value.day.b2[3].done;
  cogl_sport_cancel_day.value = item.value.day.b2[4].cancel;

  //FACILITY_BY_COGL_WEEK
  cogl_sport_pending_week.value = item.value.week.b2[0].pending;
  cogl_sport_confirm_week.value = item.value.week.b2[1].confirm;
  cogl_sport_ongoing_week.value = item.value.week.b2[2].ongoing;
  cogl_sport_done_week.value = item.value.week.b2[3].done;
  cogl_sport_cancel_week.value = item.value.week.b2[4].cancel;

  //FACILITY_BY_COGL_MONTH
  cogl_sport_pending_month.value = item.value.month.b2[0].pending;
  cogl_sport_confirm_month.value = item.value.month.b2[1].confirm;
  cogl_sport_ongoing_month.value = item.value.month.b2[2].ongoing;
  cogl_sport_done_month.value = item.value.month.b2[3].done;
  cogl_sport_cancel_month.value = item.value.month.b2[4].cancel;

  //FACILITY_BY_COGL_YEAR
  cogl_sport_pending_year.value = item.value.year.b2[0].pending;
  cogl_sport_confirm_year.value = item.value.year.b2[1].confirm;
  cogl_sport_ongoing_year.value = item.value.year.b2[2].ongoing;
  cogl_sport_done_year.value = item.value.year.b2[3].done;
  cogl_sport_cancel_year.value = item.value.year.b2[4].cancel;

  //FACILITY_BY_COJW_DAY
  cojw_sport_pending_day.value = item.value.day.b4[0].pending;
  cojw_sport_confirm_day.value = item.value.day.b4[1].confirm;
  cojw_sport_ongoing_day.value = item.value.day.b4[2].ongoing;
  cojw_sport_done_day.value = item.value.day.b4[3].done;
  cojw_sport_cancel_day.value = item.value.day.b4[4].cancel;

  //FACILITY_BY_COJW_WEEK
  cojw_sport_pending_week.value = item.value.week.b4[0].pending;
  cojw_sport_confirm_week.value = item.value.week.b4[1].confirm;
  cojw_sport_ongoing_week.value = item.value.week.b4[2].ongoing;
  cojw_sport_done_week.value = item.value.week.b4[3].done;
  cojw_sport_cancel_week.value = item.value.week.b4[4].cancel;

  //FACILITY_BY_COJW_MONTH
  cojw_sport_pending_month.value = item.value.month.b4[0].pending;
  cojw_sport_confirm_month.value = item.value.month.b4[1].confirm;
  cojw_sport_ongoing_month.value = item.value.month.b4[2].ongoing;
  cojw_sport_done_month.value = item.value.month.b4[3].done;
  cojw_sport_cancel_month.value = item.value.month.b4[4].cancel;

  //FACILITY_BY_COJW_YEAR
  cojw_sport_pending_year.value = item.value.year.b4[0].pending;
  cojw_sport_confirm_year.value = item.value.year.b4[1].confirm;
  cojw_sport_ongoing_year.value = item.value.year.b4[2].ongoing;
  cojw_sport_done_year.value = item.value.year.b4[3].done;
  cojw_sport_cancel_year.value = item.value.year.b4[4].cancel;

  //FACILITY_BY_COBPI_DAY
  cobpi_sport_pending_day.value = item.value.day.b5[0].pending;
  cobpi_sport_confirm_day.value = item.value.day.b5[1].confirm;
  cobpi_sport_ongoing_day.value = item.value.day.b5[2].ongoing;
  cobpi_sport_done_day.value = item.value.day.b5[3].done;
  cobpi_sport_cancel_day.value = item.value.day.b5[4].cancel;

  console.log();

  //FACILITY_BY_COBPI_WEEK
  cobpi_sport_pending_week.value = item.value.week.b5[0].pending;
  cobpi_sport_confirm_week.value = item.value.week.b5[1].confirm;
  cobpi_sport_ongoing_week.value = item.value.week.b5[2].ongoing;
  cobpi_sport_done_week.value = item.value.week.b5[3].done;
  cobpi_sport_cancel_week.value = item.value.week.b5[4].cancel;

  //FACILITY_BY_COBPI_MONTH
  cobpi_sport_pending_month.value = item.value.month.b5[0].pending;
  cobpi_sport_confirm_month.value = item.value.month.b5[1].confirm;
  cobpi_sport_ongoing_month.value = item.value.month.b5[2].ongoing;
  cobpi_sport_done_month.value = item.value.month.b5[3].done;
  cobpi_sport_cancel_month.value = item.value.month.b5[4].cancel;

  //FACILITY_BY_COBPI_YEAR
  cobpi_sport_pending_year.value = item.value.year.b5[0].pending;
  cobpi_sport_confirm_year.value = item.value.year.b5[1].confirm;
  cobpi_sport_ongoing_year.value = item.value.year.b5[2].ongoing;
  cobpi_sport_done_year.value = item.value.year.b5[3].done;
  cobpi_sport_cancel_year.value = item.value.year.b5[4].cancel;

  //FACILITY_BY_CGDPI_DAY
  cgdpi_sport_pending_day.value = item.value.day.b6[0].pending;
  cgdpi_sport_confirm_day.value = item.value.day.b6[1].confirm;
  cgdpi_sport_ongoing_day.value = item.value.day.b6[2].ongoing;
  cgdpi_sport_done_day.value = item.value.day.b6[3].done;
  cgdpi_sport_cancel_day.value = item.value.day.b6[4].cancel;

  //FACILITY_BY_CGDPI_WEEK
  cgdpi_sport_pending_week.value = item.value.week.b6[0].pending;
  cgdpi_sport_confirm_week.value = item.value.week.b6[1].confirm;
  cgdpi_sport_ongoing_week.value = item.value.week.b6[2].ongoing;
  cgdpi_sport_done_week.value = item.value.week.b6[3].done;
  cgdpi_sport_cancel_week.value = item.value.week.b6[4].cancel;

  //FACILITY_BY_CGDPI_MONTH
  cgdpi_sport_pending_month.value = item.value.month.b6[0].pending;
  cgdpi_sport_confirm_month.value = item.value.month.b6[1].confirm;
  cgdpi_sport_ongoing_month.value = item.value.month.b6[2].ongoing;
  cgdpi_sport_done_month.value = item.value.month.b6[3].done;
  cgdpi_sport_cancel_month.value = item.value.month.b6[4].cancel;

  //FACILITY_BY_CGDPI_YEAR
  cgdpi_sport_pending_year.value = item.value.year.b6[0].pending;
  cgdpi_sport_confirm_year.value = item.value.year.b6[1].confirm;
  cgdpi_sport_ongoing_year.value = item.value.year.b6[2].ongoing;
  cgdpi_sport_done_year.value = item.value.year.b6[3].done;
  cgdpi_sport_cancel_year.value = item.value.year.b6[4].cancel;

  //COCW  PER BUSINESS UNIT
  cocwToday.value.push(item.value.pendingTodayCOCW);
  cocwToday.value.push(item.value.confirmTodayCOCW);
  cocwToday.value.push(item.value.ongoingTodayCOCW);
  cocwToday.value.push(item.value.doneTodayCOCW);
  cocwToday.value.push(item.value.cancelTodayCOCW);

  cocwThisWeek.value.push(item.value.pendingThisWeekCOCW);
  cocwThisWeek.value.push(item.value.confirmThisWeekCOCW);
  cocwThisWeek.value.push(item.value.ongoingThisWeekCOCW);
  cocwThisWeek.value.push(item.value.doneThisWeekCOCW);
  cocwThisWeek.value.push(item.value.cancelThisWeekCOCW);

  cocwThisMonth.value.push(item.value.pendingThisMonthCOCW);
  cocwThisMonth.value.push(item.value.confirmThisMonthCOCW);
  cocwThisMonth.value.push(item.value.ongoingThisMonthCOCW);
  cocwThisMonth.value.push(item.value.doneThisMonthCOCW);
  cocwThisMonth.value.push(item.value.cancelThisMonthCOCW);

  cocwThisYear.value.push(item.value.pendingThisYearCOCW);
  cocwThisYear.value.push(item.value.confirmThisYearCOCW);
  cocwThisYear.value.push(item.value.ongoingThisYearCOCW);
  cocwThisYear.value.push(item.value.doneThisYearCOCW);
  cocwThisYear.value.push(item.value.cancelThisYearCOCW);
  //COGL  PER BUSINESS UNIT
  coglToday.value.push(item.value.pendingTodayCOGL);
  coglToday.value.push(item.value.confirmTodayCOGL);
  coglToday.value.push(item.value.ongoingTodayCOGL);
  coglToday.value.push(item.value.doneTodayCOGL);
  coglToday.value.push(item.value.cancelTodayCOGL);

  coglThisWeek.value.push(item.value.pendingThisWeekCOGL);
  coglThisWeek.value.push(item.value.confirmThisWeekCOGL);
  coglThisWeek.value.push(item.value.ongoingThisWeekCOGL);
  coglThisWeek.value.push(item.value.doneThisWeekCOGL);
  coglThisWeek.value.push(item.value.cancelThisWeeKCOGL);

  coglThisMonth.value.push(item.value.pendingThisMonthCOGL);
  coglThisMonth.value.push(item.value.confirmThisMonthCOGL);
  coglThisMonth.value.push(item.value.ongoingThisMonthCOGL);
  coglThisMonth.value.push(item.value.doneThisMonthCOGL);
  coglThisMonth.value.push(item.value.cancelThisMonthCOGL);

  coglThisYear.value.push(item.value.pendingThisYearCOGL);
  coglThisYear.value.push(item.value.confirmThisYearCOGL);
  coglThisYear.value.push(item.value.ongoingThisYearCOGL);
  coglThisYear.value.push(item.value.doneThisYearCOGL);
  coglThisYear.value.push(item.value.cancelThisYearCOGL);

  //COJW  PER BUSINESS UNIT
  cojwToday.value.push(item.value.pendingTodayCOJW);
  cojwToday.value.push(item.value.confirmTodayCOJW);
  cojwToday.value.push(item.value.ongoingTodayCOJW);
  cojwToday.value.push(item.value.doneTodayCOJW);
  cojwToday.value.push(item.value.cancelTodayCOJW);

  cojwThisWeek.value.push(item.value.pendingThisWeekCOJW);
  cojwThisWeek.value.push(item.value.confirmThisWeekCOJW);
  cojwThisWeek.value.push(item.value.ongoingThisWeekCOJW);
  cojwThisWeek.value.push(item.value.doneThisWeekCOJW);
  cojwThisWeek.value.push(item.value.cancelThisWeekCOJW);

  cojwThisMonth.value.push(item.value.pendingThisMonthCOJW);
  cojwThisMonth.value.push(item.value.confirmThisMonthCOJW);
  cojwThisMonth.value.push(item.value.ongoingThisMonthCOJW);
  cojwThisMonth.value.push(item.value.doneThisMonthCOJW);
  cojwThisMonth.value.push(item.value.cancelThisMonthCOJW);

  cojwThisYear.value.push(item.value.pendingThisYearCOJW);
  cojwThisYear.value.push(item.value.confirmThisYearCOJW);
  cojwThisYear.value.push(item.value.ongoingThisYearCOJW);
  cojwThisYear.value.push(item.value.doneThisYearCOJW);
  cojwThisYear.value.push(item.value.cancelThisYearCOJW);

  //COBPI  PER BUSINESS UNIT
  cobpiToday.value.push(item.value.pendingTodayCOBPI);
  cobpiToday.value.push(item.value.confirmTodayCOBPI);
  cobpiToday.value.push(item.value.ongoingTodayCOBPI);
  cobpiToday.value.push(item.value.doneTodayCOBPI);
  cobpiToday.value.push(item.value.cancelTodayCOBPI);

  // console.log(cobpiToday.value);

  cobpiThisWeek.value.push(item.value.pendingThisWeekCOBPI);
  cobpiThisWeek.value.push(item.value.confirmThisWeekCOBPI);
  cobpiThisWeek.value.push(item.value.ongoingThisWeekCOBPI);
  cobpiThisWeek.value.push(item.value.doneThisWeekCOBPI);
  cobpiThisWeek.value.push(item.value.cancelThisWeekCOBPI);

  cobpiThisMonth.value.push(item.value.pendingThisMonthCOBPI);
  cobpiThisMonth.value.push(item.value.confirmTThisMonthCOBPI);
  cobpiThisMonth.value.push(item.value.ongoingThisMonthCOBPI);
  cobpiThisMonth.value.push(item.value.doneThisMonthCOBPI);
  cobpiThisMonth.value.push(item.value.cancelThisMonthCOBPI);

  cobpiThisYear.value.push(item.value.pendingThisYearCOBPI);
  cobpiThisYear.value.push(item.value.confirmThisYearCOBPI);
  cobpiThisYear.value.push(item.value.ongoingThisYearCOBPI);
  cobpiThisYear.value.push(item.value.doneThisYearCOBPI);
  cobpiThisYear.value.push(item.value.cancelThisYearCOBPI);

  //CGDPI  PER BUSINESS UNIT
  cgdpiToday.value.push(item.value.pendingTodayCGDPI);
  cgdpiToday.value.push(item.value.confirmTodayCGDPI);
  cgdpiToday.value.push(item.value.ongoingTodayCGDPI);
  cgdpiToday.value.push(item.value.doneTodayCGDPI);
  cgdpiToday.value.push(item.value.cancelTodayCGDPI);

  cgdpiThisWeek.value.push(item.value.pendingThisWeekCGDPI);
  cgdpiThisWeek.value.push(item.value.confirmThisWeekCGDPI);
  cgdpiThisWeek.value.push(item.value.ongoingThisWeekCGDPI);
  cgdpiThisWeek.value.push(item.value.doneThisWeekCGDPI);
  cgdpiThisWeek.value.push(item.value.cancelThisWeekCGDPI);

  cgdpiThisMonth.value.push(item.value.pendingThisMonthCGDPI);
  cgdpiThisMonth.value.push(item.value.confirmThisMonthCGDPI);
  cgdpiThisMonth.value.push(item.value.ongoingThisMonthCGDPI);
  cgdpiThisMonth.value.push(item.value.doneThisMonthCGDPI);
  cgdpiThisMonth.value.push(item.value.cancelThisMonthCGDPI);

  cgdpiThisYear.value.push(item.value.pendingThisYearCGDPI);
  cgdpiThisYear.value.push(item.value.confirmThisYearCGDPI);
  cgdpiThisYear.value.push(item.value.ongoingThisYearCGDPI);
  cgdpiThisYear.value.push(item.value.doneThisYearCGDPI);
  cgdpiThisYear.value.push(item.value.cancelThisYearCGDPI);

  //COCW PER FACILITY
  cocwTodayBasketball.value.push(item.value.pendingBasketballTodayCOCW);
  cocwTodayBasketball.value.push(item.value.confirmBasketballTodayCOCW);
  cocwTodayBasketball.value.push(item.value.ongoingBasketballTodayCOCW);
  cocwTodayBasketball.value.push(item.value.doneBasketballTodayCOCW);
  cocwTodayBasketball.value.push(item.value.cancelBasketballTodayCOCW);

  cocwTodayBadminton.value.push(item.value.pendingBasketballTodayCOCW);
  cocwTodayBadminton.value.push(item.value.confirmBadmintonTodayCOCW);
  cocwTodayBadminton.value.push(item.value.ongoingBadmintonTodayCOCW);
  cocwTodayBadminton.value.push(item.value.doneBadmintonTodayCOCW);
  cocwTodayBadminton.value.push(item.value.cancelBadmintonTodayCOCW);

  loading.value = false;
  // }, 1000);
  updatedata();
  updateFacility();
};

const bookingStatus = ref({
  series: [],
  chartOptions: {
    chart: {
      width: 380,
      type: "donut",
      dropShadow: {
        enabled: true,
        color: "#111",
        top: -1,
        left: 3,
        blur: 3,
        opacity: 0.2,
        align: "center",
      },
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
            },
          },
        },
      },
    },
    labels: ["Pending", "Confirm", "Ongoing", "Done", "Cancel"],
    dataLabels: {
      dropShadow: {
        blur: 3,
        opacity: 0.8,
      },
    },
    fill: {
      type: "color",
      opacity: 2,
    },
    theme: {
      palette: "palette2",
    },
    title: {
      text: "Booking Status",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  },
});

const bookingPerBusinessUnit = ref({
  chartOptions: {
    xaxis: {
      categories: ["Pending", "Confirm", "Ongoing", "Done", "Cancel"],
    },
    title: {
      text: "Booking Summary Per Business Unit",
      align: "center",
      margin: 10,
      offsetY: 10,
      style: {
        fontSize: "15px",
        color: "#333",
      },
    },
  },

  series: [
    {
      name: "COCW",
      data: [],
    },
    {
      name: "COGL",
      data: [],
    },
    {
      name: "COJW",
      data: [],
    },
    {
      name: "COBPI",
      data: [],
    },

    {
      name: "CGDPI",
      data: [],
    },
  ],
  colors: [
    "#FF5733",
    "#FFBD33",
    "#33FF57",
    "#33BFFF",
    "#FF33D1",
    "#FF338D",
    "#338DFF",
  ],
});

const bookingPerFacility = ref({
  chartOptions: {
    xaxis: {
      categories: [
        "BASKETBALL",
        "BADMINTON",
        "TABLE TENNIS",
        "TENNIS",
        "BILLIARDS",
        "VOLLEYBALL",
        "FUTSAL",
        "GYM",
        "CONSOLE",
        "TRAINING ROOM",
      ],
    },
    title: {
      text: "Booking Summary per Facility",
      align: "center",
      margin: 10,
      offsetY: 10,
      style: {
        fontSize: "18px",
        color: "#333",
      },
    },
  },
  series: [
    {
      name: "COCW",
      data: [],
    },

    {
      name: "COGL",
      data: [],
    },
    {
      name: "COJW",
      data: [],
    },
    {
      name: "COBPI",
      data: [],
    },
    {
      name: "CGDPI",
      data: [],
    },
  ],
  colors: [
    "#FF5733",
    "#FFBD33",
    "#33FF57",
    "#33BFFF",
    "#FF33D1",
    "#FF338D",
    "#338DFF",
  ],
});

const dayData = computed(() => {
  const propertyMap = {
    Day: "Today",
    Week: "ThisWeek",
    Month: "ThisMonth",
    Year: "ThisYear",
  };

  const dayKey = selectedDay.value;
  if (propertyMap.hasOwnProperty(dayKey)) {
    const properties = ["Pending", "Confirm", "Ongoing", "Done", "Cancel"];

    return properties.reduce((data, property) => {
      data[property] = item.value[`${property}${propertyMap[dayKey]}`];
      return data;
    }, {});
  }

  return null;
});

const getSelectedChartData = computed(() => {
  const timePeriod = selectedDay.value;
  switch (timePeriod) {
    case "Day":
      return status.Today.value;
    case "Week":
      return status.ThisWeek.value;
    case "Month":
      return status.ThisMonth.value;
    case "Year":
      return status.ThisYear.value;
    default:
      return [];
  }
});

const updateFacility = () => {
  if (selectedStatus.value == "Pending" && selectedDay.value == "Day") {
    bookingPerFacility.value.series[0].data = cocw_sport_pending_day.value;
    bookingPerFacility.value.series[1].data = cogl_sport_pending_day.value;
    bookingPerFacility.value.series[2].data = cojw_sport_pending_day.value;
    bookingPerFacility.value.series[3].data = cobpi_sport_pending_day.value;
    bookingPerFacility.value.series[4].data = cgdpi_sport_pending_day.value;
  } else if (selectedStatus.value == "Pending" && selectedDay.value == "Week") {
    bookingPerFacility.value.series[0].data = cocw_sport_pending_week.value;
    bookingPerFacility.value.series[1].data = cogl_sport_pending_week.value;
    bookingPerFacility.value.series[2].data = cojw_sport_pending_week.value;
    bookingPerFacility.value.series[3].data = cobpi_sport_pending_week.value;
    bookingPerFacility.value.series[4].data = cgdpi_sport_pending_week.value;
  } else if (
    selectedStatus.value == "Pending" &&
    selectedDay.value == "Month"
  ) {
    bookingPerFacility.value.series[0].data = cocw_sport_pending_month.value;
    bookingPerFacility.value.series[1].data = cogl_sport_pending_month.value;
    bookingPerFacility.value.series[2].data = cojw_sport_pending_month.value;
    bookingPerFacility.value.series[3].data = cobpi_sport_pending_month.value;
    bookingPerFacility.value.series[4].data = cgdpi_sport_pending_month.value;
  } else if (selectedStatus.value == "Pending" && selectedDay.value == "Year") {
    bookingPerFacility.value.series[0].data = cocw_sport_pending_year.value;
    bookingPerFacility.value.series[1].data = cogl_sport_pending_year.value;
    bookingPerFacility.value.series[2].data = cojw_sport_pending_year.value;
    bookingPerFacility.value.series[3].data = cobpi_sport_pending_year.value;
    bookingPerFacility.value.series[4].data = cgdpi_sport_pending_year.value;
  } else if (selectedStatus.value == "Confirm" && selectedDay.value == "Day") {
    bookingPerFacility.value.series[0].data = cocw_sport_confirm_day.value;
    bookingPerFacility.value.series[1].data = cogl_sport_confirm_day.value;
    bookingPerFacility.value.series[2].data = cojw_sport_confirm_day.value;
    bookingPerFacility.value.series[3].data = cobpi_sport_confirm_day.value;
    bookingPerFacility.value.series[4].data = cgdpi_sport_confirm_day.value;
  } else if (selectedStatus.value == "Confirm" && selectedDay.value == "Week") {
    bookingPerFacility.value.series[0].data = cocw_sport_confirm_week.value;
    bookingPerFacility.value.series[1].data = cogl_sport_confirm_week.value;
    bookingPerFacility.value.series[2].data = cojw_sport_confirm_week.value;
    bookingPerFacility.value.series[3].data = cobpi_sport_confirm_week.value;
    bookingPerFacility.value.series[4].data = cgdpi_sport_confirm_week.value;
  } else if (
    selectedStatus.value == "Confirm" &&
    selectedDay.value == "Month"
  ) {
    bookingPerFacility.value.series[0].data = cocw_sport_confirm_month.value;
    bookingPerFacility.value.series[1].data = cogl_sport_confirm_month.value;
    bookingPerFacility.value.series[2].data = cojw_sport_confirm_month.value;
    bookingPerFacility.value.series[3].data = cobpi_sport_confirm_month.value;
    bookingPerFacility.value.series[4].data = cgdpi_sport_confirm_month.value;
  } else if (selectedStatus.value == "Confirm" && selectedDay.value == "Year") {
    bookingPerFacility.value.series[0].data = cocw_sport_confirm_year.value;
    bookingPerFacility.value.series[1].data = cogl_sport_confirm_year.value;
    bookingPerFacility.value.series[2].data = cojw_sport_confirm_year.value;
    bookingPerFacility.value.series[3].data = cobpi_sport_confirm_year.value;
    bookingPerFacility.value.series[4].data = cgdpi_sport_confirm_year.value;
  } else if (selectedStatus.value == "Ongoing" && selectedDay.value == "Day") {
    bookingPerFacility.value.series[0].data = cocw_sport_ongoing_day.value;
    bookingPerFacility.value.series[1].data = cogl_sport_ongoing_day.value;
    bookingPerFacility.value.series[2].data = cojw_sport_ongoing_day.value;
    bookingPerFacility.value.series[3].data = cobpi_sport_ongoing_day.value;
    bookingPerFacility.value.series[4].data = cgdpi_sport_ongoing_day.value;
  } else if (selectedStatus.value == "Ongoing" && selectedDay.value == "Week") {
    bookingPerFacility.value.series[0].data = cocw_sport_ongoing_week.value;
    bookingPerFacility.value.series[1].data = cogl_sport_ongoing_week.value;
    bookingPerFacility.value.series[2].data = cojw_sport_ongoing_week.value;
    bookingPerFacility.value.series[3].data = cobpi_sport_ongoing_week.value;
    bookingPerFacility.value.series[4].data = cgdpi_sport_ongoing_week.value;
  } else if (
    selectedStatus.value == "Ongoing" &&
    selectedDay.value == "Month"
  ) {
    bookingPerFacility.value.series[0].data = cocw_sport_ongoing_month.value;
    bookingPerFacility.value.series[1].data = cogl_sport_ongoing_month.value;
    bookingPerFacility.value.series[2].data = cojw_sport_ongoing_month.value;
    bookingPerFacility.value.series[3].data = cobpi_sport_ongoing_month.value;
    bookingPerFacility.value.series[4].data = cgdpi_sport_ongoing_month.value;
  } else if (selectedStatus.value == "Ongoing" && selectedDay.value == "Year") {
    bookingPerFacility.value.series[0].data = cocw_sport_ongoing_year.value;
    bookingPerFacility.value.series[1].data = cogl_sport_ongoing_year.value;
    bookingPerFacility.value.series[2].data = cojw_sport_ongoing_year.value;
    bookingPerFacility.value.series[3].data = cobpi_sport_ongoing_year.value;
    bookingPerFacility.value.series[4].data = cgdpi_sport_ongoing_year.value;
  } else if (selectedStatus.value == "Done" && selectedDay.value == "Day") {
    bookingPerFacility.value.series[0].data = cocw_sport_done_day.value;
    bookingPerFacility.value.series[1].data = cogl_sport_done_day.value;
    bookingPerFacility.value.series[2].data = cojw_sport_done_day.value;
    bookingPerFacility.value.series[3].data = cobpi_sport_done_day.value;
    bookingPerFacility.value.series[4].data = cgdpi_sport_done_day.value;
  } else if (selectedStatus.value == "Done" && selectedDay.value == "Week") {
    bookingPerFacility.value.series[0].data = cocw_sport_done_week.value;
    bookingPerFacility.value.series[1].data = cogl_sport_done_week.value;
    bookingPerFacility.value.series[2].data = cojw_sport_done_week.value;
    bookingPerFacility.value.series[3].data = cobpi_sport_done_week.value;
    bookingPerFacility.value.series[4].data = cgdpi_sport_done_week.value;
  } else if (selectedStatus.value == "Done" && selectedDay.value == "Month") {
    bookingPerFacility.value.series[0].data = cocw_sport_done_month.value;
    bookingPerFacility.value.series[1].data = cogl_sport_done_month.value;
    bookingPerFacility.value.series[2].data = cojw_sport_done_month.value;
    bookingPerFacility.value.series[3].data = cobpi_sport_done_month.value;
    bookingPerFacility.value.series[4].data = cgdpi_sport_done_month.value;
  } else if (selectedStatus.value == "Done" && selectedDay.value == "Year") {
    bookingPerFacility.value.series[0].data = cocw_sport_done_year.value;
    bookingPerFacility.value.series[1].data = cogl_sport_done_year.value;
    bookingPerFacility.value.series[2].data = cojw_sport_done_year.value;
    bookingPerFacility.value.series[3].data = cobpi_sport_done_year.value;
    bookingPerFacility.value.series[4].data = cgdpi_sport_done_year.value;
  } else if (selectedStatus.value == "Cancel" && selectedDay.value == "Day") {
    bookingPerFacility.value.series[0].data = cocw_sport_cancel_day.value;
    bookingPerFacility.value.series[1].data = cogl_sport_cancel_day.value;
    bookingPerFacility.value.series[2].data = cojw_sport_cancel_day.value;
    bookingPerFacility.value.series[3].data = cobpi_sport_cancel_day.value;
    bookingPerFacility.value.series[4].data = cgdpi_sport_cancel_day.value;
  } else if (selectedStatus.value == "Cancel" && selectedDay.value == "Week") {
    bookingPerFacility.value.series[0].data = cocw_sport_cancel_week.value;
    bookingPerFacility.value.series[1].data = cogl_sport_cancel_week.value;
    bookingPerFacility.value.series[2].data = cojw_sport_cancel_week.value;
    bookingPerFacility.value.series[3].data = cobpi_sport_cancel_week.value;
    bookingPerFacility.value.series[4].data = cgdpi_sport_cancel_week.value;
  } else if (selectedStatus.value == "Cancel" && selectedDay.value == "Month") {
    bookingPerFacility.value.series[0].data = cocw_sport_cancel_month.value;
    bookingPerFacility.value.series[1].data = cogl_sport_cancel_month.value;
    bookingPerFacility.value.series[2].data = cojw_sport_cancel_month.value;
    bookingPerFacility.value.series[3].data = cobpi_sport_cancel_month.value;
    bookingPerFacility.value.series[4].data = cgdpi_sport_cancel_month.value;
  } else {
    bookingPerFacility.value.series[0].data = cocw_sport_cancel_year.value;
    bookingPerFacility.value.series[1].data = cogl_sport_cancel_year.value;
    bookingPerFacility.value.series[2].data = cojw_sport_cancel_year.value;
    bookingPerFacility.value.series[3].data = cobpi_sport_cancel_year.value;
    bookingPerFacility.value.series[4].data = cgdpi_sport_cancel_year.value;
  }
};

const updatedata = () => {
  if (selectedDay.value == "Day") {
    bookingPerBusinessUnit.value.series[0].data = cocwToday.value;
    bookingPerBusinessUnit.value.series[1].data = coglToday.value;
    bookingPerBusinessUnit.value.series[2].data = cojwToday.value;
    bookingPerBusinessUnit.value.series[3].data = cobpiToday.value;
    bookingPerBusinessUnit.value.series[4].data = cgdpiToday.value;
  } else if (selectedDay.value == "Week") {
    bookingPerBusinessUnit.value.series[0].data = cocwThisWeek.value;
    bookingPerBusinessUnit.value.series[1].data = coglThisWeek.value;
    bookingPerBusinessUnit.value.series[2].data = cojwThisWeek.value;
    bookingPerBusinessUnit.value.series[3].data = cobpiThisWeek.value;
    bookingPerBusinessUnit.value.series[4].data = cgdpiThisWeek.value;
  } else if (selectedDay.value == "Month") {
    bookingPerBusinessUnit.value.series[0].data = cocwThisMonth.value;
    bookingPerBusinessUnit.value.series[1].data = coglThisMonth.value;
    bookingPerBusinessUnit.value.series[2].data = cojwThisMonth.value;
    bookingPerBusinessUnit.value.series[3].data = cobpiThisMonth.value;
    bookingPerBusinessUnit.value.series[4].data = cgdpiThisMonth.value;
  } else {
    bookingPerBusinessUnit.value.series[0].data = cocwThisYear.value;
    bookingPerBusinessUnit.value.series[1].data = coglThisYear.value;
    bookingPerBusinessUnit.value.series[2].data = cojwThisYear.value;
    bookingPerBusinessUnit.value.series[3].data = cobpiThisYear.value;
    bookingPerBusinessUnit.value.series[4].data = cgdpiThisYear.value;
  }
};
</script>

<template>
  <v-row>
    <v-col
      cols="12"
      md="2"
      v-for="status in ['PENDING', 'CONFIRM', 'ONGOING', 'DONE', 'CANCEL']"
      :key="status"
    >
      <v-card
        class="mx-auto"
        variant="outlined"
        :loading="loading"
        :disabled="loading"
      >
        <v-card-item :title="status">
          <template v-slot:subtitle>
            <v-icon
              icon="mdi-account-group"
              size="18"
              class="me-1 pb-1"
            ></v-icon>
            Bookings
          </template>
        </v-card-item>
        <v-card-text class="py-0">
          <v-row align="center" no-gutters>
            <v-col class="text-h5" cols="6" v-if="item">{{
              item[
                status.toLowerCase() +
                  (selectedDay === "Day"
                    ? "Today"
                    : selectedDay === "Week"
                    ? "ThisWeek"
                    : selectedDay === "Month"
                    ? "ThisMonth"
                    : "ThisYear")
              ]
            }}</v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="2" sm="12">
      <v-select
        clearable
        label="Select"
        :items="['Day', 'Week', 'Month', 'Year']"
        variant="underlined"
        v-model="selectedDay"
        @update:modelValue="updatedata()"
      ></v-select>
      <v-select
        clearable
        label="Select"
        :items="['Pending', 'Confirm', 'Ongoing', 'Done', 'Cancel']"
        variant="underlined"
        v-model="selectedStatus"
        @update:modelValue="updateFacility()"
      ></v-select>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="4">
      <v-card variant="outlined" height="300px" align="center">
        <apexchart
          width="300px"
          height="300px"
          :options="bookingStatus.chartOptions"
          :series="getSelectedChartData"
        >
        </apexchart>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <v-card variant="outlined" height="300px">
        <apexchart
          ref="barchart"
          width="100%"
          height="100%"
          type="bar"
          :options="bookingPerBusinessUnit.chartOptions"
          :series="bookingPerBusinessUnit.series"
        ></apexchart>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <v-card variant="outlined" height="300px" align="center">
        <apexchart
          width="100%"
          height="100%"
          type="bar"
          :options="bookingPerFacility.chartOptions"
          :series="bookingPerFacility.series"
        ></apexchart>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.bar-first {
  margin-right: 100%;
  padding-right: 0%;
}
</style>
