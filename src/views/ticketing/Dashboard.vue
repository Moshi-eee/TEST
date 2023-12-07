<script setup>
import { onMounted, ref, watch } from "vue";
import Resource from "@/api/resource.js";
import { useDisplay } from "vuetify";

const apireport = new Resource("ticketing/reports");

onMounted(async () => {
  fetchReport();
  getYearAndMonthCat();
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;
  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);

  for (let i = 0; i < daysInCurrentMonth; i++) {
    dailyTicket.value.push(i + 1);
  }
});

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}
const dashboardFilter = ref("Year");
const loading = ref(false);
const ticketsItem = ref([]);
const keywords = ref(null);
const totalReportItems = ref(0);

const yearCat = ref([]);
const dailyTicket = ref([]);
const todayTicket = ref(0);
const weekTicket = ref(0);
const monthTicket = ref(0);
const ticketsStatus = ref({
  ticketStatusDay: [],
  ticketStatusWeek: [],
  ticketStatusMonth: [],
  ticketStatusYear: [],
});
const ticketsPriority = ref({
  ticketPriorityDay: [],
  ticketPriorityWeek: [],
  ticketPriorityMonth: [],
  ticketPriorityYear: [],
});

const ticketsCalendar = ref({
  ticketDay: [],
  ticketWeek: [],
  ticketMonth: [],
  ticketYear: [],
});
const statusReport = ref({
  day: [],
  week: [],
  month: [],
  year: [],
});
const displayReport = ref([]);

const dialog = ref(false);
const headers = [
  {
    title: "Ticket No.",
    sortable: false,
    key: "ticket_no",
    align: "center",
  },

  {
    title: "Title",
    sortable: false,
    key: "title",
    align: "center",
  },
  {
    title: "Customer",
    sortable: false,
    key: "user_details",
    align: "center",
  },
  {
    title: "Priority",
    sortable: false,
    key: "priority",
    align: "center",
  },
];

