import { defineStore } from "pinia";
export const userouterStore = defineStore("route", {
  state: () => ({
    routerpath: [
      {
        icon: "mdi-view-dashboard",
        title: "Dashboard",
        per: "view-dashboard",
        sub: [
          {
            icon: "mdi-view-dashboard",
            title: "News",
            to: "/comming/soon",
            per: "view-dashboard-news",
            sub: [],
          },
          {
            icon: "mdi-forum",
            title: "Announcement",
            to: "/comming/soon",
            per: "view-dashboard-announcements",

            sub: [],
          },
          {
            icon: "mdi-forum",
            title: "Events",
            to: "/comming/soon",
            per: "view-dashboard-events",

            sub: [],
          },
          {
            icon: "mdi-forum",
            title: "Maintenance",
            per: "view-dashboard-maintenance",
            to: "",
            sub: [
              {
                icon: "mdi-view-dashboard",
                title: " News",
                to: "/comming/soon",
                per: "view-dashboard-maintenance-news",

                sub: [],
              },
              {
                icon: "mdi-forum",
                title: "Announcement",
                to: "/comming/soon",
                per: "view-dashboard-maintenance-anouncement",

                sub: [],
              },
              {
                icon: "mdi-forum",
                title: "Events",
                to: "/comming/soon",
                per: "view-dashboard-maintenance-event",
                sub: [],
              },
            ],
          },
        ],
      },
      {
        icon: "mdi-clock-time-eight-outline",
        title: "Attendance",
        to: "",
        per: "view-attendance",
        sub: [
          {
            icon: "mdi-view-dashboard",
            title: "Dashboard",
            to: "/attendance/dashboard",
            per: "view-attendance-dashboard",
            sub: [],
          },
          {
            icon: "mdi-calendar-clock",
            title: "Attendance",
            to: "/attendance/attendance",
            per: "view-attendance-attendance",
            sub: [],
          },
          {
            icon: "mdi-alarm",
            title: "Schedule",
            to: "/attendance/schedule",
            per: "view-attendance-schedule",
            sub: [],
          },
          {
            icon: "mdi-alarm-plus",
            title: "Overtime",
            to: "/attendance/overtime",
            per: "view-attendance-overtime",
            sub: [],
          },
          {
            icon: "mdi-clock-end",
            title: "Leaves",
            to: "/attendance/leaves",
            per: "view-attendance-leave",
            sub: [],
          },
          {
            icon: "mdi mdi-timer-cog-outline",
            title: "Apvl & Mgmt",
            per: "view-attendance-management",
            to: "",
            sub: [
              {
                icon: "mdi-account-multiple-plus",
                title: "Overtime Apvl",
                value: "team",
                to: "/comming/soon",
                per: "view-attendance-management-overtime",

                sub: [],
              },
              {
                icon: "mdi-account-multiple-plus",
                title: "Leaves Apvl",
                value: "team",
                to: "/comming/soon",
                per: "view-attendance-management-leave",

                sub: [],
              },
              {
                icon: "mdi-account-multiple-plus",
                title: "Upload Attn",
                value: "team",
                to: "/comming/soon",
                per: "view-attendance-management-schedule",
                sub: [],
              },
              {
                icon: "mdi-account-multiple-plus",
                title: "Attn Adjustment",
                value: "team",
                to: "/comming/soon",
                per: "view-attendance-management-attendance",
                sub: [],
              },
            ],
          },
          {
            icon: "mdi mdi-finance",
            title: "Reports",
            to: "/comming/soon",
            per: "view-attendance-report",
            sub: [],
          },
        ],
      },
      {
        icon: "mdi-ticket-confirmation-outline",
        title: "Tickets",
        to: "",
        per: "view-ticket",
        sub: [
          {
            icon: "mdi-home",
            title: "Dashboard",
            value: "dashboard",
            to: "/ticket/dashboard",
            per: "view-ticket-dashboard",
            sub: [],
          },
          {
            icon: "mdi-message",
            title: "Ticket Request",
            value: "request",
            to: "/ticket/request",
            per: "view-ticket-request",
            sub: [],
          },
          {
            icon: "mdi-monitor",
            title: "Ticket Monitor",
            value: "monitor",
            to: "/ticket/monitor",
            per: "view-ticket-monitor",
            sub: [],
          },
          {
            icon: "mdi mdi-wrench-cog",
            title: "Maintenance",
            to: "",
            per: "view-ticket-maintenance",
            sub: [
              {
                icon: "mdi-account-multiple-plus",
                title: "Team",
                value: "team",
                to: "/ticket/team",
                per: "view-ticket-maintenance-team",
                sub: [],
              },
              {
                icon: "mdi-group",
                title: "Group",
                value: "group",
                to: "/ticket/groups",
                per: "view-ticket-maintenance-group",
                sub: [],
              },
              {
                icon: "mdi-account-multiple",
                title: "Agents",
                value: "agentlist",
                to: "/ticket/agentlist",
                per: "view-ticket-maintenance-agent_team",
                sub: [],
              },
              {
                icon: "mdi-code-tags",
                title: "Tags",
                value: "tags",
                to: "/ticket/tags",
                per: "view-ticket-maintenance-tags",
                sub: [],
              },
              {
                icon: "mdi-ticket",
                title: "Ticket Type",
                value: "type",
                to: "/ticket/type",
                per: "view-ticket-maintenance-type",
                sub: [],
              },
            ],
          },
          {
            icon: "mdi-view-list",
            title: "Reports",
            to: "",
            per: "view-ticket-report",
            sub: [
              {
                icon: "mdi-view-list",
                title: "Report",
                value: "report",
                to: "/ticket/report",
                per: "view-ticket-report-report",
                sub: [],
              },
              {
                icon: "mdi-star",
                title: "Rating",
                value: "rating",
                to: "/ticket/rating",
                per: "view-ticket-report-rating",
                sub: [],
              },
            ],
          },
        ],
      },
      {
        icon: "mdi-book-arrow-left-outline",
        title: "Booking",
        to: "",
        per: "view-booking",
        sub: [
          {
            icon: "mdi-view-dashboard",
            title: "Dashboard",
            to: "/booking/dashboard",
            per: "view-booking-dashboard",
            sub: [],
          },
          {
            icon: "mdi-gamepad",
            title: "E-Games",
            to: "/booking/console",
            per: "view-booking-egames",
            sub: [],
          },
          {
            icon: "mdi-dumbbell",
            title: "Fitness",
            to: "/booking/gym",
            per: "view-booking-fitness",
            sub: [],
          },
          {
            icon: "mdi-bulletin-board",
            title: "Room",
            to: "",
            per: "view-booking-training-room",
            sub: [
              {
                icon: "mdi-bus",
                title: "Training Room",
                to: "/booking/trainingroom/",
                per: "view-booking-training-room",
                sub: [],
              },
            ],
          },
          {
            icon: "mdi-football",
            title: "Sports Amenities",
            to: "",
            // to: "/booking/sports",
            per: "view-booking-sports",
            sub: [
              {
                icon: "mdi-bus",
                title: "Badminton",
                to: "/booking/badminton/",
                per: "view-booking-sports",
                sub: [],
              },
              {
                icon: "mdi-bus",
                title: "Basketball",
                to: "/booking/basketball/",
                per: "view-booking-sports",
                sub: [],
              },
              {
                icon: "mdi-bus",
                title: "Billiards",
                to: "/booking/billiards/",
                per: "view-booking-sports",
                sub: [],
              },
              {
                icon: "mdi-bus",
                title: "Futsal",
                to: "/booking/futsal/",
                per: "view-booking-sports",
                sub: [],
              },
              {
                icon: "mdi-bus",
                title: "Tennis",
                to: "/booking/tennis/",
                per: "view-booking-sports",
                sub: [],
              },
              {
                icon: "mdi-bus",
                title: "Table Tennis",
                to: "/booking/tabletennis/",
                per: "view-booking-sports",
                sub: [],
              },
              {
                icon: "mdi-bus",
                title: "Volleyball",
                to: "/booking/volleyball/",
                per: "view-booking-sports",
                sub: [],
              },
            ],
          },

          {
            icon: "mdi-view-list",
            title: "My Booking List",
            to: "/booking/list",
            per: "view-booking-mybook-list",
            sub: [],
          },
          {
            icon: "mdi mdi-finance",
            title: "Reports",
            to: "/booking/reports",
            per: "view-booking-report",

            sub: [],
          },
          {
            icon: "mdi mdi-wrench-cog",
            title: "Maintenance",
            to: "",
            per: "view-booking-maintenance",

            sub: [
              {
                icon: "mdi-bus",
                title: "Equipment",
                to: "/booking/maintenance/gymequipment",
                per: "view-booking-maintenance-equipment",

                sub: [],
              },
              {
                icon: "mdi-bus",
                title: "EGames",
                to: "/booking/maintenance/egames",
                per: "view-booking-maintenance-egames",

                sub: [],
              },
              {
                icon: "mdi-bus",
                title: "Sports",
                to: "/booking/maintenance/sport",
                per: "view-booking-maintenance-sports",

                sub: [],
              },
            ],
          },
        ],
      },
      {
        icon: "mdi-bus",
        title: "Transportation",
        per: "view-transportations",
        to: "",
        sub: [
          {
            icon: "mdi-home",
            title: "Dashboard",
            to: "/booking/schedule/dashboard",
            per: "view-transportations-dashboard",

            sub: [],
          },
          {
            icon: "mdi-car-clock",
            title: "Book Now",
            to: "/booking/vehicle/booknow",
            per: "view-transportations-book-now",

            sub: [],
          },
          {
            icon: "mdi-car-clock",
            title: "Monitoring",
            to: "/booking/vehicle/monitoring",
            per: "view-transportations-monitor",
            sub: [],
          },
          {
            icon: "mdi-car-clock",
            title: "Van Monitoring",
            to: "/booking/vehicle/van-monitoring",
            per: "view-transportations-monitor",
            sub: [],
          },
          {
            icon: "mdi mdi-bus-clock",
            title: "Scheduling",
            to: "",
            per: "view-transportations-scheduling",

            sub: [
              {
                icon: "mdi mdi-bus-clock",
                title: "Vehicle Scheduling",
                to: "/booking/schedule/vehicle",
                per: "view-transportations-scheduling-vehicle",

                sub: [],
              },
            ],
          },
          {
            icon: "mdi mdi-wrench-cog",
            title: "Maintenance",
            to: "",
            per: "view-transportations-maintenance",

            sub: [
              {
                icon: "mdi-bus",
                title: "Sched Location",
                to: "/booking/maintenance/schedlocation",
                per: "view-transportations-maintenance-location",

                sub: [],
              },
              {
                icon: "mdi-bus",
                title: "Sched Pickup Location",
                to: "/booking/maintenance/SchedPickup",
                per: "view-transportations-maintenance-location",

                sub: [],
              },
              {
                icon: "mdi-bus",
                title: "Sched Purpose",
                to: "/booking/maintenance/schedpurpose",
                per: "view-transportations-maintenance-purpose",

                sub: [],
              },
              {
                icon: "mdi-bus",
                title: "Vehicle",
                to: "/booking/maintenance/vehicle",
                per: "view-transportations-maintenance-vehicle",

                sub: [],
              },
            ],
          },
          {
            icon: "mdi mdi-chart-areaspline",
            title: "Reports",
            to: "/comming/soon",
            per: "view-transportations-report",

            sub: [],
          },
        ],
      },
      {
        icon: "mdi mdi-treasure-chest",
        title: "Company Assets",
        to: "",
        per: "view-asset",
        sub: [
          {
            icon: "mdi-view-dashboard",
            title: "Dashboard",
            to: "/comming/soon",
            per: "view-asset",
            sub: [],
          },

          {
            icon: "mdi-desktop-tower-monitor",
            title: "User Assets",
            to: "/asset/user-assets",
            per: "view-asset",
            sub: [],
          },
          {
            icon: "mdi-treasure-chest",
            title: "Inventory",
            to: "/asset/inventory",
            per: "view-asset",
            sub: [],
          },

          {
            icon: "mdi-form-select",
            title: "Requests",
            to: "",
            per: "view-asset",
            sub: [
              {
                icon: "mdi mdi-office-building-marker",
                title: "Stock Request",
                to: "/asset/request",
                per: "view-asset",
                sub: [],
              },
              {
                icon: "mdi mdi-office-building-marker",
                title: "User Requests",
                to: "/asset/userrequest",
                per: "view-asset",
                sub: [],
              },
            ],
          },
          {
            icon: "mdi mdi-office-building-cog",
            title: "Maintenance",
            to: "",
            per: "view-asset",
            sub: [
              {
                icon: "mdi mdi-alert-decagram",
                title: "Item List",
                to: "/asset/item",
                per: "view-asset",
                sub: [],
              },
              {
                icon: "mdi mdi-alert-decagram",
                title: "Category",
                to: "/asset/category",
                per: "view-asset",
                sub: [],
              },
              {
                icon: "mdi mdi-alert-decagram",
                title: "Brand",
                to: "/asset/brand",
                per: "view-asset",
                sub: [],
              },
              {
                icon: "mdi mdi-alert-decagram",
                title: "Type",
                to: "/asset/type",
                per: "view-asset",
                sub: [],
              },
              {
                icon: "mdi mdi-alert-decagram",
                title: "Item Location",
                to: "/asset/location",
                per: "view-asset",
                sub: [],
              },
            ],
          },
          {
            icon: "mdi mdi-finance",
            title: "Report",
            to: "/asset/transaction",
            per: "view-asset",
            sub: [],
          },
        ],
      },
      {
        icon: "mdi mdi-table-chair",
        title: "Cafeteria",
        to: "",
        per: "view-cafeteria",
        sub: [
          {
            icon: "mdi mdi-table-chair",
            title: "Today Menu",
            to: "/rating/menu",
            per: "view-cafeteria-today-menu",
            sub: [],
          },
          {
            icon: "mdi mdi-cookie-clock",
            title: "Schedule",
            to: "",
            per: "view-cafeteria-schedule",
            sub: [
              {
                icon: "mdi mdi-cookie-clock",
                title: "Food Sched",
                to: "/rating/sched",
                per: "view-cafeteria-schedule-food-sched",
                sub: [],
              },
            ],
          },
          {
            icon: "mdi mdi-alert-decagram",
            title: "Maintenance",
            to: "",
            per: "view-cafeteria-maintenance",
            sub: [
              {
                icon: "mdi mdi-food-outline",
                title: "Foods",
                to: "/rating/maintenance/",
                per: "view-cafeteria-maintenance-food",
                sub: [],
              },
            ],
          },
          {
            icon: "mdi mdi-finance",
            title: "Reports",
            to: "/rating/reports",
            per: "view-cafeteria-report",
            sub: [
              {
                icon: "",
                title: "By Count",
                to: "/rating/reports/",
                per: "view-cafeteria-report",
                sub: [],
              },
              {
                icon: "",
                title: "By Comments",
                to: "/rating/commentreport/",
                per: "view-cafeteria-report",
                sub: [],
              },
            ],
          },
        ],
      },
      {
        icon: "mdi mdi-account-group",
        title: "Employee",
        to: "",
        per: "view-employee",
        sub: [
          {
            icon: "mdi-view-dashboard",
            title: "Dashboard",
            to: "/user/dashboard",
            per: "view-employee-dashboard",
            sub: [],
          },
          {
            icon: "mdi mdi-table-account",
            title: "Employee Master",
            to: "/user/list",
            per: "view-employee-employee-master",
            sub: [],
          },

          {
            icon: "mdi mdi-frequently-asked-questions",
            title: "Change Request",
            to: "/user/change-request",
            per: "view-employee-request",
            sub: [],
          },
          {
            icon: "mdi-clock-end",
            title: "Leaves",
            to: "",
            per: "view-employee-employee-master",
            sub: [
              {
                icon: "mdi-calendar-clock",
                title: "Leave Credits",
                to: "/user/leave/credit",
                per: "view-employee-employee-master",
                sub: [],
              },
              {
                icon: "mdi-calendar-clock",
                title: "Leave Awarding",
                to: "/user/leave/awarding",
                per: "view-employee-employee-master",
                sub: [],
              },
            ],
          },
          {
            icon: "mdi mdi-check-decagram-outline",
            title: "Approvals",
            to: "",
            per: "view-employee-approvals",
            sub: [
              {
                icon: "mdi-calendar-clock",
                title: "Attendance",
                to: "/comming/soon",
                per: "view-employee-approvals-attendance",
                sub: [],
              },
              {
                icon: "mdi-alarm",
                title: "Schedule",
                to: "/comming/soon",
                per: "view-employee-approvals-scheduled",
                sub: [],
              },
              {
                icon: "mdi-alarm-plus",
                title: "Overtime",
                to: "/comming/soon",
                per: "view-employee-approvals-overtime",
                sub: [],
              },
              {
                icon: "mdi-clock-end",
                title: "Leaves",
                to: "/comming/soon",
                per: "view-employee-approvals-leave",
                sub: [],
              },
            ],
          },
          {
            icon: "mdi mdi-chart-multiple",
            title: "Reports",
            to: "/comming/soon",
            per: "view-employee-reports",

            sub: [
              {
                icon: "mdi mdi-account-group",
                title: "Generate Reports",
                to: "/user/report/reports",
                per: "view-employee-reports",
                sub: [],
              },
            ],
          },
          {
            icon: "mdi mdi-frequently-asked-questions",
            title: "Scheduling",
            to: "",
            per: "view-employee-request",
            sub: [
              {
                icon: "mdi mdi-frequently-asked-questions",
                title: "Emp Schedule",
                to: "/user/schedule/emp-schedule",
                per: "view-employee-request",
                sub: [],
              },
              {
                icon: "mdi mdi-frequently-asked-questions",
                title: "Fixed Schedule",
                to: "/user/schedule/fixed-schedule",
                per: "view-employee-request",
                sub: [],
              },
              {
                icon: "mdi mdi-frequently-asked-questions",
                title: "Schedule Template",
                to: "/user/schedule/schedule-template",
                per: "view-employee-request",
                sub: [],
              },
            ],
          },
          {
            icon: "mdi mdi-wrench-cog",
            title: "Maintenance",
            to: "",
            per: "view-employee-maintenance",

            sub: [
              {
                icon: "mdi mdi-account-group",
                title: "Position",
                to: "/user/maintenance/position",
                per: "view-employee-maintenance-position",

                sub: [],
              },
              {
                icon: "mdi mdi-account-group",
                title: "Department",
                to: "/user/maintenance/department",
                per: "view-employee-maintenance-department",

                sub: [],
              },
              {
                icon: "mdi mdi-account-group",
                title: "Business Units",
                to: "/user/maintenance/business-unit",
                per: "view-employee-maintenance-business-units",

                sub: [],
              },
              {
                icon: "mdi mdi-account-group",
                title: "Sub Business Units",
                to: "/user/maintenance/sub-business-unit",
                per: "view-employee-maintenance-sub_business_units",

                sub: [],
              },
              {
                icon: "mdi mdi-account-group",
                title: "Lodging",
                to: "/user/maintenance/lodging",
                per: "view-employee-maintenance-lodging",

                sub: [],
              },
              {
                icon: "mdi mdi-account-group",
                title: "Leave Type",
                to: "/user/maintenance/leave",
                per: "view-employee-maintenance-sub_business_units",

                sub: [],
              },
              {
                icon: "mdi mdi-account-group",
                title: "Request Type",
                to: "/comming/soon",
                per: "view-employee-maintenance-request-type",

                sub: [],
              },
              {
                icon: "mdi-gift-outline",
                title: "Allowance Type",
                to: "/user/maintenance/allowance",
                per: "view-employee-maintenance-allowance-type",

                sub: [],
              },
              {
                icon: "mdi-gift-outline",
                title: "Holiday",
                to: "/user/maintenance/holiday",
                per: "view-employee-maintenance-allowance-type",

                sub: [],
              },
            ],
          },
        ],
      },
      {
        icon: "mdi-cog-outline",
        title: "Settings",
        to: "",
        per: "view-settings",
        sub: [
          {
            icon: "mdi mdi-security",
            title: "Permissions",
            to: "/settings/permission",
            per: "view-settings-permissions",

            sub: [],
          },
          {
            icon: "mdi mdi-account-lock-outline",
            title: "Roles",
            to: "/settings/role",
            per: "view-settings-roles",
            sub: [],
          },
          {
            icon: "mdi mdi-account-lock-open-outline",
            title: "Users",
            to: "/settings/users",
            per: "view-settings-users",
            sub: [],
          },
          {
            icon: "mdi mdi-account-details",
            title: "Users Upload",
            to: "/settings/userupload",
            per: "view-settings-upload-users",
            sub: [],
          },
        ],
      },
      {
        icon: "mdi mdi-security",
        title: "Account",
        per: "",
        to: "",
        sub: [
          {
            icon: "mdi mdi-security",
            title: "Profile",
            to: "/account/profile",
            per: "view-booking",
            sub: [],
          },
          {
            icon: "mdi mdi-security",
            title: "Informations",
            to: "/account/profile",
            to: "/account/information",
            per: "view-booking",
            sub: [],
          },
          {
            icon: "mdi mdi-security",
            title: "Settings",
            to: "/account/profile",
            to: "/account/settings",
            per: "view-booking",
            sub: [],
          },
          {
            icon: "mdi mdi-security",
            title: "Notifications",
            to: "/account/profile",
            to: "/account/notification",
            per: "view-booking",
            sub: [],
          },
          {
            icon: "mdi mdi-security",
            title: "Payslip",
            to: "/account/profile",
            to: "/account/payslip",
            per: "view-booking",
            sub: [],
          },
        ],
      },
    ],
    routelink: [],
  }),
  getters: {
    get_routelink: (state) => state.routelink,
    get_routerpath: (state) => state.routerpath,
  },
  actions: {
    async set_route(res) {
      this.$state.routelink = res;
    },
    // async clear_route() {
    //   this.$state.routelink = [];
    //   this.$state.routerpath = [];
    // },
  },

  persist: true,
});
