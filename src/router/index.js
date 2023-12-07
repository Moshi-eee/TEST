import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/index.vue"),
      meta: { permission: "false" },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/auth/Login.vue"),
      meta: { permission: "false" },
    },
    {
      path: "/changepassword",
      name: "changepassword",
      component: () => import("@/views/auth/Changepassword.vue"),
      meta: { permission: true },
    },
    {
      path: "/bookingprintreport",
      name: "bookingprintreport",
      component: () => import("@/views/booking/reports/print.vue"),
      meta: { permission: true },
    },
    {
      path: "/ticketprint",
      name: "ticketprint",
      component: () => import("@/views/ticketing/TicketPrint.vue"),
      meta: { permission: true },
    },
    {
      path: "/ratingprintreport",
      name: "ratingprintreport",
      component: () => import("@/views/rating/reports/printComment.vue"),
      meta: { permission: true },
    },
    {
      path: "/ratingcountprintreport",
      name: "ratingcountprintreport",
      component: () => import("@/views/rating/reports/printCount.vue"),
      meta: { permission: true },
    },
    {
      path: "/comming",
      component: () => import("@/layouts/Dashboard.vue"),
      children: [
        {
          path: "soon",
          component: () => import("@/views/AboutView.vue"),
          meta: { permission: true },
        },
      ],
    },

    // {
    //   path: "/rating",
    //   component: () => import("@/layouts/Dashboard.vue"),
    //   children: [
    //     {
    //       path: "maintenance/foods",
    //       component: () => import("@/views/rating/maintenance/Food.vue"),
    //       meta: { permission: true },
    //     },
    //   ],
    // },

    {
      path: "/settings",
      component: () => import("@/layouts/Dashboard.vue"),
      meta: { permission: true },
      children: [
        {
          path: "permission",
          component: () => import("@/views/setting/Permission.vue"),
          meta: { permission: true },
        },
        {
          path: "role",
          component: () => import("@/views/setting/Roles.vue"),
          meta: { permission: true },
        },
        {
          path: "users",
          component: () => import("@/views/setting/Users.vue"),
          meta: { permission: true },
        },
        {
          path: "userupload",
          component: () => import("@/views/setting/UserUpload.vue"),
          meta: { permission: true },
        },
      ],
    },

    {
      path: "/user",
      component: () => import("@/layouts/Dashboard.vue"),
      meta: { permission: true },
      children: [
        {
          path: "dashboard",
          component: () => import("@/views/user/Dashboard.vue"),
          meta: { permission: true },
        },
        {
          path: "list",
          component: () => import("@/views/user/User.vue"),
          meta: { permission: true },
        },
        {
          path: "create",
          component: () => import("@/views/user/CreateUser.vue"),
          meta: { permission: true },
        },
        {
          path: "edit",
          component: () => import("@/views/user/EditUser.vue"),
          meta: { permission: true },
        },
        {
          path: "leave/credit",
          component: () => import("@/views/user/LeaveCredit.vue"),
          meta: { permission: true },
        },
        {
          path: "leave/awarding",
          component: () => import("@/views/user/LeaveAwarding.vue"),
          meta: { permission: true },
        },
        {
          path: "maintenance/leave",
          component: () => import("@/views/user/maintenance/Leave.vue"),
          meta: { permission: true },
        },
        {
          path: "change-request",
          component: () => import("@/views/user/ChangeRequest.vue"),
          meta: { permission: true },
        },
        {
          path: "maintenance/business-unit",
          component: () => import("@/views/user/maintenance/BusinessUnit.vue"),
          meta: { permission: true },
        },
        {
          path: "maintenance/department",
          component: () => import("@/views/user/maintenance/Department.vue"),
          meta: { permission: true },
        },
        {
          path: "maintenance/lodging",
          component: () => import("@/views/user/maintenance/Lodging.vue"),
          meta: { permission: true },
        },
        {
          path: "maintenance/position",
          component: () => import("@/views/user/maintenance/Position.vue"),
          meta: { permission: true },
        },
        {
          path: "maintenance/allowance",
          component: () => import("@/views/user/maintenance/Allowance.vue"),
          meta: { permission: true },
        },
        {
          path: "maintenance/sub-business-unit",
          component: () =>
            import("@/views/user/maintenance/SubBusinessUnit.vue"),
          meta: { permission: true },
        },
        {
          path: "maintenance/holiday",
          component: () => import("@/views/user/maintenance/holiday.vue"),
          meta: { permission: true },
        },
        {
          path: "schedule/fixed-schedule",
          component: () => import("@/views/user/FixSchedule.vue"),
          meta: { permission: true },
        },
        {
          path: "schedule/schedule-template",
          component: () => import("@/views/user/ScheduleTemplate.vue"),
          meta: { permission: true },
        },
        {
          path: "schedule/emp-schedule",
          component: () => import("@/views/user/EmpSchedule.vue"),
          meta: { permission: true },
        },
        {
          path: "report/reports",
          component: () => import("@/views/user/report/Report.vue"),
          meta: { permission: true },
        },
      ],
    },
    {
      path: "/booking",
      component: () => import("@/layouts/Dashboard.vue"),
      meta: { permission: true },
      children: [
        {
          path: "dashboard",
          component: () => import("@/views/booking/Dashboard.vue"),
          meta: { permission: true },
        },
        {
          path: "reports",
          component: () => import("@/views/booking/reports/index.vue"),
          meta: { permission: true },
        },
        {
          path: "list",
          component: () => import("@/views/booking/bookingList/index.vue"),
          meta: { permission: true },
        },
        {
          path: "vehicle/booknow",
          component: () => import("@/views/booking/transportation/Booknow.vue"),
          meta: { permission: true },
        },
        {
          path: "vehicle/van-monitoring",
          component: () =>
            import("@/views/booking/transportation/VanMonitoring.vue"),
          meta: { permission: true },
        },
        {
          path: "vehicle/monitoring",
          component: () =>
            import("@/views/booking/transportation/Monitoring.vue"),
          meta: { permission: true },
        },
        {
          path: "schedule/vehicle",
          component: () => import("@/views/booking/schedule/Vehicle.vue"),
          meta: { permission: true },
        },
        {
          path: "schedule/dashboard",
          component: () =>
            import("@/views/booking/schedule/VehicleDashboard.vue"),
          meta: { permission: true },
        },
        {
          path: "schedule/vehicle/create",
          component: () => import("@/views/booking/schedule/CreateSched.vue"),
          meta: { permission: true },
        },
        {
          path: "console",
          component: () => import("@/views/booking/eGames/Console.vue"),
          meta: { permission: true },
        },
        {
          path: "gym",
          component: () => import("@/views/booking/fitness/Gym.vue"),
          meta: { permission: true },
        },
        {
          path: "sports",
          component: () => import("@/views/booking/sportsAmenities/index.vue"),
          meta: { permission: true },
        },
        {
          path: "badminton",
          component: () => import("@/views/booking/amenities/Badminton.vue"),
          meta: { permission: true },
        },
        {
          path: "basketball",
          component: () => import("@/views/booking/amenities/Basketball.vue"),
          meta: { permission: true },
        },
        {
          path: "billiards",
          component: () => import("@/views/booking/amenities/Billiards.vue"),
          meta: { permission: true },
        },
        {
          path: "futsal",
          component: () => import("@/views/booking/amenities/Futsal.vue"),
          meta: { permission: true },
        },
        {
          path: "tennis",
          component: () => import("@/views/booking/amenities/Tennis.vue"),
          meta: { permission: true },
        },
        {
          path: "tabletennis",
          component: () => import("@/views/booking/amenities/TableTennis.vue"),
          meta: { permission: true },
        },
        {
          path: "volleyball",
          component: () => import("@/views/booking/amenities/Volleyball.vue"),
          meta: { permission: true },
        },
        {
          path: "room",
          component: () => import("@/views/booking/trainingRoom/index.vue"),
          meta: { permission: true },
        },
        {
          path: "trainingroom",
          component: () => import("@/views/booking/room/TrainingRoom.vue"),
          meta: { permission: true },
        },
        {
          path: "maintenance/schedpurpose",
          component: () =>
            import("@/views/booking/maintenance/SchedPurpose.vue"),
          meta: { permission: true },
        },
        {
          path: "maintenance/egames",
          component: () => import("@/views/booking/maintenance/EGames.vue"),
          meta: { permission: true },
        },
        {
          path: "maintenance/schedlocation",
          component: () =>
            import("@/views/booking/maintenance/SchedLocation.vue"),
          meta: { permission: true },
        },
        {
          path: "maintenance/schedpickup",
          component: () =>
            import("@/views/booking/maintenance/SchedPickup.vue"),
          meta: { permission: true },
        },
        {
          path: "maintenance/sport",
          component: () => import("@/views/booking/maintenance/Sports.vue"),
          meta: { permission: true },
        },
        {
          path: "maintenance/vehicle",
          component: () => import("@/views/booking/maintenance/Vehicle.vue"),
          meta: { permission: true },
        },
        {
          path: "maintenance/gymequipment",
          component: () =>
            import("@/views/booking/maintenance/GymEquipment.vue"),
          meta: { permission: true },
        },
      ],
    },
    {
      path: "/ticket",
      component: () => import("@/layouts/Dashboard.vue"),
      meta: { permission: true },
      children: [
        {
          path: "dashboard",
          component: () => import("@/views/ticketing/Dashboard.vue"),
          meta: { permission: true },
        },
        {
          path: "request",
          component: () => import("@/views/ticketing/TicketRequest.vue"),
          meta: { permission: true },
        },
        {
          path: "groups",
          component: () => import("@/views/ticketing/maintenance/Group.vue"),
          meta: { permission: true },
        },
        {
          path: "tags",
          component: () => import("@/views/ticketing/maintenance/Tags.vue"),
          meta: { permission: true },
        },
        {
          path: "type",
          component: () => import("@/views/ticketing/maintenance/Type.vue"),
          meta: { permission: true },
        },
        {
          path: "report",
          component: () => import("@/views/ticketing/Report.vue"),
          meta: { permission: true },
        },
        {
          path: "rating",
          component: () => import("@/views/ticketing/Rating.vue"),
          meta: { permission: true },
        },
        {
          path: "team",
          component: () => import("@/views/ticketing/maintenance/Team.vue"),
          meta: { permission: true },
        },
        {
          path: "agentlist",
          component: () => import("@/views/ticketing/maintenance/Agent.vue"),
          meta: { permission: true },
        },
        {
          path: "ticket/messages",
          component: () => import("@/views/ticketing/TicketMessages.vue"),
          meta: { permission: true },
        },
        {
          path: "monitor",
          component: () => import("@/views/ticketing/TicketMonitor.vue"),
          meta: { permission: true },
        },
      ],
    },
    {
      path: "/rating",
      component: () => import("@/layouts/Dashboard.vue"),
      meta: { permission: true },
      children: [
        {
          path: "dashboard",
          component: () => import("@/views/rating/Dashboard.vue"),
          meta: { permission: true },
        },
        {
          path: "reports",
          component: () => import("@/views/rating/reports/index.vue"),
          meta: { permission: true },
        },
        {
          path: "commentreport",
          component: () => import("@/views/rating/reports/comment.vue"),
          meta: { permission: true },
        },
        {
          path: "menu",
          component: () => import("@/views/rating/Cafeteria.vue"),
          meta: { permission: true },
        },
        {
          path: "sched",
          component: () => import("@/views/rating/schedule/index.vue"),
          meta: { permission: true },
        },
        {
          path: "maintenance",
          component: () => import("@/views/rating/maintenance/Food.vue"),
          meta: { permission: true },
        },
      ],
    },
    {
      path: "/attendance",
      component: () => import("@/layouts/Dashboard.vue"),
      meta: { permission: true },
      children: [
        {
          path: "dashboard",
          component: () => import("@/views/attendance/Dashboard.vue"),
          meta: { permission: true },
        },
        {
          path: "attendance",
          component: () => import("@/views/attendance/Attendance.vue"),
          meta: { permission: true },
        },
        {
          path: "schedule",
          component: () => import("@/views/attendance/Schedule.vue"),
          meta: { permission: true },
        },
        {
          path: "overtime",
          component: () => import("@/views/attendance/Overtime.vue"),
          meta: { permission: true },
        },
        {
          path: "leaves",
          component: () => import("@/views/attendance/Leaves.vue"),
          meta: { permission: true },
        },
      ],
    },
    {
      path: "/social",
      component: () => import("@/layouts/Social.vue"),
      children: [
        {
          path: "media",
          component: () => import("@/views/AboutView.vue"),
          meta: { permission: true },
        },
      ],
    },
    {
      path: "/account",
      component: () => import("@/layouts/Dashboard.vue"),
      children: [
        {
          path: "profile",
          component: () => import("@/views/profile/Profile.vue"),
          meta: { permission: true },
        },
        {
          path: "profile-edit",
          component: () => import("@/views/profile/EditProfile.vue"),
          meta: { permission: true },
        },
        {
          path: "information",
          component: () => import("@/views/profile/Info.vue"),
          meta: { permission: true },
        },
        {
          path: "settings",
          component: () => import("@/views/profile/Settings.vue"),
          meta: { permission: true },
        },
        {
          path: "notification",
          component: () => import("@/views/profile/Notifications.vue"),
          meta: { permission: true },
        },
        {
          path: "payslip",
          component: () => import("@/views/profile/Payslip.vue"),
          meta: { permission: true },
        },
      ],
    },
    {
      path: "/asset",
      component: () => import("@/layouts/Dashboard.vue"),
      meta: { permission: true },
      children: [
        {
          path: "category",
          component: () =>
            import("@/views/inventory/maintenance/AssetCategory.vue"),
          meta: { permission: true },
        },
        {
          path: "brand",
          component: () =>
            import("@/views/inventory/maintenance/AssetBrand.vue"),
          meta: { permission: true },
        },
        {
          path: "type",
          component: () =>
            import("@/views/inventory/maintenance/AssetType.vue"),
          meta: { permission: true },
        },
        {
          path: "userrequest",
          component: () => import("@/views/inventory/UserRequest.vue"),
          meta: { permission: true },
        },
        {
          path: "inventory",
          component: () => import("@/views/inventory/AssetInventory.vue"),
          meta: { permission: true },
        },
        {
          path: "transaction",
          component: () => import("@/views/inventory/AssetTransaction.vue"),
          meta: { permission: true },
        },
        {
          path: "request",
          component: () => import("@/views/inventory/StockRequest.vue"),
          meta: { permission: true },
        },
        {
          path: "user-assets",
          component: () => import("@/views/inventory/UserAsset.vue"),
          meta: { permission: true },
        },
        {
          path: "item",
          component: () =>
            import("@/views/inventory/maintenance/AssetItem.vue"),
          meta: { permission: true },
        },
        {
          path: "location",
          component: () =>
            import("@/views/inventory/maintenance/AssetLocation.vue"),
          meta: { permission: true },
        },
        {
          path: "dashboard",
          component: () => import("@/views/inventory/AssetDashboard.vue"),
          meta: { permission: true },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useAuthStore();

  if (to.meta.permission) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    // return {
    // path: "/login",
    // save the location we were at to come back later
    //   query: { redirect: to.fullPath },
    // };
    next();
  } else {
    return {
      path: "/login",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