const fetchReport = async () => {
  loading.value = true;

  const { data } = await apireport.list({
    keyword: keywords.value,
    key: "",
    order: "",
    limit: 1000000,
    page: 1,
  });
  ticketsItem.value = data.data;

  totalReportItems.value = data.total;
  const dateNow = new Date();
  const dayOfWeekDigit = dateNow.getDay();

  //#region GET STATUS AND PRIORITY -------------------------------->
  if (ticketsStatus.value.ticketStatusDay[0] == null) {
    for (let i = 0; i < 5; i++) {
      {
        ticketsStatus.value.ticketStatusDay.push(0);
        ticketsStatus.value.ticketStatusWeek.push(0);
        ticketsStatus.value.ticketStatusMonth.push(0);
        ticketsStatus.value.ticketStatusYear.push(0);
      }
    }
    for (let i = 0; i < 4; i++) {
      {
        ticketsPriority.value.ticketPriorityDay.push(0);
        ticketsPriority.value.ticketPriorityWeek.push(0);
        ticketsPriority.value.ticketPriorityMonth.push(0);
        ticketsPriority.value.ticketPriorityYear.push(0);
      }
    }
  }
  ticketsItem.value.filter(checkStatus);
  function checkStatus(ticket) {
    const ticketdate = new Date(ticket.created_date);
    if (
      dateNow.getDate() == ticketdate.getDate() &&
      dateNow.getFullYear() == ticketdate.getFullYear() &&
      dateNow.getMonth() == ticketdate.getMonth()
    ) {
      todayTicket.value =
        dateNow.getDate() == ticketdate.getDate()
          ? todayTicket.value + 1
          : todayTicket.value;
      statusReport.value.day.push(ticket);
    }
    if (dateNow.getFullYear() == ticketdate.getFullYear()) {
      switch (ticket.status) {
        case "Open":
          ticketsStatus.value.ticketStatusDay[0] =
            dateNow.getDate() == ticketdate.getDate() &&
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() == ticketdate.getMonth()
              ? ticketsStatus.value.ticketStatusDay[0] + 1
              : ticketsStatus.value.ticketStatusDay[0];

          ticketsStatus.value.ticketStatusWeek[0] =
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() + 1 == ticketdate.getMonth() + 1
              ? dateNow.getDate() - 7 < ticketdate.getDate()
                ? ticketsStatus.value.ticketStatusWeek[0] + 1
                : ticketsStatus.value.ticketStatusWeek[0]
              : ticketsStatus.value.ticketStatusWeek[0];

          ticketsStatus.value.ticketStatusMonth[0] =
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() + 1 == ticketdate.getMonth() + 1
              ? ticketsStatus.value.ticketStatusMonth[0] + 1
              : ticketsStatus.value.ticketStatusMonth[0];

          ticketsStatus.value.ticketStatusYear[0] =
            dateNow.getFullYear() == ticketdate.getFullYear()
              ? ticketsStatus.value.ticketStatusYear[0] + 1
              : ticketsStatus.value.ticketStatusYear[0];
          break;
        case "Pending":
          ticketsStatus.value.ticketStatusDay[1] =
            dateNow.getDate() == ticketdate.getDate() &&
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() == ticketdate.getMonth()
              ? ticketsStatus.value.ticketStatusDay[1] + 1
              : ticketsStatus.value.ticketStatusDay[1];

          ticketsStatus.value.ticketStatusWeek[1] =
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() + 1 == ticketdate.getMonth() + 1
              ? dateNow.getDate() - 7 < ticketdate.getDate()
                ? ticketsStatus.value.ticketStatusWeek[1] + 1
                : ticketsStatus.value.ticketStatusWeek[1]
              : ticketsStatus.value.ticketStatusWeek[1];

          ticketsStatus.value.ticketStatusMonth[1] =
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() + 1 == ticketdate.getMonth() + 1
              ? ticketsStatus.value.ticketStatusMonth[1] + 1
              : ticketsStatus.value.ticketStatusMonth[1];

          ticketsStatus.value.ticketStatusYear[1] =
            dateNow.getFullYear() == ticketdate.getFullYear()
              ? ticketsStatus.value.ticketStatusYear[1] + 1
              : ticketsStatus.value.ticketStatusYear[1];
          break;
        case "Resolved":
          ticketsStatus.value.ticketStatusDay[2] =
            dateNow.getDate() == ticketdate.getDate() &&
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() == ticketdate.getMonth()
              ? ticketsStatus.value.ticketStatusDay[2] + 1
              : ticketsStatus.value.ticketStatusDay[2];

          ticketsStatus.value.ticketStatusWeek[1] =
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() + 1 == ticketdate.getMonth() + 1
              ? dateNow.getDate() - 7 < ticketdate.getDate()
                ? ticketsStatus.value.ticketStatusWeek[2] + 1
                : ticketsStatus.value.ticketStatusWeek[2]
              : ticketsStatus.value.ticketStatusWeek[2];

          ticketsStatus.value.ticketStatusMonth[2] =
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() + 1 == ticketdate.getMonth() + 1
              ? ticketsStatus.value.ticketStatusMonth[2] + 1
              : ticketsStatus.value.ticketStatusMonth[2];

          ticketsStatus.value.ticketStatusYear[2] =
            dateNow.getFullYear() == ticketdate.getFullYear()
              ? ticketsStatus.value.ticketStatusYear[2] + 1
              : ticketsStatus.value.ticketStatusYear[2];
          break;
        case "Unassigned":
          ticketsStatus.value.ticketStatusDay[3] =
            dateNow.getDate() == ticketdate.getDate() &&
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() == ticketdate.getMonth()
              ? ticketsStatus.value.ticketStatusDay[3] + 1
              : ticketsStatus.value.ticketStatusDay[3];

          ticketsStatus.value.ticketStatusWeek[3] =
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() + 1 == ticketdate.getMonth() + 1
              ? dateNow.getDate() - 7 < ticketdate.getDate()
                ? ticketsStatus.value.ticketStatusWeek[3] + 1
                : ticketsStatus.value.ticketStatusWeek[3]
              : ticketsStatus.value.ticketStatusWeek[3];

          ticketsStatus.value.ticketStatusMonth[3] =
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() + 1 == ticketdate.getMonth() + 1
              ? ticketsStatus.value.ticketStatusMonth[3] + 1
              : ticketsStatus.value.ticketStatusMonth[3];

          ticketsStatus.value.ticketStatusYear[3] =
            dateNow.getFullYear() == ticketdate.getFullYear()
              ? ticketsStatus.value.ticketStatusYear[3] + 1
              : ticketsStatus.value.ticketStatusYear[3];
          break;
        case "Closed":
          ticketsStatus.value.ticketStatusDay[4] =
            dateNow.getDate() == ticketdate.getDate() &&
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() == ticketdate.getMonth()
              ? ticketsStatus.value.ticketStatusDay[4] + 1
              : ticketsStatus.value.ticketStatusDay[4];

          ticketsStatus.value.ticketStatusWeek[4] =
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() + 1 == ticketdate.getMonth() + 1
              ? dateNow.getDate() - 7 < ticketdate.getDate()
                ? ticketsStatus.value.ticketStatusWeek[4] + 1
                : ticketsStatus.value.ticketStatusWeek[4]
              : ticketsStatus.value.ticketStatusWeek[4];

          ticketsStatus.value.ticketStatusMonth[4] =
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() + 1 == ticketdate.getMonth() + 1
              ? ticketsStatus.value.ticketStatusMonth[4] + 1
              : ticketsStatus.value.ticketStatusMonth[4];

          ticketsStatus.value.ticketStatusYear[4] =
            dateNow.getFullYear() == ticketdate.getFullYear()
              ? ticketsStatus.value.ticketStatusYear[4] + 1
              : ticketsStatus.value.ticketStatusYear[4];
      }
      switch (ticket.priority) {
        case "Low":
          ticketsPriority.value.ticketPriorityDay[0] =
            dateNow.getDate() == ticketdate.getDate() &&
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() == ticketdate.getMonth()
              ? ticketsPriority.value.ticketPriorityDay[0] + 1
              : ticketsPriority.value.ticketPriorityDay[0];

          ticketsPriority.value.ticketPriorityWeek[0] =
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() + 1 == ticketdate.getMonth() + 1
              ? dateNow.getDate() - 7 < ticketdate.getDate()
                ? ticketsPriority.value.ticketPriorityWeek[0] + 1
                : ticketsPriority.value.ticketPriorityWeek[0]
              : ticketsPriority.value.ticketPriorityWeek[0];

          ticketsPriority.value.ticketPriorityMonth[0] =
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() + 1 == ticketdate.getMonth() + 1
              ? ticketsPriority.value.ticketPriorityMonth[0] + 1
              : ticketsPriority.value.ticketPriorityMonth[0];

          ticketsPriority.value.ticketPriorityYear[0] =
            dateNow.getFullYear() == ticketdate.getFullYear()
              ? ticketsPriority.value.ticketPriorityYear[0] + 1
              : ticketsPriority.value.ticketPriorityYear[0];
          break;
        case "Medium":
          ticketsPriority.value.ticketPriorityDay[1] =
            dateNow.getDate() == ticketdate.getDate() &&
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() == ticketdate.getMonth()
              ? ticketsPriority.value.ticketPriorityDay[1] + 1
              : ticketsPriority.value.ticketPriorityDay[1];

          ticketsPriority.value.ticketPriorityWeek[1] =
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() + 1 == ticketdate.getMonth() + 1
              ? dateNow.getDate() - 7 < ticketdate.getDate()
                ? ticketsPriority.value.ticketPriorityWeek[1] + 1
                : ticketsPriority.value.ticketPriorityWeek[1]
              : ticketsPriority.value.ticketPriorityWeek[1];

          ticketsPriority.value.ticketPriorityMonth[1] =
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() + 1 == ticketdate.getMonth() + 1
              ? ticketsPriority.value.ticketPriorityMonth[1] + 1
              : ticketsPriority.value.ticketPriorityMonth[1];

          ticketsPriority.value.ticketPriorityYear[1] =
            dateNow.getFullYear() == ticketdate.getFullYear()
              ? ticketsPriority.value.ticketPriorityYear[1] + 1
              : ticketsPriority.value.ticketPriorityYear[1];
          break;
        case "High":
          ticketsPriority.value.ticketPriorityDay[2] =
            dateNow.getDate() == ticketdate.getDate() &&
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() == ticketdate.getMonth()
              ? ticketsPriority.value.ticketPriorityDay[2] + 1
              : ticketsPriority.value.ticketPriorityDay[2];

          ticketsPriority.value.ticketPriorityWeek[1] =
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() + 1 == ticketdate.getMonth() + 1
              ? dateNow.getDate() - 7 < ticketdate.getDate()
                ? ticketsPriority.value.ticketPriorityWeek[2] + 1
                : ticketsPriority.value.ticketPriorityWeek[2]
              : ticketsPriority.value.ticketPriorityWeek[2];

          ticketsPriority.value.ticketPriorityMonth[2] =
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() + 1 == ticketdate.getMonth() + 1
              ? ticketsPriority.value.ticketPriorityMonth[2] + 1
              : ticketsPriority.value.ticketPriorityMonth[2];

          ticketsPriority.value.ticketPriorityYear[2] =
            dateNow.getFullYear() == ticketdate.getFullYear()
              ? ticketsPriority.value.ticketPriorityYear[2] + 1
              : ticketsPriority.value.ticketPriorityYear[2];
          break;
        case "Urgent":
          ticketsPriority.value.ticketPriorityDay[3] =
            dateNow.getDate() == ticketdate.getDate() &&
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() == ticketdate.getMonth()
              ? ticketsPriority.value.ticketPriorityDay[3] + 1
              : ticketsPriority.value.ticketPriorityDay[3];

          ticketsPriority.value.ticketPriorityWeek[3] =
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() + 1 == ticketdate.getMonth() + 1
              ? dateNow.getDate() - 7 < ticketdate.getDate()
                ? ticketsPriority.value.ticketPriorityWeek[3] + 1
                : ticketsPriority.value.ticketPriorityWeek[3]
              : ticketsPriority.value.ticketPriorityWeek[3];

          ticketsPriority.value.ticketPriorityMonth[3] =
            dateNow.getFullYear() == ticketdate.getFullYear() &&
            dateNow.getMonth() + 1 == ticketdate.getMonth() + 1
              ? ticketsPriority.value.ticketPriorityMonth[3] + 1
              : ticketsPriority.value.ticketPriorityMonth[3];

          ticketsPriority.value.ticketPriorityYear[3] =
            dateNow.getFullYear() == ticketdate.getFullYear()
              ? ticketsPriority.value.ticketPriorityYear[3] + 1
              : ticketsPriority.value.ticketPriorityYear[3];
      }
    }
  }

  //#endregion GET STATUS AND PRIORITY -------------------------------->

  //#region yearly tickets -------------------------------->
  if (ticketsCalendar.value.ticketDay[0] == null) {
    for (let i = 0; i < dateNow.getDate(); i++) {
      ticketsCalendar.value.ticketDay.push(0);
    }
    for (let i = 0; i <= dayOfWeekDigit; i++) {
      ticketsCalendar.value.ticketWeek.push(0);
    }
    for (let i = 0; i < 12; i++) {
      ticketsCalendar.value.ticketMonth.push(0);
    }
    for (let i = 0; i < 10; i++) {
      ticketsCalendar.value.ticketYear.push(0);
    }
  }
  ticketsItem.value.filter(yearlyTicket);
  function yearlyTicket(ticket) {
    const ticketdate = new Date(ticket.created_date);
    switch (ticketdate.getFullYear()) {
      case yearCat.value[9]:
        ticketsCalendar.value.ticketYear[9] += 1;
        break;
      case yearCat.value[8]:
        ticketsCalendar.value.ticketYear[8] += 1;
        break;
      case yearCat.value[7]:
        ticketsCalendar.value.ticketYear[7] += 1;
        break;
      case yearCat.value[6]:
        ticketsCalendar.value.ticketYear[6] += 1;
        break;
      case yearCat.value[5]:
        ticketsCalendar.value.ticketYear[5] += 1;
        break;
      case yearCat.value[4]:
        ticketsCalendar.value.ticketYear[4] += 1;
        break;
      case yearCat.value[3]:
        ticketsCalendar.value.ticketYear[3] += 1;
        break;
      case yearCat.value[2]:
        ticketsCalendar.value.ticketYear[2] += 1;
        break;
      case yearCat.value[1]:
        ticketsCalendar.value.ticketYear[1] += 1;
        break;
      case yearCat.value[0]:
        ticketsCalendar.value.ticketYear[0] += 1;
        break;
    }
    statusReport.value.year.push(ticket);
  }
  //#endregion yearly tickets -------------------------------->

  //#region monthly tickets -------------------------------->
  ticketsItem.value.filter(monthlyTicket);
  function monthlyTicket(ticket) {
    const ticketdate = new Date(ticket.created_date);
    if (dateNow.getFullYear() == ticketdate.getFullYear()) {
      ticketsCalendar.value.ticketMonth[ticketdate.getMonth()] += 1;
      if (dateNow.getMonth() == ticketdate.getMonth()) {
        monthTicket.value = monthTicket.value + 1;
        statusReport.value.month.push(ticket);
      }
    }
  }
  //#endregion monthly tickets -------------------------------->

  //#region weekly tickets -------------------------------->
  ticketsItem.value.filter(weeklyTicket);
  function weeklyTicket(ticket) {
    const ticketdate = new Date(ticket.created_date);
    if (dateNow.getFullYear() == ticketdate.getFullYear()) {
      if (dateNow.getMonth() == ticketdate.getMonth()) {
        ticketsCalendar.value.ticketWeek[ticketdate.getDay()] += 1;
        ticketsCalendar.value.ticketDay[ticketdate.getDate() - 1] += 1;

        weekTicket.value += 1;
        statusReport.value.week.push(ticket);
      }
    }
  }
  //#endregion weekly tickets -------------------------------->
  statusChart.value.series = ticketsStatus.value.ticketStatusYear;
  priorityChart.value.series = ticketsPriority.value.ticketPriorityYear;
  loading.value = false;
};

const optionsDay = ref({
  chartOptions: {
    chart: {
      background: "#fff",
    },
    xaxis: {
      categories: dailyTicket.value,
    },
  },

  series: [
    {
      name: "ticket",
      data: ticketsCalendar.value.ticketDay,
    },
  ],
});

const optionsWeek = ref({
  chartOptions: {
    chart: {
      background: "#fff",
    },
    xaxis: {
      categories: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
  },

  series: [
    {
      name: "ticket",
      data: ticketsCalendar.value.ticketWeek,
    },
  ],
});

const optionsMonth = ref({
  chartOptions: {
    chart: {
      background: "#fff",
    },
    xaxis: {
      categories: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
  },

  series: [
    {
      name: "ticket",
      data: ticketsCalendar.value.ticketMonth,
    },
  ],
});

const optionsYear = ref({
  chartOptions: {
    chart: {
      background: "#fff",
    },
    xaxis: {
      categories: yearCat.value,
    },
  },

  series: [
    {
      name: "ticket",
      data: ticketsCalendar.value.ticketYear,
    },
  ],
});

const statusChart = ref({
  series: ticketsStatus.value.ticketStatusYear,
  chartOptions: {
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
              color: "black",
            },
          },
        },
      },
    },
    colors: ["#7E91F0", "#FF6A6B", "#2CD651", "#00A1F2", "#767676"],
    labels: ["Open", "Pending", "Resolved", "Unassigned", "Closed"],
    title: {
      text: "Ticket Status",
    },
    stroke: {
      width: 0,
    },
    chart: {
      background: "#fff",
      toolbar: {
        show: true,
        offsetX: 0,
        tools: {
          download: true,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: [],
        },
        export: {
          csv: {
            filename: undefined,
            columnDelimiter: ",",
            headerCategory: "category",
            headerValue: "value",
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: undefined,
          },
          png: {
            filename: undefined,
          },
        },
        autoSelected: "zoom",
      },
    },
  },
});

const priorityChart = ref({
  series: ticketsPriority.value.ticketPriorityYear,
  chartOptions: {
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
              color: "black",
            },
          },
        },
      },
    },
    labels: ["Low", "Medium", "High", "Urgent"],
    title: {
      text: "Ticket Priority",
    },
    stroke: {
      width: 0,
    },
    chart: {
      background: "#fff",
      toolbar: {
        show: true,
        offsetX: 0,
        tools: {
          download: true,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: [],
        },
        export: {
          csv: {
            filename: undefined,
            columnDelimiter: ",",
            headerCategory: "category",
            headerValue: "value",
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: undefined,
          },
          png: {
            filename: undefined,
          },
        },
        autoSelected: "zoom",
      },
    },
  },
});
watch(dashboardFilter, (newValue) => {
  switch (newValue) {
    case "Day":
      statusChart.value.series = ticketsStatus.value.ticketStatusDay;
      priorityChart.value.series = ticketsPriority.value.ticketPriorityDay;
      break;
    case "Week":
      statusChart.value.series = ticketsStatus.value.ticketStatusWeek;
      priorityChart.value.series = ticketsPriority.value.ticketPriorityWeek;
      break;
    case "Month":
      statusChart.value.series = ticketsStatus.value.ticketStatusMonth;
      priorityChart.value.series = ticketsPriority.value.ticketPriorityMonth;
      break;
    case "Year":
      statusChart.value.series = ticketsStatus.value.ticketStatusYear;
      priorityChart.value.series = ticketsPriority.value.ticketPriorityYear;
      break;
  }
});

const getYearAndMonthCat = () => {
  const date = new Date();
  const currentYear = date.getFullYear() - 9;

  for (let i = 0; i < 10; i++) {
    yearCat.value.push(currentYear + i);
  }
};

const getTicket = (status) => {
  displayReport.value = [];
  switch (status) {
    case "Open":
      switch (dashboardFilter.value) {
        case "Day":
          statusReport.value.day.filter(filterOpen);
          break;
        case "Week":
          statusReport.value.week.filter(filterOpen);
          break;
        case "Month":
          statusReport.value.month.filter(filterOpen);
          break;
        case "Year":
          statusReport.value.year.filter(filterOpen);
          break;
      }
      function filterOpen(s) {
        if (s.status == "Open") displayReport.value.push(s);
      }
      break;
    case "Pending":
      switch (dashboardFilter.value) {
        case "Day":
          statusReport.value.day.filter(filterPending);
          break;
        case "Week":
          statusReport.value.week.filter(filterPending);
          break;
        case "Month":
          statusReport.value.month.filter(filterPending);
          break;
        case "Year":
          statusReport.value.year.filter(filterPending);
          break;
      }
      function filterPending(s) {
        if (s.status == "Pending") displayReport.value.push(s);
      }
      break;
    case "Resolved":
      switch (dashboardFilter.value) {
        case "Day":
          statusReport.value.day.filter(filterResolved);
          break;
        case "Week":
          statusReport.value.week.filter(filterResolved);
          break;
        case "Month":
          statusReport.value.month.filter(filterResolved);
          break;
        case "Year":
          statusReport.value.year.filter(filterResolved);
          break;
      }
      function filterResolved(s) {
        if (s.status == "Resolved") displayReport.value.push(s);
      }
      break;
    case "Closed":
      switch (dashboardFilter.value) {
        case "Day":
          statusReport.value.day.filter(filterClosed);
          break;
        case "Week":
          statusReport.value.week.filter(filterClosed);
          break;
        case "Month":
          statusReport.value.month.filter(filterClosed);
          break;
        case "Year":
          statusReport.value.year.filter(filterClosed);
          break;
      }
      function filterClosed(s) {
        if (s.status == "Closed") displayReport.value.push(s);
      }
      break;
    default:
      switch (dashboardFilter.value) {
        case "Day":
          displayReport.value = statusReport.value.day;
          break;
        case "Week":
          displayReport.value = statusReport.value.week;
          break;
        case "Month":
          displayReport.value = statusReport.value.month;
          break;
        case "Year":
          displayReport.value = statusReport.value.year;
          break;
      }
  }

  dialog.value = true;
};
</script>

<template>
  <v-row>
    <v-dialog v-model="dialog" width="1080">
      <v-card rounded="0" elevation="10" align="center">
        <v-card-title>Tickets</v-card-title>
        <v-card-text>
          <v-data-table
            :items-per-page="10"
            :headers="headers"
            :items-length="displayReport.length"
            :items="displayReport"
            :loading="loading"
            class="elevation-1"
            item-value="name"
            width="auto"
          >
            <template v-slot:item.user_details="{ item }">
              {{ item.userprofile.first_name }}
              {{ item.userprofile.middle_name }}
              {{ item.userprofile.last_name }}
              (
              {{
                item.userprofile.department
                  ? item.userprofile.department.name
                  : ""
              }}
              )
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = !dialog">
            Close
          </v-btn>
        </v-card-actions></v-card
      >
    </v-dialog>
  </v-row>
  <v-row>
    <v-col col="12" sm="6" md="2">
      <v-card
        variant="outlined"
        :loading="loading"
        :disabled="loading"
        class="rounded-shaped"
        @click="getTicket()"
      >
        <div v-if="dashboardFilter == 'Year'">
          <v-card-title> All Ticket </v-card-title>
          <v-card-text>
            <h2>
              {{ totalReportItems }}
            </h2>
          </v-card-text>
        </div>
        <div v-if="dashboardFilter == 'Day'">
          <v-card-title> Today Ticket </v-card-title>
          <v-card-text>
            <h2>
              {{ todayTicket }}
            </h2>
          </v-card-text>
        </div>
        <div v-if="dashboardFilter == 'Month'">
          <v-card-title> Monthly Ticket </v-card-title>
          <v-card-text>
            <h2>
              {{ monthTicket }}
            </h2>
          </v-card-text>
        </div>
        <div v-if="dashboardFilter == 'Week'">
          <v-card-title> Weekly Ticket </v-card-title>
          <v-card-text>
            <h2>
              {{ weekTicket }}
            </h2>
          </v-card-text>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" md="2">
      <v-card
        variant="outlined"
        :loading="loading"
        :disabled="loading"
        class="rounded-shaped"
        @click="getTicket('Open')"
      >
        <template v-slot:title> Open </template>
        <v-card-text v-if="dashboardFilter == 'Year'">
          <h2>
            {{ ticketsStatus.ticketStatusYear[0] }}
          </h2>
        </v-card-text>
        <v-card-text v-if="dashboardFilter == 'Day'">
          <h2>
            {{ ticketsStatus.ticketStatusDay[0] }}
          </h2>
        </v-card-text>
        <v-card-text v-if="dashboardFilter == 'Month'">
          <h2>
            {{ ticketsStatus.ticketStatusMonth[0] }}
          </h2>
        </v-card-text>
        <v-card-text v-if="dashboardFilter == 'Week'">
          <h2>
            {{ ticketsStatus.ticketStatusWeek[0] }}
          </h2>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" md="2">
      <v-card
        variant="outlined"
        :loading="loading"
        :disabled="loading"
        class="rounded-shaped"
        @click="getTicket('Pending')"
      >
        <template v-slot:title> Pending </template>
        <v-card-text v-if="dashboardFilter == 'Year'">
          <h2>
            {{ ticketsStatus.ticketStatusYear[1] }}
          </h2>
        </v-card-text>
        <v-card-text v-if="dashboardFilter == 'Day'">
          <h2>
            {{ ticketsStatus.ticketStatusDay[1] }}
          </h2>
        </v-card-text>
        <v-card-text v-if="dashboardFilter == 'Month'">
          <h2>
            {{ ticketsStatus.ticketStatusMonth[1] }}
          </h2>
        </v-card-text>
        <v-card-text v-if="dashboardFilter == 'Week'">
          <h2>
            {{ ticketsStatus.ticketStatusWeek[1] }}
          </h2>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" md="2">
      <v-card
        variant="outlined"
        :loading="loading"
        :disabled="loading"
        class="rounded-shaped"
        @click="getTicket('Resolved')"
      >
        <template v-slot:title> Resolved </template>
        <v-card-text v-if="dashboardFilter == 'Year'">
          <h2>
            {{ ticketsStatus.ticketStatusYear[2] }}
          </h2>
        </v-card-text>
        <v-card-text v-if="dashboardFilter == 'Day'">
          <h2>
            {{ ticketsStatus.ticketStatusDay[2] }}
          </h2>
        </v-card-text>
        <v-card-text v-if="dashboardFilter == 'Month'">
          <h2>
            {{ ticketsStatus.ticketStatusMonth[2] }}
          </h2>
        </v-card-text>
        <v-card-text v-if="dashboardFilter == 'Week'">
          <h2>
            {{ ticketsStatus.ticketStatusWeek[2] }}
          </h2>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" md="2">
      <v-card
        variant="outlined"
        :loading="loading"
        :disabled="loading"
        class="rounded-shaped"
        @click="getTicket('Closed')"
      >
        <template v-slot:title> Closed </template>
        <v-card-text v-if="dashboardFilter == 'Year'">
          <h2>
            {{ ticketsStatus.ticketStatusYear[4] }}
          </h2>
        </v-card-text>
        <v-card-text v-if="dashboardFilter == 'Day'">
          <h2>
            {{ ticketsStatus.ticketStatusDay[4] }}
          </h2>
        </v-card-text>
        <v-card-text v-if="dashboardFilter == 'Month'">
          <h2>
            {{ ticketsStatus.ticketStatusMonth[4] }}
          </h2>
        </v-card-text>
        <v-card-text v-if="dashboardFilter == 'Week'">
          <h2>
            {{ ticketsStatus.ticketStatusWeek[4] }}
          </h2>
        </v-card-text>
      </v-card>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="12" sm="12" md="2" class="mt-5">
      <v-select
        :items="['Day', 'Week', 'Month', 'Year']"
        variant="outlined"
        v-model="dashboardFilter"
      ></v-select>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="4" sm="12">
      <apexchart
        width="100%"
        height="100%"
        type="donut"
        :options="statusChart.chartOptions"
        :series="statusChart.series"
      ></apexchart>
    </v-col>
    <v-col cols="12" md="4">
      <apexchart
        width="100%"
        height="100%"
        type="donut"
        :options="priorityChart.chartOptions"
        :series="priorityChart.series"
      ></apexchart>
    </v-col>
    <v-col cols="12" md="4">
      <apexchart
        width="100%"
        height="100%"
        type="bar"
        :options="optionsDay.chartOptions"
        :series="optionsDay.series"
        v-if="dashboardFilter == 'Day'"
      ></apexchart>
      <apexchart
        width="100%"
        height="100%"
        type="bar"
        :options="optionsWeek.chartOptions"
        :series="optionsWeek.series"
        v-if="dashboardFilter == 'Week'"
      ></apexchart>
      <apexchart
        width="100%"
        height="100%"
        type="bar"
        :options="optionsMonth.chartOptions"
        :series="optionsMonth.series"
        v-if="dashboardFilter == 'Month'"
      ></apexchart>
      <apexchart
        width="100%"
        height="100%"
        type="bar"
        :options="optionsYear.chartOptions"
        :series="optionsYear.series"
        v-if="dashboardFilter == 'Year'"
      ></apexchart>
    </v-col>
  </v-row>
</template>
